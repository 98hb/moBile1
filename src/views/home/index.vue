<!--  -->
<template>
<div class='home_container'>
  <!-- 导航栏 -->
    <van-nav-bar id="page_nav_bar" fixed>
      <van-button
      class="search_btn"
      slot="title"
      type="info"
      size="small"
      round
      icon="search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel_tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key = channel.id
      >
        <!-- 文章列表 -->
        <!-- 把频道对象传递给文章列表组件 -->
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <!-- 汉堡按钮 -->
      <div
      slot="nav-right"
      class="hamburger_btn"
      @click="isChannelEditShow = true"
      >
        <i class="iconfont toutiao_gengduo" ></i>
      </div>
      <!-- /汉堡按钮 -->
  </van-tabs>
    <!-- /频道列表 -->
  <!-- 频道编辑弹出层 -->
  <van-popup
    v-model="isChannelEditShow"
    closeable
    position="bottom"
    :style="{ height: '100%' }"
    close-icon-position="top-left"
  >
  <channel-edit
    :my-channels="channels"
    :active="active"
    @update_active="onUpdateActive"
  />
  <!--  // 方式一. 通过 Vue.use 注册
        // 注册完成后，在模板中通过 <van-button> 或 <VanButton> 标签来使用按钮组件 -->
  <!-- <ChannelEdit></ChannelEdit> -->
  </van-popup>
  <!-- /频道编辑弹出层 -->
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article_list' // 注册且使用文章列表组件
import ChannelEdit from './components/channel_edit.vue' // 注册且使用频道编辑弹出层
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit }, // 注册且使用频道编辑组件
  props: {},
  data () {
    // 这里存放数据
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false // 控制编辑频道弹出层的显示状态
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChannelEditShow = true) {
      // console.log('home', index)
      // 更新激活的频道项
      this.active = index
      // 关闭编辑频道弹层
      this.isChannelEditShow = isChannelEditShow
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadChannels()
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
.home_container {
  /* 添加上padding 撑开高度 */
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search_btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
  .van-icon {
    font-style: 32px;
  }
  }
  /deep/ .channel_tabs {
    .van-tabs__wrap{
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      width: 100%;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #5d5d5d;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placeholder {
     width: 66px;
     height: 82px;
     flex-shrink: 0; // 默认是1,不让此标签参与计算
    }
    .hamburger_btn {
      // background-color: #eee;
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center; // 水平居中
      align-items: center; // 垂直居中
      background-color: rgb(255, 255, 255);
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: "";
        width: 10px;
        height: 100%;
        position: absolute;
        left: 0;
        // background-image: url(../../assets/gradient-gray-line.png);
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
/* .形状_2_拷贝_3 {
  background-image: url("形状 2 拷贝 3.png");
  position: absolute;
  left: 683px;
  top: 141px;
  width: 1px;
  height: 58px;
  z-index: 22;
}
 */
  }
}
</style>
