<!--  -->
<template>
<div class='article_list'>
    <!-- 封装一个文章列表组件 -->
    <!-- 文章列表 -->
    <van-pull-refresh
    v-model="isreFreshLoading"
    :success-text="refreshSuccessText"
    :success-duration="800"
    @refresh="onRefresh">

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
    <van-cell
    v-for="(article, index) in list"
    :key="index"
    :title="article.title" />
    </van-list>
    </van-pull-refresh>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getArticles } from '@/api/article'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'ArticleList',
  components: {},
  props: {
    channel: { // 接收频道对象
      type: Object,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      /*
      load 滚动条与底部距离小于 offset 时触发
      List有以下三种状态，理解这些状态有助于你正确地使用List组件：

      非加载中，loading为false，此时会根据列表滚动位置判断是否触发load事件（列表内容不足一屏幕时，会直接触发）
      加载中，loading为true，表示正在发送异步请求，此时不会触发load事件
      加载完成，finished为true，此时不会触发load事件
      在每次请求完毕后，需要手动将loading设置为false，表示加载结束 */
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 设置成 true
    // onLoad () {
    //   console.log('onload')
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //       // 0 + 1 = 1
    //       // 1 + 1 = 2
    //       // 2 + 1 = 3
    //       // ...
    //       // 9 + 1 = 10
    //       // this.loading = true 不加载这个 函数代码往后自增了
    //     }

    //     // 加载状态结束 写false 会继续自增
    //     this.loading = false

    //     // 数据全部加载完成
    //     // 写了 finshed 为true的条件，不会继续自增，而且显示加载结束类似自定义话语
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID props 里面的参数
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1
        })
        // if (Math.random() > 0.5) { // 模拟随机失败的情况
        //   JSON.parse('dlsadfag')
        // } // 测试完即可注释
        // console.log(data)
        // 2. 把请求数据加载结束之后要把加载状态设置为结束
        const { results } = data.data
        this.list.push(...results) // 数组的展开操作符,它会把数组元素一个一个拿出来
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了,将 finished 设置为 true,不再 load 加载更多
          this.finished = true
        }
      } catch (err) {
        // console.log('请求失败', err)
        this.error = true // 展示错误状态
        this.loading = false // 请求失败Loading也需要关闭
      }
    },
    async onRefresh () { // 当下拉刷新的时候会触发该函数
      try {
        // 请求获取数据
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID props 里面的参数
          timestamp: Date.now(), // 下拉刷新,每次请求获取最新数据,所以传递当前最新时间戳
          with_top: 1
        })
        // if (Math.random() > 0.1) { // 模拟随机失败的情况
        //   JSON.parse('dlsadfag')
        // } // 测试完即可注释

        // 2.将数据追加到列表的顶部
        // this.list.unshift(...data.data.results)

        const { results } = data.data
        this.list.unshift(...results)

        // 3.关闭下拉刷新的 loading 状态

        this.isreFreshLoading = false

        // 更新下拉刷新成功提示的文本

        this.refreshSuccessText = `刷新成功,更新了${results.length}条数据`
      } catch (err) {
        // console.log('请求失败', err)
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
      // console.log('onRefresh') // 测试
      // setTimeout(() => {
      //   Toast ('刷新成功')
      //   this.isLoading = false
      //   this.count++
      // }, 1000)
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
.article_list {
  // height: 100%; // 百分比单位是相对父元素的
  height: 79vh; // 不受父元素影响
  overflow-y: auto;
}
</style>
