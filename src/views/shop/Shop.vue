<template>
  <div class="wrapper">
    <div class="search">
      <div
        class="search__back iconfont"
        @click="handleBack"
      >&#xe679;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe648;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称"
        />
      </div>
    </div>
    <ShopInfo v-show="item.imgUrl" :item="item" :hideBorder="true" />
    <Content :shopName="item.name || ''" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
// useRouter 指的是整个大的路由信息; useRoute 获取当前路由的内容
import { useRouter, useRoute } from 'vue-router'
import { get } from '@/utils/request.js'
import ShopInfo from '@/components/ShopInfo/ShopInfo'
import Content from './Content'
import Cart from './Cart'

// 返回上一页
const useBackEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return { handleBack }
}

// 获取商家详情信息
const useShopDetailEffect = () => {
  const route = useRoute()
  // console.log(route.name, route.params)
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    // console.log(result)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { handleBack } = useBackEffect()
    const { item, getItemData } = useShopDetailEffect()
    getItemData()
    return { item, handleBack }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.wrapper {
  padding: 0 .18rem;
}

.search {
  display: flex;
  line-height: .32rem;
  margin: .2rem 0 .04rem 0;
  &__back {
    width: .32rem;
    font-size: .24rem;
    color: #b6b6b6;
  }
  &__content {
    flex: 1;
    display: flex;
    background-color: $search-bgColor;
    border-radius: .16rem;
    &__icon {
      width: .44rem;
      text-align: center;
      color: $search-fontcolor;
    }
    &__input {
      display: block;
      width: 100%;
      height: .32rem;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      font-size: .14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
