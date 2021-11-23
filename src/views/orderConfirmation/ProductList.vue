<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
      <div class="products__wrapper">
        <div class="products__list">
          <div
            class="products__item"
            v-for="item of productList"
            :key="item._id"
          >
            <img
              class="products__item__img"
              :src="item.imgUrl"
              alt="product-img"
            />
            <div class="products__item__detail">
              <h4 class="products__item__title">{{ item.name }}</h4>
              <p class="products__item__price">
                <span>
                  <span class="products__item__yen">&yen; </span>
                  {{ item.price }} x {{ item.count }}
                </span>
                <span class="products__item__total">
                  <span class="products__item__yen">&yen; </span>
                  {{ (item.price * item.count).toFixed(2) }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffects'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList } = useCommonCartEffect(shopId)
    return { shopName, productList }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';
.products {
  margin: .16rem .18rem .1rem;
  background-color: $bgColor;
  &__title {
    padding: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontcolor;
  }
  &__wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 2.64rem;
    bottom: .6rem;
    overflow-y: scroll;
    margin: 0 .18rem;
  }
  &__list {
    background-color: $bgColor;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0 .16rem .16rem .16rem;
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: .06rem 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: $dark-fontColor;
    }
    &__yen {
      font-size: .12rem;
    }
  }
}
</style>
