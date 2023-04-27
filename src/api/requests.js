// 进行axios的二次封装

// 引入本地存储的uuid身份认证字符串作为请求头发送给服务器
import myuuid from '@/utils/uuid'
// 从仓库的user.js文件引入 token令牌
import User from '@/store/user'

// 引入axios
import axios from 'axios'

import nProgress from 'nprogress';
import 'nprogress/nprogress.css' // 需要一起引入样式才能工作

const instance = axios.create({
    //基础路径,发请求URL携带api【真实服务器接口都携带/api】
    baseURL: "/api",
    timeout: 5000
})

// Add a request interceptor
//请求拦截器:请求头【header】,请求头能否给服务器携带参数
//请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数
instance.interceptors.request.use(function (config) {
    // 进度条开始
    nProgress.start()
    // 游客浏览 userTempId请求头是和后台商量提前设定的
    config.headers.userTempId = myuuid
    // 注册用户登录通过请求头携带 token令牌
    if (User.state.token) {
        // console.log("@token:", User.getters.token());
        config.headers.token = User.state.token
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    nProgress.done() // 进度条结束

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

// 创建mockAjax的实例，用于对mock数据发送请求
const mockAjax = axios.create({
    //基础路径,发请求URL携带api【真实服务器接口都携带/api】
    baseURL: "/mock",
    timeout: 5000
})
//最后需要暴露:暴露的是添加新的功能的axios,即为 instance
export { instance, mockAjax }