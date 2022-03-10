<!--  -->
<template>
<div class='search_container'>
    <!-- 顶部搜索栏 -->
      <form class="search_form" action="/">
        <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @focus="isResultShow=false"
          background="#3296fa"
        />
      </form>
    <!-- /顶部搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
      />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
    />
    <!-- /搜索历史记录 -->

</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import SearchHistory from './components/search_history'
import SearchResult from './components/search_result'
import SearchSuggestion from './components/search_suggestion'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'SearchIndex',
  components: { SearchHistory, SearchResult, SearchSuggestion },
  props: {},
  data () {
    // 这里存放数据
    return {
      searchText: '', // 搜索联想
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: [] // 搜索的历史记录数据
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onSearch (val) {
      // console.log(val)
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // 要求: 不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      // console.log('onCancel')
      this.$router.back()
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
.search_container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search_form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
