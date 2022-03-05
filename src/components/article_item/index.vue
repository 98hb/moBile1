<!--  -->
<template>
  <van-cell
    class='article_item'
    >
    <!-- 文章标题 -->
    <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
    <!-- /文章标题 -->
    <!-- 展示底部信息 -->
    <div slot="label">
      <div
      v-if="article.cover.type === 3" class="cover_wrap">
      <!-- 这里有三张图片 -->
      <div
      class="cover_item"
      v-for="(img, index) in article.cover.images"
      :key="index"
      >
        <van-image
        class="cover_item_img"
        :src="img"
        fit="cover"
      />
      </div>
          <!-- <div class="cover_item"></div>
          <div class="cover_item"></div>
          <div class="cover_item"></div> -->
      </div>
      <div class="label_info_wrap">
          <span>{{article.aut_name}} </span>
          <span>{{article.comm_count}}评论 </span>
          <span>{{article.pubdate | relativeTime }} </span>
      </div>
    </div>
     <!-- /这里有一张图片 -->
    <van-image
      class="right_cover"
      fit="cover"
      v-if="article.cover.type === 1"
      slot="default"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

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
.article_item {
    .title {
        color: #3a3a3a;
        font-size: 32px;
    }

    .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 26px;
    }
    .right_cover {
      width: 232px;
      height: 146px;
    }
    .label_info_wrap span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
    .cover_wrap {
      display: flex;
      padding: 30px 0;
        .cover_item {
          flex: 1;
          height: 146px;
          &:not(:last-child) {
              padding-right: 4px
          }
        }
          .cover_item_img {
              width: 100%;
              height: 146px;
          }
    }
}
</style>
