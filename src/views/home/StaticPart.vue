<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe6fa;</span>
    广东省佛山市三水区万达广场2栋B座
    <span class="iconfont position__notice">&#xe8fc;</span>
  </div>

  <div class="search">
    <span class="iconfont">&#xe648;</span>
    <span class="search__text">肯德基每周活动日优惠大放送</span>
  </div>

  <div class="banner">
    <img class="banner__img" src="../../assets/imgs/q70.jpg" alt="banner_img" />
  </div>

  <div class="icons">
    <div
      v-for="item of iconsList"
      :key="item.desc"
      class="icons__item"
    >
      <img
        class="icons__item__img"
        :src="require(`../../assets/icons/${item.imgName}.png`)"
        alt="menu_icon"
      />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘焙蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.position {
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  @include ellipsis;
  color: $content-fontcolor;
  .position__icon {
    position: relative;
    top: .02rem;
    font-size: .2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: .17rem;
    font-size: .2rem;
  }
}
.search {
  height: .32rem;
  line-height: .32rem;
  margin-bottom: .12rem;
  background-color: $search-bgColor;
  color: $search-fontcolor;
  border-radius: .16rem;
  .iconfont {
    position: relative;
    top: .02rem;
    display: inline-block;
    padding: 0 .08rem 0 .16rem;
    font-size: .18rem;
  }
  &__text {
    display: inline-block;
    font-size: .14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 40%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  height: .1rem;
  margin: 0 -.18rem;
  background-color: $content-bgColor;
}
</style>
