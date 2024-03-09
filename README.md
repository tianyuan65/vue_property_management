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
* 2.2 引入表单模块
    * 在elementplus官网的Form表单中找到自定义校验规则，将代码复制粘贴到LoginView组件中，对其进行一些简单的修改，将输入框前的文字用label标签包裹，改为邮箱、密码和重复密码。用el-form标签里的demo-ruleForm样式名，统一表单内所有元素的宽度、和在这个页面中的位置。最后，将el-button中原先的Submit改为登录，并给添加一个class属性的样式login-btn和block，使按钮的宽度和上面的输入框的宽度保持一致。
        * ```
            <el-form-item prop="pass">
                <label>邮箱</label>
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn block" @click="submitForm(ruleFormRef)"
                    >登录</el-button>
            </el-form-item>
          ```
* 2.3 登录与注册Tab切换
    * 1. 当点击切换登录和注册tab时，也就是当触发clickMenu事件函数时，需要对页面的排版做出一些小改变，登录时不需要呈现重复密码，登录和注册进行切换时，最下方的按钮上文本也需要根据此发生改变，变成一样的登录或注册。
        * ```
            <!-- 登录选项时，不展示重复密码 -->
            <el-form-item prop="age" v-show="model==='register'">
                <label>重复密码</label>
                <el-input v-model.number="ruleForm.repassword" type="password"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn block" @click="submitForm(ruleFormRef)">
                    <!-- 这里不能写死为登录，判断model值是否等于login，相等则展示登录，不相等则展示注册 -->
                    {{model==="login" ? '登录' : '注册'}}
                </el-button>
            </el-form-item>
            // 调用ref声明字符串的响应式数据
            let model=ref("login")
            function clickMenu(data:any){
                ...
                // 当点击任何一个选项时，将data中的type的属性值赋给model.value，使model.value的值随着点击发生改变
                model.value=data.type
            }
          ```
    * 2. 改变一下将从组件库中在赋值过来的el-form-item的一些属性的属性值。与邮箱的输入框双向绑定的pass改为username，密码的checkPass改为password，重复密码的age改为repassword，这些都是调用reactive声明的对象-ruleForm中初始化的属性，向ruleForm中添加username、password和repassword
        * ```
            <el-form-item prop="pass">
                <label>邮箱</label>
                <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="password">
                <label>密码</label>
                <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
            </el-form-item>
            <!-- 登录选项时，不展示重复密码 -->
            <el-form-item prop="age" v-show="model==='register'">
                <label>重复密码</label>
                <el-input v-model.number="ruleForm.repassword" type="password"/>
            </el-form-item>
            // 初始化密码，验证码，年龄的状态，添加username、password、repassword
            const ruleForm = reactive({
                username:'',
                password:'',
                repassword:'',
                pass: '',
                checkPass: '',
                age: '',
            })
          ```
* 2.4 elementplus表单验证
    * 使用正则校验邮箱、密码和重复密码，在再次校验密码的函数validatePass2中，设置登录时不进行重复密码的校验。并在调用reactive声明的rules中修改原先的属性名改为password、repassword和username。
        * ```
            // 在此设置以哪种方式触发表单验证，默认就是失去校验则验证
            const rules = reactive<FormRules<typeof ruleForm>>({
                password: [{ validator: validatePass, trigger: 'blur' }],
                repassword: [{ validator: validatePass2, trigger: 'blur' }],
                username: [{ validator: checkUser, trigger: 'blur' }],
            })
            // 检查邮箱
            function checkUser(rule: any, value: any, callback: any){
                // 创建邮箱正则来进行邮箱格式校验
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; 
                if (!value) {
                    return callback(new Error('Please input the username'))
                }else if(!reg.test(value)){  //根据邮箱正则判断，若不符和判断条件，则提示错误
                    return callback(new Error('Username format is incorrect'))
                }else{
                    return callback()
                }
            }
            // 验证密码
            function validatePass (rule: any, value: any, callback: any) {
                let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/;// 验证密码 6至15位的字母+数字 
                if (!value) {
                    callback(new Error('Please input the password'))
                } else if(!reg.test(value)){  //根据密码正则判断，若不符和判断条件，则提示错误
                    callback(new Error('Password format is wrong,it must contain 6-15 letters + numbers'))
                }else{
                    callback()
                }
            }
            // 再次验证密码
            function validatePass2 (rule: any, value: any, callback: any) {
                // 登录时没有重复密码的校验，所以在登录时取消重复密码的校验
                if (model.value==='login') {  // 若是在登录的选项tab，则无需校验，直接跳出
                    callback()
                }
                if (value === '') {
                    callback(new Error('Please input the password again'))
                } else if (value !== ruleForm.password) {
                    callback(new Error("Two inputs don't match!"))
                } else {
                    callback()
                }
            }
          ```
