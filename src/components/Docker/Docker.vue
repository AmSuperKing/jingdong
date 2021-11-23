<template>
  <div class="docker">
    <!-- BEM(Block__Element--Modifier) 命名规则，双下划线双横线 -->
    <div
      v-for="(item, index) of dockerList"
      :key="item.icon"
      :class="{'docker__item': true, 'docker__item--active': index === currIndex ? true : false}"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: {
    currIndex: {
      type: Number,
      default: 0
    }
  },
  setup () {
    const dockerList = [
      { icon: '&#xe6bb;', text: '首页', to: '/' },
      { icon: '&#xe645;', text: '购物车', to: '/cart' },
      { icon: '&#xe60c;', text: '订单', to: '/orderList' },
      { icon: '&#xe6b3;', text: '我的', to: '/userCenter' }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  // & 符号表示外层的修饰符，用于引用父元素
  // & 表示 .docker, &__item 等于 .docker__title
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    &--active {
      a {
        color: #1FA4FC;
      }
    }
  }
  &__title {
    font-size: .2rem;
    transform: scale(.5, .5);
    transform-origin: center top;
  }
}
</style>
