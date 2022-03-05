import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// dayjs 默认语言是英文,我们这里配置为中文
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用相对时间的插件
dayjs.extend(relativeTime)
// 全局使用
dayjs.locale('zh-cn')

// dayjs() 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))
// dayjs().from(dayjs('1990')) // 2 years ago
// // console.log(dayjs('1998').toNow())
// dayjs().from(dayjs(), true) // 2 years

// dayjs().fromNow()

// dayjs().to(dayjs())

// dayjs().toNow()
// 定义一个全局过滤器,然后就可以在任何组件的模块使用，(仅供模板使用的方法)
// 参数1: 过滤器名称(勿重复)
// 参数2: 过滤器函数
// 使用方式: {{ 表达式 | 过滤器名称}}
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  // console.log(value)
  // return 123
  return dayjs().to(dayjs(value))
})
