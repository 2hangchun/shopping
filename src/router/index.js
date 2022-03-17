import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return originPush.call(this, location, onComplete, onAbort)
  }
  else {
    return originPush.call(this, location).then(() => { }).catch(() => { })
  }
}


VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return originReplace.call(this, location, onComplete, onAbort)
  }
  else {
    return originReplace.call(this, location).then(() => { }).catch(() => { })
  }
}

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: "/home",
      component: () => import('@/pages/Home'),
      meta: {
        show: true,
        needLogin: false
      }
    },
    {
      path: "/register",
      component: () => import('@/pages/Register'),
      meta: {
        show: true,
        needLogin: false
      }
    },
    {
      path: "/login",
      component: () => import('@/pages/Login'),
      meta: {
        show: false,
        needLogin: false
      }
    },
    {
      name: 'search',
      path: "/search/:keyword?",
      component: () => import('@/pages/Search'),
      meta: {
        show: false,
        needLogin: false
      }
    },
    {
      path: "*",
      redirect: "/home",
    },
    {
      name: 'detail',
      path: '/detail/:id',
      component: () => import('@/pages/Detail'),
      meta: {
        show: true,
        needLogin: false

      }
    },
    {
      path: '/addcartsuccess',
      component: () => import('@/pages/AddCartSuccess'),
      meta: {
        show: true,
        needLogin: false

      }
    },
    {
      path: '/shopcart',
      component: () => import('@/pages/ShopCart'),
      meta: {
        show: true,
        needLogin: false

      }
    },
    {
      path: '/trade',
      component: () => import('@/pages/Trade'),
      meta: {
        show: true,
        needLogin: true
      },
      beforeEnter: (to, from, next) => {
        // 刷新当前页面等同于从 / 到 /trade
        if (from.path === '/shopcart' || from.path === '/') {
          next()
        }
        else {
          next(false)
        }
      }
    },
    {
      path: '/pay/:orderId',
      component: () => import('@/pages/Pay'),
      meta: {
        show: true,
        needLogin: true
      },
      beforeEnter: (to, from, next) => {
        if (from.path === '/trade' || from.path === '/') {
          next()
        }
        else {
          next(false)
        }
      }
    },
    {
      path: '/paysuccess',
      component: () => import('@/pages/PaySuccess'),
      meta: {
        show: true,
        needLogin: true
      },
    },
    {
      path: '/center',
      component: () => import('@/pages/Center'),
      meta: {
        show: true,
        needLogin: true
      },
      children: [
        {
          path: 'myorder',
          component: () => import('@/pages/Center/MyOrder'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'grouporder',
          component: () => import('@/pages/Center/GroupOrder'),
          meta: {
            needLogin: true
          }
        },
        {
          path: '',
          // redirect: 'grouporder' 这也可以
          redirect: '/center/myorder'
        }
      ]
    }
  ],
  scrollBehavior() {
    return { y: 0 }
  }
});

router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    if (to.path === '/login') {
      next('/')
    }
    else {
      if (name) {
        next()
      }
      else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token过期，需要清除token
          try {
            await store.dispatch('logout')
            next('/login')
            console.error(error.message)
          } catch (error) {
            console.error(error.message)
          }
        }
      }

    }
  }
  else {
    if (!to.meta.needLogin) {
      next()
    }
    else {
      next(`/login?redirect=${to.path}`)
    }

  }
})

export default router