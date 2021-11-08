import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/cart/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/kind',
    name: 'Kind',
    component: () => import(/* webpackChunkName: "about" */ '../views/kind/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/index.vue')
  },
  {
    path: '/detail/:proid', // 动态路由
    name: 'detail', // 命名路由
    component: () => import('./../views/detail/index.vue'), // 路由懒加载
    meta: { // 路由元信息
      hidden: true // 隐藏底部导航
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/login/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./../views/search/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/searchlist/:category',
    name: 'searchlist',
    component: () => import('./../views/search/list.vue')
  },
  {
    path: '/order/:time',
    name: 'order',
    component: () => import('./../views/order/index.vue')
    // meta: {
    //   hidden: true
    // }
  },
  {
    path: '/addorderaddress/:time',
    name: 'addorderaddress',
    component: () => import('./../views/order/add.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/updateorderaddress',
    name: 'updateorderaddress',
    component: () => import('./../views/order/update.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/categorybrandlist/:category/:brand',
    name: 'categorybrandlist',
    component: () => import('./../views/kind/brand.vue')
  },
  {
    path: '/orderaddresslist/:time',
    name: 'orderaddresslist',
    component: () => import('./../views/order/list.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./../views/register/index.vue'),
    meta: {
      hidden: true
    },
    children: [
      {
        path: 'step1/:loginname',
        name: 'regStep1',
        component: () => import('./../views/register/step1.vue'),
        meta: {
          hidden: true
        }
      },
      {
        path: 'step2',
        name: 'regStep2',
        component: () => import('./../views/register/step2.vue'),
        meta: {
          hidden: true
        }
      },
      {
        path: 'step3',
        name: 'regStep3',
        component: () => import('./../views/register/step3.vue'),
        meta: {
          hidden: true
        }
      }
    ]
  },
  {
    path: '*',
    component: () => import('./../views/error/notFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
