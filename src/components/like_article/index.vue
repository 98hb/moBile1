<!--  -->
<template>
<van-button
  :icon="value === 1 ? 'good-job' : 'good-job-o'"
  :class="{
    liked: value === 1
  }"
  :loading="loading"
  @click="onCollect"
/>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { addLike, deleteLike } from '@/api/article'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'like_article',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    article_id: {
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
    async onCollect () {
      //   console.log('onCollect')
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLike(this.article_id)
        } else {
          // 没有点赞,添加点赞
          await addLike(this.article_id)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败,请重试!')
      }
      this.loading = false
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
.liked {
  .van-icon {
    color: #e5645f
  }
}
</style>
