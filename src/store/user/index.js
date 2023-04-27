import { getCode, register, login, logout, reqUserInfo } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

// 存储相关数据
const state = {
    userInfo: {},
    token: getToken()
}

// 修改state的唯一手段
const mutations = {
    LOGIN(state, params) {
        // 正常情况登录只能拿到token，没有用户信息。需要拿着token再发请求获取用户信息
        // 将token令牌存储到本地内存,同时上来直接往state存一份，否则会影响刚刚登录跳转首页的用户信息渲染效果
        setToken(params.token)
        state.token = params.token
    },
    GETUSERINFO(state, params) {
        // 解构出头像地址和昵称作为用户信息
        const { nickName, headImg } = params
        state.userInfo = { nickName, headImg }
    },
    LOGOUT(state) {
        // 两个操作：清除本地token、清除state获取的用户信息和token
        removeToken()
        state.userInfo = {}
        state.token = ''
    }
}

// dispatch调用方法的存储对象，可以处理业务逻辑【if、异步语句等等】
const actions = {
    async GetCode(_, phone) {
        let { data: { code, data } } = await getCode(phone)
        if (code == 200) return data
        alert('验证码获取失败')
    },
    async Register(_, datas) {
        console.log(datas);
        let { data } = await register(datas)
        return data
    },
    //用户登录的地方:非常非常重要
    async Login({ commit }, datas) {
        //接口说明:后台老师目前登录接口返回数据不正确的，以后工作的时候登录接口成功，返回格式100%和相面例子一样的!!!
        /*
          举例子
           {
            code:200,
            data:{
                token:'1e4vdadhajkhdakj6sahdajk'
            },
            message:'登录成功'
           }
        */
        let { data: { code, data, message } } = await login(datas)
        if (code == 200) {
            commit("LOGIN", data)
            return code
        } else alert(message)
        return 201
    },
    // 发送请求获取用户信息。前提：token
    async getInfoBytoken({ commit }) {
        // let { data } = await reqUserInfo()
        // console.log(data);
        let { data: { code, data } } = await reqUserInfo()
        if (code == 200) {
            commit("GETUSERINFO", data)
            return data.nickName
        } else {
            return Promise.reject("fail")
        }
    },
    async Logout({ commit }) {
        let { data: { code } } = await logout()
        if (code == 200) {
            commit("LOGOUT")
        }
        return "ok"
    }
}

// 相当于计算属性，可以简化对 state的数据获取
const getters = {

}

// 对外暴露该小仓库
export default { namespaced: true, state, mutations, actions, getters }