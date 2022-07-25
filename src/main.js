import Vue from 'vue'
// 引入vant样式
import 'vant/lib/index.css';
import { Toast } from 'vant';
Vue.prototype.$toast = Toast
// 引入自定义样式
import "./assets/css/index.css";
// 引入覆盖样式
import "./assets/css/override.css";
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible';
Vue.config.productionTip = false
import globalData from './utils/globalData'
Vue.prototype.$globalData = globalData
//循环注册过滤器
import filters from "./filters";
Object.keys(filters).map((item) => {
  Vue.filter(item, filters[item]);
});
import {i18n} from './utils/i18n'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
