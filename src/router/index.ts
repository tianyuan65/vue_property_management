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
   
    component: () => import('../views/home/HomeView.vue')
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