* 2.5 封装工具库
    * 创建utils文件夹，在其下创建verification.js文件，用于存放校验邮箱和密码时会执行的回调checkEmail和checkPassword，这两个函数接收形参，用于接收输入的数据，且都根据传递的数据的正确与否返回true或false，在组件当中，引入这两个函数，并作为判断条件调用。
        * ```
            verification.js
            export function checkEmail(data) {  //接收形参，用于接收输入的数据
                // 创建邮箱正则来进行邮箱格式校验
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                // 判断若传递的数据为真，则返回true，否则返回false
                return !reg.test(data) ? true :false
            }

            export function checkPassword(data) {  //接收形参，用于接收输入的数据
                let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/;// 验证密码 6至15位的字母+数字
                // 判断若传递的数据为真，则返回true，否则返回false
                return !reg.test(data) ? true : false
            }
            ...
            LoginView.vue
            // 引入两个工具函数
            import {checkEmail,checkPassword} from '../../utils/verification'
            ...
            // 检查邮箱
            function checkUser(rule: any, value: any, callback: any){
                if (!value) {
                    return callback(new Error('Please input the username'))
                }else if(checkEmail(value)){  // 判断条件为引入的checkEmail函数，checkEmail函数内使用了正则规定了邮箱格式
                    return callback(new Error('Username format is incorrect'))
                }else{
                    return callback()
                }
            }

            // 验证密码
            function validatePass (rule: any, value: any, callback: any) {
                if (!value) {
                    callback(new Error('Please input the password'))
                } else if(checkPassword(value)){  // 判断条件为引入的checkPassword函数，checkPassword函数内使用了正则规定了密码格式
                    callback(new Error('Password format is wrong,it must contain 6-15 letters + numbers'))
                }else{
                    callback()
                }
            }
          ```

## 三、封装
* 3.1 axios封装和拦截器--前台和后台之间的数据交互
    * Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。需要调用axios的create方法来创建axios实例service，其次，调用service的拦截器的request和response的use方法来在请求或响应被 then 或 catch 处理前拦截它们。具体发送请求的函数，需要在创建的api文件夹下的link.js文件中进行，在link.js中引入service实例，并声明一个link函数，在函数中接收url、method、data、params为形参，发送请求时要用，函数内返回一个Promise实例对象，实例对象的异步函数中调用拦截器的request方法来发送请求，请求中发送url、method、data、params，其结果是一个promise对象，需要用then方法来解析，发送成功则调用resolve方法，来接收后台来的数据；发送失败则调用reject方法，来接收错误的信息。
        * ```
            service.js
            import axios from 'axios'
            // 创建axios实例
            const service=axios.create()

            // 请求拦截
            service.interceptors.request.use(function (config) {
                // Do something before request is sent
                return config;
            }, function (error) {
                // Do something with request error
                return Promise.reject(error);
            });

            // 响应拦截
            service.interceptors.response.use(function (response) {
                // Do something with response data
                return response;
            }, function (error) {
                // Do something with response error
                return Promise.reject(error);
            });
            export default service
            ...
            link.js
            import service from '../utils/service'  // 引入拦截器
            // 封装相关的数据请求

            // 声明link函数，接收url、method、data、params为形参，发送请求时要用
            let link=(url,method,data,params)=>{
                // 函数中返回一个Promise实例对象
                return new Promise((resolve,reject)=>{
                    // 调用拦截器的request方法来发送请求
                    service.request({
                        // url:url,  //可简写，下面的几个也一样
                        url,
                        method,
                        data,
                        params
                    }).then(value=>{
                        // 成功则调用resolve方法，来接收后台来的数据；
                        resolve(value)
                    }).catch(error=>{
                        // 失败则调用reject方法，来接收错误的信息
                        reject(error)
                    })
                })
            }
            export default link  // 最后暴露link函数，便于在组件中直接引入调用，并从后台获取数据
          ```
* 3.2 json-server
    * 