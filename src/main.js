// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/font/font.css'
import Mixin from './mixins'
import './utils/webbodyfront'
import Vconsole from 'vconsole';

import Element from 'element-ui'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import {
  i18n,
  $changeLanguage
} from "./locale/index";
import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'
import {
  $inputLimit,
  toFixed,
  toThousands
} from './utils/tool'
Vue.use(Element)
// Vue.use(vueSwiper)

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// Vue.use(VueAwesomeSwiper)

// import 'swiper/dist/css/swiper.min.css'
Object.assign(Vue.prototype, {
  $changeLanguage,
  $inputLimit,
  toFixed,
  toThousands,
  GLOBAL:global_
})
// if (location.search.indexOf('?pc') !== 0 && /Android|Windows Phone|iPhone|iPod/i.test(navigator.userAgent)){
//   new Vconsole();
// }


import less from 'less'
Vue.use(less)
Vue.config.productionTip = false
Vue.mixin(Mixin)
Vue.use(VueClipboard)

import global_ from './components/global'

// Vue.prototype.GLOBAL = global_

import toast from './plugin/toast/toast'
Vue.use(toast);
/* eslint-disable no-new */
window.newVue =new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')


