import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home'),
    meta: { title: '主页' }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/shop/Shop'),
    meta: { title: '详情' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cartList" */ '@/views/cartList/CartList'),
    meta: { title: '购物车' }
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '@/views/orderList/OrderList'),
    meta: { title: '订单' }
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderComfirmation" */ '@/views/orderConfirmation/OrderConfirmation'),
    meta: { title: '确认订单' }
  },
  {
    path: '/userCenter',
    name: 'UserCenter',
    component: () => import(/* webpackChunkName: "userCenter" */ '@/views/userCenter/UserCenter'),
    meta: { title: '我的' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login'),
    meta: { title: '登录' },
    beforeEnter (to, from, next) {
      // console.log('to, from', to, from)
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/register/Register'),
    meta: { title: '注册' },
    beforeEnter (to, from, next) {
      // console.log('to, from', to, from)
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('to:', to)
  // console.log('from:', from)
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})

export default router
