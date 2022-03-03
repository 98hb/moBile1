<!--  -->
<template>
<div class='home_container'>
  <!-- 导航栏 -->
    <van-nav-bar id="page_nav_bar">
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
    <van-tabs class="chanel_tabs" v-model="active" animated swipeable>
      <van-tab
        :title="chanel.name"
        v-for="chanel in channels"
        :key = chanel.id
      >{{chanel.name}}内容</van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger_btn">
        <i class="iconfont toutiao_gengduo" ></i>
      </div>
  </van-tabs>
    <!-- /频道列表 -->
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getUserChannels } from '@/api/user'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    // 这里存放数据
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadChanels () {
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadChanels()
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
  /deep/ .chanel_tabs {
    .van-tabs__wrap{
      height: 82px;
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
