// 创建一个游客id，以请求头的形式发送给服务器，让本台电脑有一个身份认证，这样才能获取购物车信息等

// uuid在vue脚手架已安装
import { v4 as uuid4 } from 'uuid'

// uuid4是一个方法，每次调用都会生成一个全新的身份字符串
// 为了保证本台电脑的身份认证一直不变，可以将身份认证存储到浏览器本地存储

// 这种唯一性的获取思路在工作中也常用
function getUuid() {
    let myuuid = localStorage.getItem("uuid") // 上来先从本地存储获取
    if (!myuuid) {
        myuuid = localStorage.setItem("uuid", uuid4())  // 如果没有myuuid，则执行，如果有这句代码会跳过
    }
    return myuuid
}

// 将不变的uuid暴露，供api接口文件的使用，在请求拦截中设置请求头
export default getUuid() 