import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import TypeNav from '@/components/TypeNav'
import * as api from '@/api'
import { MessageBox, Message } from 'element-ui';
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/aoteman.gif'

// or with options
Vue.use(VueLazyload, {
  loading: atm,
})
// Vue.component(Button.name, Button)
// Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message


//第一个参数为组件的名字，第二个参数为组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$api = api
  },
  router,
  store,
  // 在这里发送请求也可以
  // mounted() {
  //   this.$store.dispatch("categoryList");
  // }
}).$mount('#app')
