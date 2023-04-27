// 引入css样式
import 'swiper/css/swiper.min.css'

import Vue from 'vue'
import App from './App.vue'
import Vuerouter from 'vue-router'
import router from './router'

// 引入element-ui
import { MessageBox, Button, Input } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)

// 引入所以的数据请求接口，注册到Vue的原型对象上，让所有子组件可以直接使用
import * as API from '@/api'

// 引入vuex统一仓库，注册
import store from '@/store'

// 引入全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

// 安装路由插件
Vue.config.productionTip = false
Vue.use(Vuerouter)

// 引入mock模拟数据文件
import '@/mock/server'

// 引入表单规则检查文件
import '@/plugins/validate'

new Vue({
    render: h => h(App),
    router,   // 注册路由规则
    store,     // 组成vuex模块
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API // 注册所有数据接口

        // 引入elementui信息提示组件
        Vue.prototype.$MessageBox = MessageBox
        Vue.prototype.$alert = MessageBox.alert
    }
}).$mount('#app')


/* 
关闭组件命名规则 package.json添加检查规则
"vue/multi-word-component-names":"off",
*/