import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
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
      component: Home,
      meta: {
        show: true
      }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        show: true
      }
    },
    {
      path: "/login",
      component: Login,
      meta: {
        show: false
      }
    },
    {
      name: 'search',
      path: "/search/:keyword?",
      component: Search,
      meta: {
        show: false
      }
    },
    {
      path: "*",
      redirect: "/home",
    },
    {
      name: 'detail',
      path: '/detail/:id',
      component: Detail,
      meta: {
        show: true
      }
    },
    {
      path: '/addcartsuccess',
      component: AddCartSuccess,
      meta: {
        show: true
      }
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta: {
        show: true
      }
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
    next()
  }
})

export default router