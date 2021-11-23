<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) of list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">
            {{ item.isCanceled ? '已取消' : '已下单'}}
          </span>
        </div>
        <div class="order__content" >
          <div class="order__content__imgs">
            <template
              v-for="(innerItem, i) of item.products"
              :key="i"
            >
              <img
                v-if="i < 4"
                class="order__content__img"
                :src="innerItem.product.img"
              />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">&yen; {{ item.totalPrice }}</div>
            <div class="order__content__count">共{{ item.totalNum }}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '@/utils/request'
import Docker from '@/components/Docker/Docker'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const res = await get('/api/order')
    console.log('getOrderList', res)
    if (res?.errno === 0 && res?.data?.length) {
      const orderData = res.data
      orderData.forEach(order => {
        const products = order.products || []
        let totalPrice = 0
        let totalNum = 0
        products.forEach(productItem => {
          totalNum += (productItem?.orderSales || 0)
          totalPrice += (productItem?.product?.price * productItem?.orderSales) || 0
        })
        order.totalPrice = totalPrice
        order.totalNum = totalNum
      })
      data.list = res.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: .5rem;
  overflow-y: auto;
  background-color: $search-bgColor;
}
.title {
  line-height: .44rem;
  font-size: .16rem;
  color: $content-fontcolor;
  text-align: center;
  background-color: $bgColor;
}
.orders {

}
.order {
  margin: .16rem .18rem;
  padding: .16rem;
  background-color: $bgColor;
  &__title {
    margin-bottom: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontcolor;
  }
  &__status {
    float: right;
    font-size: .14rem;
    color: $light-fontColor;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info {
      width: .7rem;
    }
    &__price {
      margin-bottom: .04rem;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
      text-align: right;
    }
    &__count {
      line-height: .14rem;
      font-size: .12rem;
      color: $content-fontcolor;
      text-align: right;
    }
  }
}
</style>
