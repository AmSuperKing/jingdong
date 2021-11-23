<template>
  <div class="order">
    <div class="order__price">实付金额<b>&yen;{{ calculations.price }}</b></div>
    <div class="order__btn" @click="() => handleShowComfirm(true)">提交订单</div>
  </div>
  <div
    v-if="showComfirm"
    class="mask"
    @click="() => handleShowComfirm(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--cancel"
          @click="() => handleComfirmOrder(true)"
        >取消订单</div>
        <div
          class="mask__content__btn mask__content__btn--comfirm"
          @click="() => handleComfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
  <Toast v-if="toastData.toastVisible" :message="toastData.toastMsg" />
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { post } from '@/utils/request.js'
import { useCommonCartEffect } from '@/effects/cartEffects'
import Toast, { useToastEffect } from '@/components/Toast/Toast'

// 确认下单相关
const comfirmOrderEffect = (shopId, shopName, productList, showToast) => {
  const store = useStore()
  const router = useRouter()
  const handleComfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: product._id, num: product.count })
    }
    try {
      const res = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (res?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push('/orderList')
      } else {
        showToast('请求出错')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  return { handleComfirmOrder }
}

// 展示确认弹框蒙层相关
const showComfirmEffect = () => {
  const showComfirm = ref(false)
  const handleShowComfirm = (status) => {
    showComfirm.value = status
  }
  return { showComfirm, handleShowComfirm }
}

export default {
  name: 'OrderComfirmation',
  components: {
    Toast
  },
  setup () {
    const route = useRoute()
    const shopId = parseInt(route.params.id)
    const { shopName, calculations, productList } = useCommonCartEffect(shopId)
    const { showComfirm, handleShowComfirm } = showComfirmEffect()
    const { toastData, showToast } = useToastEffect()
    const { handleComfirmOrder } = comfirmOrderEffect(shopId, shopName, productList, showToast)
    return {
      calculations,
      showComfirm,
      handleShowComfirm,
      toastData,
      handleComfirmOrder
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background-color: $bgColor;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: .98rem;
    text-align: center;
    font-size: .14rem;
    color: $bgColor;
    background-color: #4fb0f9;
  }
}

.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, .5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background-color: $bgColor;
    border-radius: .04rem;
    text-align: center;
    &__title {
      line-height: .26rem;
      margin: .24rem 0 0 0;
      font-size: .18rem;
      color: $content-fontcolor;
    }
    &__desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem 0;
    }
    &__btn {
      flex: 1;
      width: .8rem;
      height: .32rem;
      line-height: .32rem;
      border: .01rem solid #4fb0f9;
      border-radius: .16rem;
      font-size: .14rem;
      &--cancel {
        margin-right: .12rem;
        color: #4fb0f9;
      }
      &--comfirm {
        margin-left: .12rem;
        color: $bgColor;
        background-color: #4fb0f9;
      }
    }
  }
}
</style>
