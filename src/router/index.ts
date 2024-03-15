import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


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
    // 配置home路由下的子路由们
    children:[
      {
        path:'echarts',
        name:'echarts',
        component:()=>import('../views/home/children/EchartsView.vue')
      },
      {
        path:'pay',
        name:'pay',
        component:()=>import('../views/home/children/PayList.vue')
      },
      {
        path:'owner',
        name:'owner',
        component:()=>import('../views/home/children/OwnersInfo.vue'),
        children:[
          {
            path:'ownerlist',
            name:'ownerlist',
            component:()=>import('../views/home/children/OwnerList.vue')
          },
          {
            path:'updateowner',
            name:'updateowner',
            component:()=>import('../views/home/children/UpdateOwners.vue')
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
