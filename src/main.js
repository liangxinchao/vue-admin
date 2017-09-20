import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/App'
import VueRouter from 'vue-router'
import routes from '@/js/router.js'
import store from '@/js/store.js'
import Element from "element-ui"
import VueMoment from 'vue-moment'
import Swiper from 'vue-awesome-swiper'
import '../theme/index.css'
import 'font-awesome/css/font-awesome.css'
import $ from 'jquery'
// import 'wangeditor/dist/js/wangEditor.min.js'
import './../static/wangEditor/css/wangEditor.min.css'
import './../static/wangEditor/js/lib/jquery-1.10.2.min.js'
import './../static/wangEditor/js/wangEditor.js'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Element)
Vue.use(VueMoment)
Vue.use(Swiper)

const router = new VueRouter({
	mode: 'history',
  base: __dirname,
  routes
});

router.beforeEach((to, from, next) => {
	let user = JSON.parse(localStorage.getItem('dreamuser'));
  if (!user && to.path !== '/login') {
    next({
     path: '/login' 
    })
  }else{
   if(user && to.path === '/login') {
     next({
       path: '/nav1'
     });
   }else{
     next()
   }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')