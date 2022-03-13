<!--  -->
<template>
<van-button
  :icon="value ? 'star' : 'star-o'"
  :class="{
    collected: value
  }"
  :loading="loading"
  @click="onCollect"
/>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { addCollect, deleteCollect } from '@/api/article'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'collect_article',
  components: {},
  props: {
    value: {
      type: Boolean,
      reuired: true
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
      this.loading = true
      try {
        if (this.value) {
          // 已收藏,取消收藏
          await deleteCollect(this.article_id)
        } else {
          // 没有收藏,添加收藏
          await addCollect(this.article_id)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败,请重试！')
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
.collected {
  .van-icon {
    color: #ffa500
  }
}
</style>
