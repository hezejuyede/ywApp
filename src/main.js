// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import URl from './assets/js/URL'
import echarts from 'echarts';
import VueSocketIo from 'vue-socket.io';

Vue.use(new VueSocketIo({
  debug: true,
  connection: URl,
}));
Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
