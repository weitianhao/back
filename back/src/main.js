// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../node_modules/element-ui/lib/index'
import elementUi from 'element-ui'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuex from 'vuex'
import Store from './store'
import '../static/Ueditor/ueditor.config.js'
import '../static/Ueditor/ueditor.all.min.js'
import '../static/Ueditor/lang/zh-cn/zh-cn.js'
import '../static/Ueditor/ueditor.parse.min.js'
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(elementUi)
Vue.use(VueAxios, axios)
/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: Store
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
