<template>
  <div class="top">
    <div class="top__header">
      <div
        class="iconfont top__header__back"
        @click="handleBackClick"
      >&#xe679;</div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">广东省佛山市三水区万达广场2号门</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">瑶妹</span>
        <span class="top__receiver__info__name">13800138000</span>
      </div>
      <div class="iconfont top__receiver__icon">&#xe679;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleBackClick = () => { router.back() }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, $btn-bgColor 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: .15rem;
    line-height: .24rem;
    font-size: .16rem;
    color: $bgColor;
    text-align: center;
    &__back {
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }
  &__receiver {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background-color: $bgColor;
    border-radius: .04rem;
    &__title {
      line-height: .22rem;
      padding: .16rem .16rem .14rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__address {
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      color: $content-fontcolor;
    }
    &__info {
      padding: .06rem 0 0 .16rem;
      &__name {
        margin-right: .06rem;
        line-height: .18rem;
        font-size: .12rem;
        color: $medium-fontColor;
      }
    }
    &__icon {
      position: absolute;
      top: .5rem;
      right: .16rem;
      font-size: .16rem;
      color: $medium-fontColor;
      transform: rotate(180deg);
    }
  }
}
</style>
