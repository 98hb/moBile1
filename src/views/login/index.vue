<template>
  <div class="login_container">
    <!-- 导航栏 -->
    <van-nav-bar
    title="登录"
    >
      <van-icon
      slot="left"
      name="cross"
      @click="$router.back() "
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form
    ref="loginForm"
    @submit="onSubmit">
      <van-field
        v-model ="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont toutiao_shouji"></i>
      </van-field>
      <van-field
        v-model ="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont toutiao_yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000*6"
            format=" ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send_sms_btn"
            @click="onSendSms"
            native-type="button"
            round
            size="small"
            type="default"
            >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login_btn_wrap">
        <van-button class="login_btn " block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // onSubmit (values) {
    //   console.log('submit', values)
    // }
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        // const res = await login(user)
        // console.log('登陆成功', res)
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功,跳转回原来页面
        // back的方式不严谨,后面优化可以再修改
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log('登陆失败,请稍后重试', err)
          this.$toast.fail('登陆失败,请稍后重试')
        }
      }
    },
    async onSendSms () {
      console.log('onSendSms')
      try {
        await this.$refs.loginForm.validate('mobile')
        // console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      } // console.log('测试return是否继续往后执行')
      this.isCountDownShow = true
      try {
        // const res = await sendSms(this.user.mobile)
        // console.log('发送成功', res)
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        // console.log('发送失败', err)
        if (err.response.status === 429) {
          this.$toast('发送太频繁了,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login_container {
  .iconfont {
    font-size: 37px;
  }
  .send_sms_btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login_btn_wrap {
    padding: 53px 33px;
    .login_btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
 .van-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title, .van-icon {
      color: #fff;
    }
  }
</style>
