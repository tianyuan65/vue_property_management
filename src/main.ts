import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 完整引入
import ElementPlus  from 'element-plus'
import 'element-plus/dist/index.css'
// 引入flexible插件
import 'lib-flexible/flexible.js'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
