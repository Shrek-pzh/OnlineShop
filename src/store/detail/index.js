import { sendFordetail } from '@/api'

// 存储相关数据
const state = {
    detail: {}
}

// 修改state的唯一手段
const mutations = {
    GETDETAIL(state, params) {
        state.detail = params
    }
}

// dispatch调用方法的存储对象，可以处理业务逻辑【if、异步语句等等】
const actions = {
    async getDetail({ commit }, skuid) {
        let { data: { code, data } } = await sendFordetail(skuid)
        if (code != 200) return console.log("商品详情获取失败");
        commit("GETDETAIL", data)
    },
}

// 相当于计算属性，可以简化对 state的数据获取
const getters = {
    categoryView(state) {
        return state.detail.categoryView || {} // 返回结果都或上对应的结构，防止数据没有返回时因为 undefined出现报错
    },
    skuInfo(state) {
        return state.detail.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detail.spuSaleAttrList || []
    },
}

// 对外暴露该小仓库
export default { namespaced: true, state, mutations, actions, getters }