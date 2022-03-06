<!--  -->
<template>
<div class='channel_edit'>
  <van-cell :border="false">
    <div slot="title" class="title_text">我的频道</div>
    <van-button
    size="mini"
    type="danger"
    round
    plain
    class="edit_btn"
    >
    编辑
    </van-button>
  </van-cell>
  <van-grid class="my_grid" :gutter="10">
  <van-grid-item
    class="grid_item"
    v-for="(channel, index) in MyChannels"
    :key="index"
    icon="clear"
  >
  <!--
    v-bind:class 语法
    一个对象，对象中的 key 表示要作用的 CSS 类名
    对象中的 value 要计算出布尔值
    true,则作用该类名
    false,不作用类名
   -->
  <span class="text"
  :class=" { active: index === active } "
  slot="text"
  >{{channel.name}}</span>
  </van-grid-item>
  </van-grid>
  <!-- 频道推荐 -->
  <van-cell :border="false">
    <div slot="title" class="title_text">频道推荐</div>
  </van-cell>
  <van-grid class="recommend_grid" :gutter="10">
  <van-grid-item
    class="grid_item"
    v-for="value in 8"
    :key="value"
    icon="plus"
    text="文字测试"
    />
  </van-grid>
  <!-- /频道推荐 -->
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'ChannelEdit',
  components: {},
  props: {
    MyChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
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
  .channel_edit {
    padding: 85px 0;

    .title_text {
      color: #333333;
      font-size: 32px;
    }

    .edit_btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }

    /deep/ .my_grid {
      .grid_item {
        .van-icon-clear {
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 30px;
          color: #cacaca;
          z-index: 2;
        }
      }
    }

    /deep/ .grid_item { // 子组件根节点
      width: 160px;
      height: 86px;

      .van-grid-item__content {
        white-space: nowrap;
        background-color: #f4f5f6;
      } // 作用域样式 非根节点
        .van-grid-item__text, .text {
          color: #222222;
          font-size: 28px;
          margin-top: 0;
        }
        .active {
          color: #f85959;
        }
    }

    /deep/ .recommend_grid {
      .grid_item {
        .van-grid-item__content {
          flex-direction: row;
          .van-icon-plus {
            font-size: 28px;
            margin-right: 6px;
          }
        }
      }
    }
  }
</style>
