<!--  -->
<template>
  <van-cell
  class='aritcle_item'
  >
  <!-- 文章标题 -->
  <div slot="title"
  class="title"
  >
      {{article.title}}
  </div>
  <!-- /文章标题 -->
  <!--  -->
  <div slot="label">
      <div
      v-if="article.cover.type === 3"
      class="cover_wrap"
      >
      <!-- 这里有三张图片 -->
      <div
      class="cover_item"
      v-for="(img, index) in article.cover.images"
      :key="index"
      >
        <van-image
        width="100"
        height="100"
        :src="img"
      />
      </div>
          <!-- <div class="cover_item"></div>
          <div class="cover_item"></div>
          <div class="cover_item"></div> -->
      </div>
      <div>
          <span>{{article.aut_name}} </span>
          <span>{{article.comm_count}}评论 </span>
          <span>{{article.pubdate}} </span>
      </div>
  </div>
  <!-- / -->
  <!--  -->
    <van-image slot="default"
    v-if="article.cover.type === 1"
    width="100"
    height="100"
    :src="article.cover.images[0]"
  />
  <!-- / -->
  </van-cell>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
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

</style>
