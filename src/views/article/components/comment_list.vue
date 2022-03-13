<!--  -->
<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败,请点击重试"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
    />
  </van-list>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getComments } from '@/api/comment'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'comment_list',
  components: {},
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记(时间戳)
      limit: 10,
      error: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        // console.log(this.offset)
        const { data } = await getComments({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 2. 将数据添加到列表中
        console.log(data)
        const { results } = data.data
        this.list.push(...results)
        // 把文章的总数量传递到外部
        this.$emit('onload_success', data.data)
        // 3. 将 loading 设置为 false
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          //  有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          //  没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
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
