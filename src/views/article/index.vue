<!--  -->
<template>
<div class='article_container'>
  <!-- NavBar导航栏 -->
  <van-nav-bar
    id="page_nav_bar"
    left-arrow
    @click-left="$router.back()"
    title="黑马头条"
  ></van-nav-bar>
  <!-- /NavBar导航栏 -->
  <div class="main_wrap">
        <!-- 1加载中Loading加载 -->
    <div v-if="loading" class="loading_wrap">
      <van-loading
        color="#3297fa"
        vertical
      >
      加载中</van-loading>
    </div>
      <!-- /1加载中Loading加载 -->
    <!-- 2加载完成-文章详情 -->
    <div v-else-if="article.title" class="article_detail">
      <!-- 文章标题 -->
      <h1 class="article_title">{{article.title}}</h1>
      <!-- /文章标题 -->
      <!-- 用户信息 -->
      <van-cell class="user_info" center :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="article.aut_photo"
        />
        <div slot="title" class="user_name">{{ article.aut_name }}</div>
        <div slot="label" class="publish_date">{{ article.pubdate | relativeTime }}</div>
          <van-button
            class="follow_btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
          >
              关注
          </van-button>
         <!--  <van-button
            class="follow_btn"
            round
            size="small"
          >
              已关注
          </van-button> -->
      </van-cell>
      <!-- /用户信息 -->
      <!-- 文章内容 -->
      <div class="article_content" v-html="article.content"></div>
      <van-divider>正文结束</van-divider>
      <!-- /文章内容 -->
    </div>
    <!-- /2加载完成-文章详情 -->
    <!-- 3加载失败:404 -->
      <div v-else-if="errStatus === 404" class="error_wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
    <!-- /3加载失败:404 -->
      <div v-else class="error_wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败!</p>
        <van-button
          class="retry_btn"
          @click="loadArticle"
        >点击重试</van-button>
      </div>
  </div>
      <!-- /加载失败: 其它未知错误 (例如网络原因或服务器端异常) -->
      <!-- 底部区域 -->
      <div class="article_bottom">
        <van-button class="comment_btn" type="default" round size="small">写评论
        </van-button>
        <van-icon class="comment_icon" name="comment_o" badge="123"></van-icon>
        <van-button class="btn_item"  icon="star-o" />
        <van-button class="btn_item"  icon="good-job-o" />
        <van-icon name="share" color="#777777"></van-icon>
      </div>
      <!-- /底部区域 -->
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getArticleById } from '@/api/article'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的 loading 状态
      errStatus: 0 // 失败的状态码
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadArticle () {
      // 展示 loading 加载中
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // if (Math.random() > 0.5) {
        //   JSON.parse('lasjglaijsdgl')
        // }
        // console.log(data)
        this.article = data.data
        console.log(this.article)
        // 请求成功,关闭loading
        // this.loading = false
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        // 请求失败,关闭loading
        // this.loading = false
        console.log('获取数据失败', err)
      }
      // 无论请求成功失败,都关闭loading
      this.loading = false
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.loadArticle()
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.article_container {
  .main_wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
  }
  .loading_wrap {
      padding: 200px 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
  }
  .article_detail {
      position: fixed;
      left: 0;
      right: 0;
      top: 92px;
      bottom: 88px;
      overflow-y: scroll;
      background-color: #fff;
      .article_title {
          font-size: 40px;
          padding: 50px 32px;
          margin: 0;
          color: #3a3a3a;
      }
      .user_info {
        padding: 0 32px;
        .avatar {
            width: 70px;
            height: 70px;
            margin-right: 17px;
        }
        .van-cell_label {
            margin-top: 0;
        }
        .user_name {
            font-size: 24px;
            // color: red;
            color: #3a3a3a;
        }
        .publish_date {
            font-size: 23px;
            // color: red;
            color: #b7b7b7;
        }
        .follow_btn {
            width: 170px;
            height: 58px;
        }
      }
      .article_content {
          padding: 55px 32px;
          /deep/ p {
            text-align: justify;
          }
      }
  }
  .error_wrap {
      padding: 200px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .van-icon {
          font-size: 122px;
          color: #b4b4b4;
      }
      .text {
          font-size: 30px;
          color: #666666;
      }
      .retry_btn {
          width: 200px;
          height: 70px;
          line-height: 70px;
          border: 1px solid #c3c3c3;
          font-size: 30px;
          color: #666666;
      }
  }
  .article_bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      height: 88px;
      border-top: 1px solid #d8d8d8;
      background-color: #fff;
      .comment_btn {
          width: 282px;
          height: 46px;
          border: 2px solid #eeeeee;
          font-size: 30px;
          line-height: 46px;
          color: #a7a7a7;
      }
      /deep/ .van-icon {
          font-size: 40px;
      }
      .comment_icon {
          top: 2px;
          color: #777;
          .van-info {
              font-size: 16px;
              background-color: #e22829;
          }
      }
      .btn_item {
          border: none;
          padding: 0;
          height: 40px;
          line-height: 40px;
          color: #777777;
      }
      .collect-btn--collected {
          color: #ffa500;
      }
      .like-btn--liked {
          color: #e5645f;
      }
  }
}
</style>
