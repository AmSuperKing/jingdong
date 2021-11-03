<template>
  <div class="wrapper">
    <img class="wrapper__img" src="../../assets/imgs/user.png" alt="user-avatar" />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="text"
        placeholder="用户名"
        v-model="loginData.username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        v-model="loginData.password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleToRegister">立即注册</div>
    <Toast v-if="toastData.toastVisible" :message="toastData.toastMsg" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request.js'
import Toast, { useToastEffect } from '@/components/Toast/Toast'

// 处理登录相关逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const loginData = reactive({
    username: '',
    password: ''
  })

  const handleLogin = () => {
    if (!loginData.username || !loginData.password) {
      showToast('请填写用户名/密码')
      return
    }
    post('/api/user/login', loginData).then((res) => {
      // console.log(res)
      if (res?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    }).catch((e) => {
      console.log(e)
      showToast('请求失败')
    })
  }
  return { loginData, handleLogin }
}

// 处理跳转到注册页面相关逻辑
const useRegisterEffect = () => {
  const router = useRouter()
  const handleToRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleToRegister }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  // setup函数的职责，告诉你，代码执行的一个流程
  setup () {
    const { toastData, showToast } = useToastEffect()
    const { loginData, handleLogin } = useLoginEffect(showToast)
    const { handleToRegister } = useRegisterEffect()
    return {
      loginData,
      toastData,
      handleLogin,
      handleToRegister
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }
  &__input {
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: .06rem;
    background-color: #f9f9f9;
    &__content {
      width: 100%;
      line-height: .48rem;
      border: none;
      outline: none;
      background: none;
      font-size: .15rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-button {
    height: .48rem;
    line-height: .48rem;
    margin: .32rem .4rem .16rem .4rem;
    border-radius: .04rem;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, .32);
    font-size: .16rem;
    color: $bgColor;
    text-align: center;
  }
  &__login-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
