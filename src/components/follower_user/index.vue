<!--  -->
<template>
<van-button
      v-if="is_followed"
      class="follow_btn"
      round
      size="small"
      :loading="loading"
      @click="onFollow"
    >
        已关注
    </van-button>
    <van-button
      v-else
      class="follow_btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="loading"
      @click="onFollow"
    >
        关注
    </van-button>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { addFollow, deleteFollow } from '@/api/user'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'FollowUser',
  components: {},
  // 自定义 v-model 的数据名称
  model: {
    prop: 'is_followed', // 默认是value
    event: 'update_is_followed' // 默认是 input
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    user_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      loading: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onFollow () {
      this.loading = true // 展示关注按钮的 loading 状态
      try {
        if (this.is_followed) {
          // 已关注,取消关注
          // const { data } = await deleteFollow(this.article.aut_id)
          // console.log(data)
          await deleteFollow(this.user_id)
          // this.article.value = false
        } else {
          // 没有关注,添加关注
          // const { data } = await addFollow(this.article.aut_id)
          // console.log(data)
          await addFollow(this.user_id)
          // this.article.value = true
        }
        // 更新视图状态
        // this.article.value = !this.article.value
        // this.$emit('update_value', !this.value)
        this.$emit('update_is_followed', !this.is_followed)
      } catch (err) {
        console.log(err)
        let message = '操作失败,请重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己!'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭关注按钮的 loading 状态
    }
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

</style>
