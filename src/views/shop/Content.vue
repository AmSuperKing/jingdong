<template>
  <div class="content">
    <div class="category">
      <div
        class="category__item"
        :class="{'category__item--active': currentTab === item.tab}"
        v-for="item of categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >{{item.name}}</div>
    </div>
    <div class="product">
      <div
        class="product__item"
        v-for="item of list"
        :key="item._id"
      >
        <img
          class="product__item__img"
          :src="item.imgUrl"
          alt="product-img"
        />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售 {{item.sales}} 件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="() => {changeCartItem(shopId, item._id, item, -1, shopName)}"
          >-</span>
          <!-- {{getProductCartCount(shopId, item._id)}}不生效有待解决 -->
          {{cartList?.[shopId]?.productList?.[item._id]?.count || 0}}
          <span
            class="product__number__plus"
            @click="() => {changeCartItem(shopId, item._id, item, 1, shopName)}"
          >+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '@/utils/request.js'
import { useCommonCartEffect } from '@/effects/cartEffects'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// tab 切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  // 获取列表内容
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    // console.log(result)
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }
  watchEffect(() => { getContentData() })

  const { list } = toRefs(content)
  return { list }
}

const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'Content',
  props: {
    shopName: {
      type: String,
      default: ''
    }
  },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()
    return {
      categories,
      shopId,
      currentTab,
      handleTabClick,
      list,
      cartList,
      changeCartItem,
      getProductCartCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category {
  width: .76rem;
  height: 100%;
  overflow-y: scroll;
  background-color: $search-bgColor;
  &__item {
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: $content-fontcolor;
    &--active {
      background-color: $bgColor;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    position: relative;
    display: flex;
    margin: 0 .16rem;
    padding: .12rem 0;
    border-bottom: .01rem solid $content-bgColor;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: .06rem 0;
      line-height: .16rem;
      font-size: .12rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
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
    bottom: .12rem;
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
</style>
