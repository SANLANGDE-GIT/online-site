<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <form action="register">
        <div class="input-prepend restyle">
          <input
            v-model="member.nickname"
            type="text"
            placeholder="你的昵称">
          <i class="iconfont icon-user"/>
        </div>
        <div class="input-prepend restyle no-radius">
          <input
            v-model="member.mobile"
            type="text"
            placeholder="手机号">
          <i class="iconfont icon-phone"/>
        </div>
        <div class="input-prepend restyle no-radius" style="position:relative">
          <input
            v-model="member.code"
            type="text"
            placeholder="验证码">
          <i class="iconfont icon-yanzhengma"/>
          <a
            href="javascript:"
            type="button"
            style="position:absolute;right: 10px;top: 15px;"
            @click="getCodeFun">{{ codeText }}</a>
        </div>
        <div class="input-prepend">
          <input
            v-model="member.password"
            type="password"
            placeholder="设置密码">
          <i class="iconfont icon-password"/>
        </div>
        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="注册"
            @click="submitRegister()">
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
      </form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li><a id="weixin" class="weixin" href="http://localhost:8160/api/ucenter/wx/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

import ucenterApi from '~/api/ucenter'

export default {
  layout: 'sign',
  data() {
    return {
      member: {
        mobile: '',
        code: '',
        nickname: '',
        password: ''
      },
      sending: false, // 是否发送验证码
      second: 60, // 倒计时间
      codeText: '获取验证码'
    }
  },
  methods: {
    // 获取验证码
    getCodeFun() {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!reg.test(this.member.mobile)) {
        this.$message.warning('请输入正确的手机号！')
        return
      }
      if (this.sending) { return }
      this.sending = true
      ucenterApi.sendMessage(this.member.mobile).then(response => {
        this.timeDown()
        this.$message.success('短信发送成功！')
      })
    },

    // 倒计时
    timeDown() {
      const ret = setInterval(() => {
        this.second--
        this.codeText = this.second
        if (this.second < 0) {
          clearInterval(ret)
          this.second = 60
          this.sending = false
          this.codeText = '获取验证码'
        }
      }, 1000)
    },

    // 注册
    submitRegister() {
      ucenterApi.register(this.member).then(response => {
        this.$message.success('恭喜您，注册成功！')
        setTimeout(() => {
          window.location = '/login'
        }, 3000)
      })
    }
  },
  checkTelephone(telephone) {
    if (!telephone) { return false }
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(telephone)) {
      return false
    } else {
      return true
    }
  }
}
</script>
