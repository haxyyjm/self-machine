// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import Mint from 'mint-ui';
/**
 * 生成二维码插件
 */
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
Vue.use(Mint);
import 'mint-ui/lib/style.css';
import 'element-ui/lib/theme-chalk/index.css';
import api from '../config/api'
Vue.prototype.api = api;
//导入路由器
import router from "./router";
import headerTop  from "./components/publichead"
import footer from "./components/publicfooter"
import homeBack from "./components/homeBack"
import back from "./components/back"
import Bridge from './config/bridge.js'
Vue.prototype.$bridge = Bridge
Vue.component("footer-view",footer);
Vue.component("head-view",headerTop);
Vue.component("home-back",homeBack);
Vue.component("back-view",back);
import axios from 'axios'
Vue.prototype.$axios = axios;
//Vue.prototype.$ajax = axios
// import 'lib-flexible/flexible.js'
Vue.config.productionTip = false
/* eslint-disable no-new */
//将路由注入到vue实例中
/**
 * @interceptors.request
 * @ 添加公共的请求头文件 做授权使用  这里是将所有的请求信息拦截掉，之后将最新的授权信息加到请求头里面
 */
axios.interceptors.request.use((request)=>{
  console.info(request.url);
  console.info('请求拿到的授权信息是：'+localStorage.getItem('authorization'))
  /**
   * undefined null '' === false
   * @type {{authorization: string}}
   */
  let src = request.url;
  //判断这个接口是不是图片上传的接口，如果是的话，可以直接不用认证，因为认证的话拿不到合理的认证
  if(src.includes('http://47.97.178.98:9500/resource/')){
     return  request;
  }else{
    request.headers.common = {
      'authorization' : localStorage.getItem('authorization') ? localStorage.getItem('authorization') : router.push({path:'/'}),
      'Content-Type': 'application/json'
    };
    return request;
  }
});
/**
 * @interceptors.response
 * @ 统一处理请求返回数据，根据返回的数据判断用户是不是已授权，如果是已授权的话，那就直接可以拿到授权信息，将最新的授权信息给到本地存储里面。
 */
axios.interceptors.response.use((response)=>{
  /**
   * message === success
   * @response.data.new_authorization 如果存在授权信息的话，直接将授权信息拿到
   * @response.data.message === 'authorization invalid' 如果授权失效了，那么直接返回到登陆的页面，重新登陆那最新的授权信息
   * @response ；do not get it from the back end 如果后端有接口没有返回授权信息的时候，直接给控制台打印出来提示语
   * @type {{authorization: string}}
   */
  if(response.data.new_authorization){
    localStorage.setItem('authorization',response.data.new_authorization);
    console.info('返回拿到的授权信息是：'+localStorage.getItem('authorization'));
    return response;
  }else if (response.data.message === 'success'){
    return response;
  }else if(response.data.message === 'authorization invalid'){
    router.push({path:'/'});
  }else{
    console.error('do not get authorization from the back end');
    return response;
  }
});
new Vue({
  router:router,
  components: { App },
  el: '#app',
  render: h => h(App)
});

import { showLoading, hideLoading } from './assets/js/loading';

/* 请求拦截器（请求之前的操作） */
axios.interceptors.request.use((req) => {
  console.info(req)
  if(req.url === 'http://111.231.62.134:81/v1/payment/weixin/check_paid/'){
    hideLoading();
  }else{
    showLoading();
  }
  return req;
}, err => Promise.reject(err));

/* 请求之后的操作 */
axios.interceptors.response.use((res) => {
  hideLoading();
  return res;
  return Promise.reject(res);
}, (err) => {
  hideLoading();
  return Promise.reject(err);
});

/*new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>'
})*/


