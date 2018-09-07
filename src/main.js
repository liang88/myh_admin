import Vue from 'vue';
import App from './App';
import router from './router';
import axio from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import {setCookie} from './util/cookie'
import global from  './global'
// import {getCookie} from './util/cookie'
setCookie('clientType ','pc',24*365)
Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false
var axios = axio.create()
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials=true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios
// Vue.http.interceptors.push(function(request,next){
// 	request.credentials = true
// 	next(function(response) {
// 		if (response.headers['code'] === '3') {
// 		    this.$router.push('/login');
// 		    this.$message.error('登陆超时，请重新登陆');
// 		} else if (response.headers['code'] === '4') {
// 		    this.$router.push('/login');
// 		    this.$message.error('您的账号在其他地方登陆');
// 		} else {
// 			console.log(response)
// 		}
// 	})
// })
// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     const role = localStorage.getItem('ms_username');
//     if(!role && to.path !== '/login'){
//         next('/login');
//     }else if(to.meta.permission){
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     }else{
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         }else{
//             next();
//         }
//     }
// })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');