import { getSearch } from '@/api'
// 存储相关数据
const state = {
    Searchdata: {}
}

// 修改state的唯一手段
const mutations = {
    GETSEARCHDATA(state, params) {
        state.Searchdata = params
    }
}

// dispatch调用方法的存储对象，可以处理业务逻辑【if、异步语句等等】
const actions = {
    async getSearchData({ commit }, searchParams) {
        let { data: { code, data } } = await getSearch(searchParams)
        if (code !== 200) return console.log("搜索商品数据获取失败");
        commit("GETSEARCHDATA", data)
    }
}

// 相当于计算属性，可以简化对 state的数据获取
const getters = {
    attrsList(state) {
        return state.Searchdata.attrsList
    },
    goodsList(state) {
        return state.Searchdata.goodsList
    },
    trademarkList(state) {
        return state.Searchdata.trademarkList
    },
}

// 对外暴露该小仓库
export default { namespaced: true, state, mutations, actions, getters }