<!--  -->
<template>
<div class='search_suggestion'>
    <van-cell
      icon="search"
      v-for="(text,index) in Suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
  <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
    <!-- 双花括号会默认输出纯文本内容 -->
  <!-- <div>{{htmlStr}} </div> -->
  <!-- 使用 v-html 指令可以绑定渲染带有 html 标签的字符串 -->
  <!-- <div v-html="htmlStr"></div> -->
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getSearchSuggestions } from '@/api/search'
// 按需加载有好处: 只会把使用到的成员打包到结果中
import { debounce } from 'lodash'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      Suggestions: [] // 联想建议数据列表
      // htmlStr: 'Hello<span style="color: red">world</span>'
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    searchText: {
      // 当 searchText 发送改变的时候就会调用 handler 函数
      // 注意: handler 函数名称是固定的
      // handler (value) {
      //   // console.log(value)
      //   this.loadSearchSuggestions(value)
      // },
      handler: debounce(function (value) {
        // console.log(value)
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  // 方法集合
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        // console.log(data)
        this.Suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败,请稍后重试')
      }
    },
    highlight (text) {
      // console.log(text)
      if (!text) return
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 // 中间的内容都会当作匹配字符来使用, 而不是数据变量
      // 如果需要根据变量动态地创建正则表达式,则手动 new RegExp
      // RegExp 正则表达式构造函数
      //  参数1: 匹配模式字符串, 它会根据这个字符串创建正则对象
      //  参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr) // replace 返回一个替换后的新字符串
      // return '测试内容'
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
.search_suggestion {
  /deep/ span.active {
    color: #3296fa
  }
}
</style>
