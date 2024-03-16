import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {
  TrendCharts,
  Grid,
  List
} from '@element-plus/icons-vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',  
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/LoginView.vue')
  },
  // 配置home路由
  {
    path: '/home',  
    name: 'home',
   
    component: () => import('../views/home/HomeView.vue'),
    // 配置home路由下子路由们
    children:[
      {
        path:'echarts',
        name:'echarts',
        component:()=>import('../views/home/children/EchartsView.vue'),
        // 路由元信息配置项
        meta:{
          title:'数据展示',
          // 在路由元信息配置项中，配置icon属性，其值为与当前路由对应的图标组件，但因为需要实现动态组件的效果，在这里写成组件方式
          icon:TrendCharts
        }
      },
      {
        path:'pay',
        name:'pay',
        component:()=>import('../views/home/children/PayList.vue'),
        meta:{
          title:'缴费管理',
          // 在路由元信息配置项中，配置icon属性，其值为与当前路由对应的图标组件，但因为需要实现动态组件的效果，在这里写成组件方式
          icon:Grid
        }
      },
      {
        path:'owner',
        name:'owner',
        component:()=>import('../views/home/children/OwnersInfo.vue'),
        meta:{
          title:'住户信息',
          // 在路由元信息配置项中，配置icon属性，其值为与当前路由对应的图标组件，但因为需要实现动态组件的效果，在这里写成组件方式
          icon:List
        },
        children:[
          {
            path:'ownerlist',
            name:'ownerlist',
            component:()=>import('../views/home/children/OwnerList.vue'),
            meta:{classifyTitle:'住户信息',title:'住户列表'}
          },
          {
            path:'updateowner',
            name:'updateowner',
            component:()=>import('../views/home/children/UpdateOwners.vue'),
            meta:{classifyTitle:'住户信息',title:'修改住户信息'}
          }
        ]
      },
    ]
  },
  // 路由重定向，默认跳转至login
  {
    path:"/",
    redirect:"/login"
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),  // history模式
  // hash模式
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
