// 统一管理所有的接口

// 引入axios实例，从而调用方法发送请求
import { instance, mockAjax } from './requests'

//箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
//下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
//return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
export const getCate = () => {
    return instance({
        type: "get",
        url: "/product/getBaseCategoryList", // 因为 request.js配置了 baseUrl:"/api",所以会自动在域名和端口后面加/api
    })
}

// 获取mockjs模拟的轮播图数据
export const getbanner = () => {
    return mockAjax({
        method: "get",
        url: "/banner"
    })
}

// 获取mockjs模拟的楼层结构数据
export const getfloor = () => {
    return mockAjax({
        method: "get",
        url: "/floor"
    })
}

// 搜索功能，获取搜索商品数据
export const getSearch = (params = {}) => { // post请求，如果没有传参该接口必须默认发送一个空对象
    return instance({
        method: "post",
        url: "/list",
        data: params
    })
}

// 获取商品详情
export const sendFordetail = (skuid) => {
    return instance({
        url: `/item/${skuid}`,
        method: "get"
    })
}

// 将商品添加到购物车，将添加的数据上传到服务器
export const addShopcart = (skuId, skuNum) => {
    return instance({
        method: "post",
        url: `/cart/addToCart/${skuId}/${skuNum}`
    })
}

// 获取购物车数据
export const getCartData = () => {
    return instance({
        method: "get",
        url: "/cart/cartList" // 不用携带任何参数
    })
}

// 删除单个商品的接口
export const deleCategory = (skuid) => {
    return instance({
        method: "delete",
        url: `/cart/deleteCart/${skuid}`
    })
}

// 上传商品的勾选状态
export const uploadIsCheck = (skuid, ischecked) => {
    return instance({
        method: "get",
        url: `/cart/checkCart/${skuid}/${ischecked}`
    })
}

// 获取注册验证码接口
export const getCode = (phone) => {
    return instance({
        method: "get",
        url: `/user/passport/sendCode/${phone}`
    })
}
// 注册接口 data:{phone,password,code}
export const register = (data) => {
    return instance({
        method: "post",
        url: "/user/passport/register",
        data
    })
}
// 登录接口 data:{phone,password}
export const login = (data) => {
    return instance({
        method: "post",
        url: "/user/passport/login",
        data
    })
}
//获取用户登录成功以后用户信息的接口 前提：token
export const reqUserInfo = () => {
    return instance({
        url: `/user/passport/auth/getUserInfo`,
        method: 'get'
    });
}

// 退出登录接口
export const logout = () => {
    return instance({
        method: "get",
        url: "/user/passport/logout"
    })
}

// 获取用户邮寄地址信息接口 
export const getUserAddress = () => {
    return instance({
        method: "get",
        url: "/user/userAddress/auth/findUserAddressList"
    })
}
// 获取订单交易页信息接口
export const getOrderInfo = () => {
    return instance({
        method: "get",
        url: "/order/auth/trade"
    })
}
// 提交订单接口  tradeNo：交易编号  返回结果：orderId
export const SubmitOrder = (tradeNo, data) => {
    return instance({
        method: "post",
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data
    })
}
// 获取订单支付信息接口 orderId：服务器返回的订单号(通过提交订单得到)
export const Pay = (orderId) => {
    return instance({
        method: "get",
        url: `/payment/weixin/createNative/${orderId}`
    })
}
// 获取订单支付信息接口 orderId：服务器返回的订单号(通过提交订单得到)
export const chenckPayStatus = (orderId) => {
    return instance({
        method: "get",
        url: `/payment/weixin/queryPayStatus/${orderId}`
    })
}

// 请求我的订单数据
export const reqMyOrder = (page, limit) => {
    return instance({
        method: "get",
        url: `/order/auth/${page}/${limit}`
    })
}