<!--  -->
<template>
<div class='layout_container'>
    <!-- 组件布局 -->
    <router-view />
    <van-tabbar
    class="layout_tabbar"
    route
    >
      <van-tabbar-item
      to = "/"
      >
        <i slot="icon" class="iconfont toutiao_shouye" ></i>
        <span class="text" >首页</span>
      </van-tabbar-item>
      <van-tabbar-item
      to = "/qa"
      >
        <i slot="icon" class="iconfont toutiao_wenda" ></i>
        <span class="text" >问答</span>
      </van-tabbar-item>
      <van-tabbar-item
      to = "/video"
      >
        <i slot="icon" class="iconfont toutiao_shipin" ></i>
        <span class="text" >视频</span>
      </van-tabbar-item>
      <van-tabbar-item
      to = "/my"
      >
        <i slot="icon" class="iconfont toutiao_wode" ></i>
        <span class="text" >我的</span>
      </van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'LayoutIndex',
  components: {},
  props: {},
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
.layout_container {
  .layout_tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
