<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <CommitOrder />
  </div>
</template>

<script>
import TopArea from './TopArea'
import ProductList from './ProductList'
import CommitOrder from './CommitOrder'

export default {
  name: 'OrderComfirmation',
  components: {
    TopArea,
    ProductList,
    CommitOrder
  },
  setup () {
    return {}
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
  bottom: 0;
  overflow: scroll;
  background-color: $search-bgColor;
}
</style>
