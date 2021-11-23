<template>
  <div class="wrapper">
    UserCenter
  </div>
  <Docker :currIndex="3" />
</template>

<script>
import Docker from '@/components/Docker/Docker'

export default {
  name: 'OrderList',
  components: { Docker }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: .5rem;
  overflow-y: auto;
  padding: 0 .18rem .1rem .18rem;
}
</style>
