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

## 二、登录模块
* 2.1 登录注册tab切换
    * 初始化数据，调用reactive函数来声明响应式数据，并赋值变量menuData，声明的数据是一个数组，包含关于注册和登录的两种不同状态的属性，在模板中用v-for遍历该数组并展示，在遍历数组的li标签里，声明一个点击事件，并为其绑定事件函数clickMenu，因为需要确定点击的到底是menuData中的哪一个对象，所以传个实参data，在执行clickMenu函数时，记得接收形参data(此时会报错，报参数data没有明确指定类型，写成data:any即可)。在clickMenu函数中遍历menuData，遍历的回调中，点击任何一个选项后，将所有的currentState变为false，然后紧接着将点击的currentState改为true。最后当点击登录或注册时，应有高亮，因此当currentState等于data.currentState时，周围样式发生改变
        * ```
            <div class="login">
                <div class="login-con">
                <ul class="menu-tab">
                    <!-- 遍历menuData，声明一个点击事件，并为其绑定事件函数，因需要确定点击的到底是数据中的哪一个传个实参data，当currentData为true时高亮 -->
                    <li v-for="data in menuData" :key="data.type" @click="clickMenu(data)" :class="{currentState:data.currentState}">
                    {{data.title}}
                    </li>
                </ul>
                </div>
            </div>

            <script lang="ts">
                import {reactive} from 'vue'
                export default {
                    name:'LoginView',
                    setup(){
                    // 初始化数据
                    const menuData=reactive([
                        {title:"登录",currentState:true,type:'login'},
                        {title:"注册",currentState:false,type:'register'},
                    ])

                    // 执行的函数中接收形参data
                    function clickMenu(data:any) {
                        // 数据循环
                        menuData.forEach(element=>{
                        // 点击任何一个选项后，将所有的currentState变为false，
                        element.currentState=false
                        })
                        // 然后紧接着将点击的currentState改为true
                        data.currentState=true
                    }

                    return {menuData,clickMenu}
                    }
                }
            </script>
            <style lang="scss">
                .login{
                    background: lightpink;
                    height:100%;
                }
                html,body,#app{
                    height:100%;
                }
                .menu-tab{
                    text-align: center;
                    li{
                    display: inline-block;
                    width:88px;
                    line-height: 36px;
                    font-size: 14px;
                    color: #fff;
                    border-radius: 2px;
                    cursor: pointer;
                    }
                    .currentState{
                    background: rgba(255,255,255,0.5);
                    }
                }
            </style>
          ```