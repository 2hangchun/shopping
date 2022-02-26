import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import TypeNav from '@/components/TypeNav'
import store from '@/store'
import '@/mock/mockServer'



//第一个参数为组件的名字，第二个参数为组件
Vue.component(TypeNav.name, TypeNav)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  // 在这里发送请求也可以
  // mounted() {
  //   this.$store.dispatch("categoryList");
  // }
}).$mount('#app')
