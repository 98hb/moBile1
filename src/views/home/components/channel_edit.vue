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
    @click="isEdit = !isEdit"
    >
    {{ isEdit ? '完成' : '编辑'}}
    </van-button>
  </van-cell>
  <van-grid class="my_grid" :gutter="10">
  <van-grid-item
    class="grid_item"
    v-for="(channel, index) in MyChannels"
    :key="index"
    @click="onMyChannelClick(channel, index) "
  >
  <!--
    v-bind:class 语法
    一个对象，对象中的 key 表示要作用的 CSS 类名
    对象中的 value 要计算出布尔值
    true,则作用该类名
    false,不作用类名
   -->
   <van-icon
   v-show="isEdit && !fixedChannels.includes(channel.id) "
   slot="icon"
   name="clear"></van-icon>
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
      v-for="(channel, index) in recommendChannels"
      :key="index"
      icon="plus"
      :text="channel.name"
      @click="onAddChannel(channel) "
    />
    </van-grid>
  <!-- /频道推荐 -->
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getAllChannels } from '@/api/channel'

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
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fixedChannels: [0] // 固定频道,不允许删除
    }
  },
  // 监听属性 类似于data概念
  computed: {
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发生变化,则计算属性会重新执行
    recommendChannels () {
      console.log('测试执行计算次数')
      // 数组的 filter 方法: 遍历数组,把符合条件的元素存储到新数组中并返回
      return this.allChannels.filter(channel => {
        // const channels = []

        // 数组的 find 方法: 遍历找到数组,把符合条件的第1个元素返回
        return !this.MyChannels.find(MyChannel => {
          return MyChannel.id === channel.id
        })

        // return channels
      })
    }
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     // find 遍历数组,找到满足条件的元素项
    //     const ret = this.MyChannels.find(MyChannel => {
    //       return MyChannel.id === channel.id
    //     })
    //     // 如果我的频道中不包括该频道项,则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onAddChannel (channel) {
      // console.log(channel)
      this.MyChannels.push(channel)
    },
    onMyChannelClick (channel, index) {
      // console.log(channel, index)
      if (this.isEdit) {
        // 1.如果是固定频道,则不删除
        if (this.fixedChannels.includes(channel.id)) {
          return
        }
        // 2.删除频道项
        this.MyChannels.splice(index, 1)

        // 3.如果删除的激活频道之前的频道,则更新激活的频道项
        // 参数1: 要删除的元素的索引 (包括)
        // 参数2: 删除的个数,如果不指定,则从参数1开始一直删除到最后
        if (index <= this.active) {
          // 让激活频道的索引 - 1
          this.$emit('update_active', this.active - 1, true)
        }
      } else {
        // 非编辑状态,执行切换频道
        this.$emit('update_active', index, false)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadAllChannels()
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
        .van-grid-item__icon-wrapper {
          position: unset;
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
