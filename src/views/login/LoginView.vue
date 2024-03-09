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
          <el-input v-model.number="ruleForm.repassword" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn block" @click="submitForm(ruleFormRef)">
            <!-- 这里不能写死为登录，判断model值是否等于login，相等则展示登录，不相等则展示注册 -->
            {{model==="login" ? '登录' : '注册'}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
  import {reactive,ref} from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  // 引入两个工具函数
  import {checkEmail,checkPassword} from '../../utils/verification'
  import link from '../../api/link.js'
  import apiUrl from '../../api/url.js'
  
  export default {
    name:'LoginView',
    setup(){
      // 初始化数据
      const menuData=reactive([
        {title:"登录",currentState:true,type:'login'},
        {title:"注册",currentState:false,type:'register'},
      ])

      // 调用ref声明字符串的响应式数据
      let model=ref("login")

      // 
      const ruleFormRef = ref<FormInstance>()

      // 初始化密码，验证码，年龄的状态，添加username、password、repassword
      const ruleForm = reactive({
        username:'',
        password:'',
        repassword:'',
        pass: '',
        checkPass: '',
        age: '',
      })
      // 在此设置以哪种方式触发表单验证，默认就是失去校验则验证
      const rules = reactive<FormRules<typeof ruleForm>>({
        password: [{ validator: validatePass, trigger: 'blur' }],
        repassword: [{ validator: validatePass2, trigger: 'blur' }],
        username: [{ validator: checkUser, trigger: 'blur' }],
      })

      // 执行的函数中接收形参data
      function clickMenu(data:any) {
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

      // 提交
      function submitForm (formEl: FormInstance | undefined) {
        if (!formEl) return
        formEl.validate((valid) => {
          if (valid) {
            console.log('submit!')
            // 这个位置是成功发送请求，完成登录或注册的位置，尝试获取json-server的数据
            // 因为调用link函数返回的是一个promise对象，所以需要调用promise对象的then方法来解析获取数据
            link(apiUrl.one).then(value=>{
              console.log(value);
              
            })
          } else {
            console.log('error submit!')
            return false
          }
        })
      }

      // 重置表单
      function resetForm (formEl: FormInstance | undefined) {
        if (!formEl) return
        formEl.resetFields()
      }

      return {menuData,clickMenu,model,rules,submitForm,resetForm,ruleFormRef,ruleForm}
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