<template>
  <div class="login">
    <div class="login-con">
      <ul class="menu-tab">
        <!-- 遍历menuData，声明一个点击事件，并为其绑定事件函数，因需要确定点击的到底是数据中的哪一个传个实参data，当currentData为true时高亮 -->
        <li v-for="data in menuData" :key="data.type" @click="clickMenu(data)" :class="{currentState:data.currentState}">
          {{data.title}}
        </li>
      </ul>

      <!-- 表单部分 -->
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" minlength="6" maxlength="15" />
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" minlength="6" maxlength="15"/>
        </el-form-item>
        <!-- 登录选项时，不展示重复密码 -->
        <el-form-item prop="age" v-show="model==='register'">
          <label>重复密码</label>
          <el-input v-model="ruleForm.repassword" type="password"/>
        </el-form-item>
        <el-form-item>
          <!-- 添加一个属性disabled，为其赋值btnbool的值，并单向数据绑定，btnbool若为true，意为不允许使用该组件 -->
          <el-button 
            :disabled="btnbool"
            type="primary" 
            class="login-btn block" 
            @click="submitForm(ruleFormRef)">
            <!-- 这里不能写死为登录，判断model值是否等于login，相等则展示登录，不相等则展示注册 -->
            {{model==="login" ? '登录' : '注册'}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {onMounted, reactive,ref, watch} from 'vue'
  import type { FormInstance, FormRules  } from 'element-plus'
  import {ElMessage} from 'element-plus'
  // 引入两个工具函数
  import {checkEmail,checkPassword} from '../../utils/verification'
  import link from '../../api/link.js'
  import apiUrl from '../../api/url.js'
  // 引入useMd5 hook
  import useMd5 from '../../hooks/useMd5.js'
  // 引入vue-router
  import {useRouter} from 'vue-router'

  let router=useRouter()  // 调用useRouter声明router函数
  
  // 初始化数据
  const menuData=reactive([
    {title:"登录",currentState:true,type:'login'},
    {title:"注册",currentState:false,type:'register'},
  ])

  // 调用ref声明字符串的响应式数据
  let model=ref("login")

  onMounted(()=>{
    console.log('!!!');
    
    // 读取并输出环境变量的值，正常目前的环境下应该是输出"开发环境"，等用npm run build打包的时候就会输出"上线环境"
    // console.log(process.env.Vue_APP_API);  //undefined
  })

  // 
  const ruleFormRef = ref<FormInstance>()

  // 执行的函数中接收形参data
  const clickMenu=(data:any)=>{
    // 数据循环
    menuData.forEach(element=>{
      // 点击任何一个选项后，将所有的currentState变为false，
      element.currentState=false
    })
    // 然后紧接着将点击的currentState改为true
    data.currentState=true
    // 当点击任何一个选项时，将data中的type的属性值赋给model.value，使model.value的值随着点击发生改变
    model.value=data.type
  }

  // 检查邮箱
  const checkUser=(rule: any, value: any, callback: any)=>{
    if (!value) {
      return callback(new Error('Please input the username'))
    }else if(checkEmail(value)){  // 判断条件为引入的checkEmail函数，checkEmail函数内使用了正则规定了邮箱格式
      return callback(new Error('Username format is incorrect'))
    }else{
      return callback()
    }
  }

  // 验证密码
  const validatePass=(rule: any, value: any, callback: any)=>{
    if (!value) {
      callback(new Error('Please input the password'))
    } else if(checkPassword(value)){  // 判断条件为引入的checkPassword函数，checkPassword函数内使用了正则规定了密码格式
      callback(new Error('Password format is wrong,it must contain 6-15 letters + numbers'))
    }else{
      callback()
    }
  }

  // 再次验证密码
  const validatePass2=(rule: any, value: any, callback: any)=>{
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

  // 初始化密码，验证码，年龄的状态，添加username、password、repassword
  const ruleForm = reactive({
    username:'',
    password:'',
    repassword:'',
    pass: '',
    checkPass: '',
    age: '',
  })

  // 声明ref创建的响应式数据btnbool，默认值设置为true，为true时就不允许点击登录按钮进行登录操作
  let btnbool=ref(true)
  // 监测ruleForm内所有属性
  watch(ruleForm,(newValue)=>{
    // 判断到底是登录还是注册，若为登录
    if (model.value==='login') {
      // 若邮箱和密码输入框不是空，两个输入框都有值，才可以点击登录按钮，成功登录跳到其他路由，
      if(newValue.username!==""&&newValue.password!==''){
        // 则将btnbool的值改为false，使登录按钮能够被点击并进行登录操作；
        btnbool.value=false
      }else{
        // 否则btnbool的值还是true
        btnbool.value=true
      }
    } else {  // 若为注册，
      // 若邮箱和密码、再次输入密码输入框不是空，三个输入框都有值，才可以点击注册按钮，成功跳到登录部分，
      if(newValue.username!==""&&newValue.password!==''&&newValue.repassword!==''){
        // 则将btnbool的值改为false，使注册按钮能够被点击并进行注册操作；
        btnbool.value=false
      }else{
        // 否则btnbool的值还是true
        btnbool.value=true
      }
    }
  })

  // 在此设置以哪种方式触发表单验证，默认就是失去校验则验证
  const rules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    repassword: [{ validator: validatePass2, trigger: 'blur' }],
    username: [{ validator: checkUser, trigger: 'blur' }],
  })

  // 提交
  const submitForm=(formEl: FormInstance | undefined)=>{
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        // 在此判断点击的是登录还是注册时的按钮
        if (model.value==="login") {
          console.log("login")
          // 若是登录，向apiUrl中定义的地址中，发送get请求，想要获取的就是输入到两个输入框里的值，并将需要比对的密码加密
          link(apiUrl.register,"GET",{},{name:ruleForm.username,pwd:useMd5(ruleForm.password).value}).then((value:any)=>{
            // 若从apiUrl定义的地址中获取的数据的data长度不是0，也就是成功获取正确的数据，则登录成功，
            if (value.data.length!=0) {
              console.log('succeed to login');
              ElMessage({
                showClose: true,
                message: 'Succeed to login.',
                type: 'success',
              })
              // 调用router的push方法实现路由跳转
              router.push("/home")
            }else{
              // 反之，因输错密码或邮箱获取的数据长度为0，则登录失败
              console.log('failed to login');
              ElMessage({
                showClose: true,
                message: 'Oops, failed to login.',
                type: 'error',
              })
            }
          })
        }else{
          console.log("register");
          // 需要作为参数传递的数据，是注册时要用的，是传递到服务器的数据
          let data={
            // name属性的值为与el-input双向绑定的ruleForm.username
            name:ruleForm.username,
            // pwd属性的值为与el-input双向绑定的ruleForm.password
            // pwd:ruleForm.password
            // 对密码进行加密，调用useMd5函数
            pwd:useMd5(ruleForm.password).value
          }
          // 这个位置是成功发送请求，完成登录或注册的位置，尝试获取json-server的数据
          // 因为调用link函数返回的是一个promise对象，所以需要调用promise对象的then方法来解析获取数据
          // 注册时调用的该函数参数是apiUrl.register，"POST",data
          link(apiUrl.register,"POST",data).then((value:any)=>{
            // 判断，若成功传递数据了，则将data转换为数组时，长度就不是0
            if (Object.keys(value.data).length !== 0) {
              // 输入邮箱密码注册成功后，就可以跳到登录部分；
              ElMessage({
                showClose: true,
                message: 'Congrats, this is a success message.',
                type: 'success',
              })
              model.value="login"
              // 遍历menuData
              menuData.forEach(menudata=>{
                // 将其中currentState属性的值全部改为false
                menudata.currentState=false
              })
              // 全部改为false后，将menuData数组里第一个元素的，也就是登录的currentState改为true
              menuData[0].currentState=true
            } else {
              // 若注册失败，则给用户一个失败了的提示
              ElMessage({
                showClose: true,
                message: 'Oops, this is a error message.',
                type: 'error',
              })
            }
          })
        }
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

  // 重置表单
  const resetForm=(formEl: FormInstance | undefined)=>{
    if (!formEl) return
    formEl.resetFields()
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
  .demo-ruleForm{
    width:30%;
    margin: 50px auto;
    label{
      display: block;
      margin-bottom:3px;
      font-size: 14px;
      color:#fff;
    }
    .block{
      width: 100%;
      display: block;
    }
    .login-btn{
      margin-top: 20px;
    }
  }
</style>