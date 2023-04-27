// 管理所有注册的路由

import Home from '../pages/home'
import Search from '../pages/search'
import Register from '../pages/register'
import Login from '../pages/login'
import Detail from '@/pages/Detail'
import addCart from '@/pages/AddCartSuccess'
import shopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 二级路由组件
import myOrder from '@/pages/Center/myorder'
import groupOrder from '@/pages/Center/grouporder'

export default [
    {
        path: "/center",
        component: Center,
        children: [
            {
                path: "myOrder", // 没有斜杠。或者/center/myOrder
                component: myOrder
            },
            {
                path: "groupOrder", // 没有斜杠。或者/center/groupOrder
                component: groupOrder
            },
            {
                path: "/center",
                redirect: "myOrder"  // 重定向，跳转center的路由直接跳myOrder
            }
        ]
    },
    {
        name: "Trade",
        path: "/Trade",
        component: Trade,
        // 设置组件独享守卫
        beforeEnter: (to, from, next) => {
            // 订单信息核对路由只能通过购物车路由进入或者订单核算自己刷新
            if (from.path == "/shopcart" || from.path == "/") {
                next()
            }
            // 否则中止跳转行为，停留在原路由
            else next(false)
        }
    },
    {
        name: "Pay",
        path: "/Pay",
        component: Pay,
        // 设置组件独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == "/Trade" || from.path == "/") {
                next()
            }
            // 否则中止跳转行为，停留在原路由
            else next(false)
        }
    },
    {
        name: "PaySuccess",
        path: "/PaySuccess",
        component: PaySuccess,
        // 设置组件独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == "/Pay" || from.path == "/") {
                console.log(from.path);
                next()
            }
            // 否则中止跳转行为，停留在原路由
            else next(false)
        }
    },
    {
        name: "shopCart",
        path: "/shopcart",
        component: shopCart
    },
    {
        name: "addCart",
        path: "/addCart",
        component: addCart
    },
    {
        name: "detail",
        path: "/detail/:skuid", // 必须配置params参数，用以发送请求
        component: Detail
    },
    {
        path: "/home",
        component: Home,
        meta: {
            isShow: true // 用以判断是否渲染footer组件
        }
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/login",
        component: Login
    },
    {
        name: 'searchname',
        path: "/search/:keyword?",  // 指定params参数可传可不传，加 ?号即可。还有   
        // 在不确定传入的params是否为空字符串时，可以将传入参数或上一个 undefined，这样即便传入的是一个空串也不会报错
        // {params:{keyword:变量||undefined}}
        component: Search,
        meta: {
            isShow: true
        },
        //新增配置项:props,给路由组件传递props参数
        //第一种布尔模式,相当于把params参数，作为props属性值传递给这个路由组件
        // props:true,

        //第二种:对象形式
        // props:{a:1,b:'我爱你'}

        //第三种写法:函数写法.一般是把query参数与params参数当中props传递给路由组件!!!
        //route就是当前路由
        // props:(route)=>{
        //      //是将当前箭头函数返回结果，作为props传递给search路由组件!!!
        //      return {a:route.params.keyword,b:'可以传递参数'};
        // }
    },

    // 后期添加的组件间通信的笔记和示例
    {
        path: "/communication",
        component: () => import("@/tongxin/Communication.vue"),
        children: [
            {
                path: "event",
                component: () => import("@/tongxin/EventTest/EventTest.vue")
            },
            {
                path: "sync",
                component: () => import("@/tongxin/SyncTest/SyncTest")
            },
            {
                path: "attrs-listeners",
                component: () => import("@/tongxin/AttrsListenersTest/AttrsListenersTest")
            },
            {
                name: "model",
                path: "model",
                component: () => import("@/tongxin/ModelTest/ModelTest")
            },
            {
                path: "children-parent",
                component: () => import("@/tongxin/ChildrenParentTest/ChildrenParentTest")
            },
            {
                path: "scope-slot",
                component: () => import("@/tongxin/ScopeSlotTest/ScopeSlotTest.vue")
            },
        ]
    },
    //重定向到首页
    {
        path: '/',
        redirect: '/home'
    }
]