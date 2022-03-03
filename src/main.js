import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
import Carousel from '@/components/Carousel'


//第一个参数为组件的名字，第二个参数为组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
  // 在这里发送请求也可以
  // mounted() {
  //   this.$store.dispatch("categoryList");
  // }
}).$mount('#app')
