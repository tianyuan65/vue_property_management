## vue_property_management project

## 一、项目环境搭建
* 1.1 步骤：
    * 1. 保证node版本在18.x以上
    * 2. 创建项目
        * ```vue create vue_property_management```
        * 选择默认的Vue2版本还是默认的Vue3版本中的哪一个，选择Manually select features-自定义，之后选择需要安装的配置项，选择TS、Router、Vuex、CSS Pre-processors；选择Vue3.x版本来搭建；之后就一直回车，选择默认的选项即可。
    * 3. 打开项目，在项目目录下，```npm run serve```，来启动项目
* 1.2 默认样式设置
    * 创建styles文件夹和styles文件夹下的styles.scss和main.scss文件，用于存放全局样式
* 1.4 安装引入，并使用elementplus，若网速过慢时，可以使用国内镜像，我在国外，没必要，又或者可以直接通过浏览器的 HTML 标签导入 Element Plus，在这里就不演示了
    * 1. 安装
        * ```npm install element-plus --save```
    * 2. 引入，完整引入会比较方便，但完整引入的话整个文件会变重，编译速度也会受影响，此时可以按需引入，按需引入就需要事先安装两个插件unplugin-vue-components 和 unplugin-auto-import，```npm install -D unplugin-vue-components unplugin-auto-import```，并向vue.config.js文件中添加plugins配置项。
        * ```
            完整
            // main.ts
            import { createApp } from 'vue'
            import ElementPlus from 'element-plus'
            import 'element-plus/dist/index.css'
            import App from './App.vue'

            createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
            ...
            LoginView.vue
            <el-button type="primary" round>Primary</el-button>
          ```
        * ```
            按需
            vue.config.js
            const AutoImport = require('unplugin-auto-import/webpack')
            const Components = require('unplugin-vue-components/webpack')
            const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
            module.export=defineConfig({
                ...
                plugins: [
                    AutoImport({
                    resolvers: [ElementPlusResolver()],
                    }),
                    Components({
                    resolvers: [ElementPlusResolver()],
                    }),
                ],
            })
            ...
            LoginView.vue
            <el-button type="primary" round>Primary</el-button>
          ```

## 