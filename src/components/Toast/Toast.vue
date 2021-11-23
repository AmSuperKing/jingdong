<template>
  <div class="toast">{{message || 'toast'}}</div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Toast',
  props: ['message']
}
export const useToastEffect = () => {
  const toastData = reactive({
    toastVisible: false,
    toastMsg: ''
  })
  const showToast = (msg) => {
    toastData.toastVisible = true
    toastData.toastMsg = msg
    setTimeout(() => {
      toastData.toastMsg = ''
      toastData.toastVisible = false
    }, 2000)
  }
  return { toastData, showToast }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  padding: .1rem;
  background-color: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  color: $bgColor;
}
</style>
