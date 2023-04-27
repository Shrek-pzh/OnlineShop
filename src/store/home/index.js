// 引入方法接口方法
import { getCate, getfloor } from '@/api/index'


// 存储 home相关数据
const state = {
    catelist: [],
    floors: []
}

// 修改state的唯一手段
const mutations = {
    GETCATELIST(state, params) {
        state.catelist = params.data
    },
    GETFLOOR(state, params) {
        state.floors = params
    }
}

// dispatch调用方法的存储对象，可以处理业务逻辑【if、异步语句等等】
const actions = {
    async getCatelist({ commit }) {
        const { data } = await getCate()
        if (data.code !== 200) return
        commit("GETCATELIST", data)
        // console.log(data);
    },
    async getfloordata({ commit }) {
        const { data: { code, datas } } = await getfloor()
        if (!code == 200) return console.log("楼层区数据获取失败");
        commit("GETFLOOR", datas)
    }
}

// 相当于计算属性，可以简化对 state的数据获取
const getters = {}

// 对外暴露该小仓库
export default { namespaced: true, state, mutations, actions, getters }