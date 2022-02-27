<!--  -->
<template>
<div class='my_container'>
  <div class="header not_login">
    <div class="login_btn" @click="$router.push('/login') ">
      <img class="mobile_img" src="~@/assets/mobile.png" alt="">
      <span class="text">登录 / 注册</span>
    </div>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'MyIndex',
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
.my_container {
  .header {
    height: 361px;
    // background: url("../../assets/banner.png");
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not_login {
    display: flex; // 水平垂直居中
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中
    .login_btn {
      display: flex;
      flex-direction: column; // 垂直分布(默认是水平分布)
      justify-content: center;
      align-items: center;
      .mobile_img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
}
}
</style>
