<template>
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  />
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemsChecked(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe652;' : '&#xe66c;'"
          />
          全选
        </div>
        <div class="product__header__clear">
          <span
            class="product__header__clear__btn"
            @click="() => cleanCartProducts(shopId)"
          >清空购物车</span>
        </div>
      </div>
      <div
        class="product__item"
        v-for="item of productList"
        :key="item._id"
      >
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe652;' : '&#xe66c;'"
          @click="() => changeCartItemCheck(shopId, item._id)"
        />
        <img
          class="product__item__img"
          :src="item.imgUrl"
          alt="product-img"
        />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="() => changeCartItemInfo(shopId, item._id, item, -1)"
          >-</span>
          <!-- {{cartList?.[shopId]?.[item._id]?.count || 0}} -->
          {{item.count || 0}}
          <span
            class="product__number__plus"
            @click="() => changeCartItemInfo(shopId, item._id, item, 1)"
          >+</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt="shop-car"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{calculations.total}}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{calculations.price}}</span>
      </div>
      <div v-if="calculations.total" class="check__btn">
        <router-link :to="{path: `/orderConfirmation/${shopId}`}">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffects'

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const {
    productList,
    changeCartItemInfo,
    calculations
  } = useCommonCartEffect(shopId)

  const changeCartItemCheck = (shopId, productId) => {
    store.commit('changeCartItemCheck', { shopId, productId })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }

  return {
    calculations,
    productList,
    changeCartItemInfo,
    changeCartItemCheck,
    cleanCartProducts,
    setCartItemsChecked
  }
}

const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const {
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId)
    const { showCart, handleCartShowChange } = toggleCartEffect()
    return {
      shopId,
      calculations,
      productList,
      showCart,
      changeCartItemInfo,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsChecked,
      handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, .5);
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: $bgColor;
}
.product {
  flex: 1;
  overflow-y: scroll;
  background-color: $bgColor;
  &__header {
    display: flex;
    line-height: .52rem;
    border-bottom: .01rem solid $content-bgColor;
    font-size: .14rem;
    color: $content-fontcolor;
    &__all {
      width: .64rem;
      margin-left: .16rem;
    }
    &__icon {
      display: inline-block;
      vertical-align: top;
      font-size: .2rem;
      color: $btn-bgColor;
    }
    &__clear {
      flex: 1;
      margin-right: .16rem;
      text-align: right;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    margin: 0 .16rem;
    padding: .12rem 0;
    border-bottom: .01rem solid $content-bgColor;
    &__checked {
      line-height: .5rem;
      margin-right: .2rem;
      font-size: .2rem;
      color: $btn-bgColor;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
  }
  .product__number {
    position: absolute;
    right: 0;
    bottom: .26rem;
    &__minus, &__plus {
      display: inline-block;
      width: .2rem;
      height: .2rem;
      line-height: .18rem;
      border-radius: 50%;
      font-size: .2rem;
      text-align: center;
    }
    &__minus {
      margin-right: .05rem;
      color: $medium-fontColor;
      border: .01rem solid $medium-fontColor;
    }
    &__plus {
      margin-left: .05rem;
      color: $bgColor;
      border: .01rem solid $btn-bgColor;
      background-color: $btn-bgColor;
    }
  }
}
.check {
  display: flex;
  box-sizing: border-box;
  height: .49rem;
  line-height: .49rem;
  border-top: .01rem solid $content-bgColor;
  &__icon {
    position: relative;
    width: .84rem;
    &__img {
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }
    &__tag {
      position: absolute;
      z-index: 99;
      top: .04rem;
      left: .45rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: $hightlight-fontColor;
      border-radius: .1rem;
      text-align: center;
      font-size: .12rem;
      color: $bgColor;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    font-size: .12rem;
    color: #333;
    &__price {
      line-height: .49rem;
      font-size: .18rem;
      color: $hightlight-fontColor;
    }
  }
  &__btn {
    width: .98rem;
    text-align: center;
    font-size: .14rem;
    background-color: #4fb0f9;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
