import Vuerouter from 'vue-router'
import routes from './rules'

// 引入store，因为不仅需要使用其中的属性如token，还需要使用其中的一些方法如dispatch
import store from '@/store/index'

// 方法重写
// push和replace方法在 Vuerouter构造类的原型对象上，$router是这个构造类的实例，所以$router.push $router.replace可以
// 调用方法。push和replace方法会放回一个 promise对象，所有这两个方法在传入跳转地址的同时，如果没有传入成功和失败的回调，
// 多次点击跳转键会报错，虽然不影响项目运行但碍眼。所以重写这两个方法可以根治这个报错

// call和apply 相同点：都可以调用函数一次，都可以修改函数的上下文一次。不同点：call传参用逗号相隔，apply参数为数组
let originPush = Vuerouter.prototype.push
let originReplace = Vuerouter.prototype.replace
Vuerouter.prototype.push = function (localtion, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, localtion, resolve, reject) // 如果直接调用，函数this指向windows，如此可以指向原push方法上下文：$router

    } else {
        originPush.call(this, localtion, () => { /* console.log(1); */ }, () => { /* console.log(2); */ })
        // originPush(localtion, () => { console.log(1); }, () => { console.log(2); })// 不用call，直接调用报错

    }
}
Vuerouter.prototype.replace = function (localtion, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, localtion, resolve, reject) // 如果直接调用，函数this指向windows，如此可以指向原push方法上下文：$router

    } else {
        originReplace.call(this, localtion, () => { }, () => { })
    }
}

// 暴露规则
let Router = new Vuerouter({
    // 基本路由规则
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0, behavior: 'smooth', }
    },
})

/* to\from是一个对象，里面包含的属性
const example = {
    fullPath:"/",
    hash:"",
    matched:[],
    meta:{},
    name:null,
    params:{},
    path:"/",
    query:{}
} */


// 建立全局路由前置守卫
Router.beforeEach(async (to, from, next) => {
    // 首先将情况分为登录与否，判断依据为是否有token令牌
    let token = store.state.User.token
    let name = store.state.User.userInfo.nickName
    // 登录情况
    if (token) {
        // 登录后，跳转上来直接判断用户信息是否丢失
        if (name) {
            if (to.path == "/login") {
                next("/home")
            } else {
                next()
            }
        }
        // 刷新页面会导致用户信息丢失，需要重新获取（vuex数据刷新会丢失）
        // 统一在路由守卫中派发action获取用户信息，解决每个路由刷新用户信息丢失问题
        else {
            try {
                // token正常 没用户信息 先获取再跳转
                await store.dispatch("User/getInfoBytoken");
                next()
            } catch (error) {
                // token失效  await关键字会等待异步函数执行完，再往下执行    
                await store.dispatch("User/Logout") // 退出登录 删除本地的token和用户信息
                // 跳转登录路由
                alert("@@登录失效，请重新登录")
                next("/login")
            }
        }

    }
    // 未登录情况
    else {
        // 我的订单和我的购物车路由先去登录，再跳转
        // 页面直接提高了这两个路由跳转链接 另外pay和paysuccess在路由独享守卫完成判断
        if (to.path.indexOf("/center") != -1 || to.path.indexOf("/shopcart") != -1) {
            // ！！这是一种思路，可以在登录后跳转到用户期望的路由
            let expectPath = to.path
            next(`/login?expectPath=${expectPath}`)
        } else {
            next()
        }

    }

})

export default Router