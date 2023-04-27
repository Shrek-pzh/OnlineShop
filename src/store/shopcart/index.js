import { getCartData, deleCategory, uploadIsCheck } from "@/api";
// import { reject } from "core-js/fn/promise";

// 存储相关数据
const state = {
    cartInfoArr: []
}

// 修改state的唯一手段
const mutations = {
    PULLCARTDATA(state, params) {
        state.cartInfoArr = params
    }
}

// dispatch调用方法的存储对象，可以处理业务逻辑【if、异步语句等等】
const actions = {
    // 拉取购物车数据
    async pullCartData({ commit }) {
        let { data: { code, data } } = await getCartData();
        if (code != 200) return console.log("购物车数据获取失败");
        commit("PULLCARTDATA", data)
    },
    // 改变勾选状态
    async changeChecked({ dispatch }, { skuid, ischecked }) {
        let { data: { code } } = await uploadIsCheck(skuid, ischecked);
        if (code == 200) dispatch("pullCartData")
    },
    // 删除某个商品
    async delOne(_, skuid) {
        let { data: { code } } = await deleCategory(skuid)
        // async函数一定是返回 promise对象，可以在组件用await接收。组件中需要利用code进行判断
        if (code == 200) return code
        // alert("删除商品失败，请稍后重试"); // 失败给用户提示
        return new Promise((_, reject => { reject(201) }))
    },
    // 神奇！！Promise.reject(201)才可以  神奇！！！ new Promise((_, reject => { reject(201) }))不行，会变为成功的promise(201)
    async delOneforChecked(_, skuid) {
        let { data: { code } } = await deleCategory(skuid)
        // async函数一定是返回 promise对象，可以在组件用await接收。组件中需要利用code进行判断
        if (code == 200) return code
        // alert("删除商品失败，请稍后重试"); // 失败给用户提示
        return Promise.reject(201)
    },
    // 删除勾选的商品
    async delChecked({ dispatch, getters: { cartInfoArrZero } }) {
        let PromiseArr = []
        cartInfoArrZero.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
                let res = dispatch("delOneforChecked", item.skuId)
                PromiseArr.push(res)
            }
        })
        // console.log("#", PromiseArr);
        // all方法，传入一个全是promise对象的数组，用以判断！方法返回值是一个失败或是成功的promise对象，只有数组中全为成功才成功
        return Promise.all(PromiseArr)
    }
}

// 相当于计算属性，可以简化对 state的数据获取
const getters = {
    cartInfoArrZero(state) {
        // 如果 cartInfoArr数据未从服务器回来：
        // cartInfoArr=[] cartInfoArr[0]为undefined，state.cartInfoArr[0].cartInfoList连undefined都不是，
        // 计算属性获取 cartInfoList时直接报错，即便后续更新组件模板也完全不能渲染

        // cartInfoArr=[[]] 解决问题（也不能根本解决呀，商品全部删除就出现问题了）
        // console.log(state.cartInfoArr[0]); state.cartInfoArr[0].cartInfoList为undefined再或上 [],组件那边才能不报错

        // 只能再来个中转才可以 这个后台数据结构设计很拉跨
        return (state.cartInfoArr[0] || {})
    }
}

// 对外暴露该小仓库
export default { namespaced: true, state, mutations, actions, getters }