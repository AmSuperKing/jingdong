<template>
  <div class="wrapper">
    <img class="wrapper__img" src="../../assets/imgs/user.png" alt="user-avatar" />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="text"
        placeholder="请输入用户名"
        v-model="registerData.username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        v-model="registerData.password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="确认密码"
        v-model="registerData.ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleToLogin">已有账号去登录</div>
    <Toast v-if="toastData.toastVisible" :message="toastData.toastMsg" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request.js'
import Toast, { useToastEffect } from '@/components/Toast/Toast'

// 处理注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const registerData = reactive({
    username: '',
    password: '',
    ensurement: ''
  })

  const handleRegister = () => {
    if (!registerData.username || !registerData.password || !registerData.ensurement) {
      showToast('请填写完整用户名/密码')
      return
    }
    post('/api/user/register', {
      username: registerData.username,
      password: registerData.password
    }).then((res) => {
      if (res?.errno === 0) {
        showToast('注册成功')
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 300)
      } else {
        showToast('注册失败')
      }
    }).catch((e) => {
      console.log(e)
      showToast('请求失败')
    })
  }
  return { registerData, handleRegister }
}

// 处理跳转到登录页面逻辑
const useLoginEffect = () => {
  const router = useRouter()
  const handleToLogin = () => {
    router.push({ name: 'Login' })
  }
  return { handleToLogin }
}

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup () {
    const { toastData, showToast } = useToastEffect()
    const { registerData, handleRegister } = useRegisterEffect(showToast)
    const { handleToLogin } = useLoginEffect()
    return { toastData, registerData, handleRegister, handleToLogin }
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
  &__register-button {
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
  &__register-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
