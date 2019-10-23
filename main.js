import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false
const baseUrl = "https://www.wf1125.cn";
Vue.prototype.global_baseUrl = baseUrl

Vue.prototype.$store = store
import home from './pages/home/home.vue'
Vue.component('home', home)

import myBusiness from './pages/myBusiness/myBusiness.vue'
Vue.component('myBusiness', myBusiness)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
