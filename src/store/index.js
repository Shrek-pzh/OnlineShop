// 数据仓库 vuex模块化开发 统一管理

import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 引入各个模块仓库
import Home from './home'
import Search from './search'
import Detail from './detail'
import ShopCart from './shopcart'
import User from './user'
export default new Vuex.Store({

    modules: {
        Home, Search, Detail, ShopCart, User
    }
})