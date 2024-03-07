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
        <el-form-item prop="pass">
          <label>邮箱</label>
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="checkPass">
          <label>密码</label>
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="age">
          <label>重复密码</label>
          <el-input v-model.number="ruleForm.age" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn block" @click="submitForm(ruleFormRef)"
            >登录</el-button>
          
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
  import {reactive,ref} from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  export default {
    name:'LoginView',
    setup(){
      // 初始化数据
      const menuData=reactive([
        {title:"登录",currentState:true,type:'login'},
        {title:"注册",currentState:false,type:'register'},
      ])

      // 
      const ruleFormRef = ref<FormInstance>()

      // 初始化密码，验证码，年龄的状态
      const ruleForm = reactive({
        pass: '',
        checkPass: '',
        age: '',
      })
      const rules = reactive<FormRules<typeof ruleForm>>({
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }],
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
      }

      // 检查年龄
      function checkAge(rule: any, value: any, callback: any){
        if (!value) {
          return callback(new Error('Please input the age'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
          } else {
            if (value < 18) {
              callback(new Error('Age must be greater than 18'))
            } else {
              callback()
            }
          }
        }, 1000)
      }

      // 验证密码
      function validatePass (rule: any, value: any, callback: any) {
        if (value === '') {
          callback(new Error('Please input the password'))
        } else {
          if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
          }
          callback()
        }
      }

      // 再次验证密码
      function validatePass2 (rule: any, value: any, callback: any) {
        if (value === '') {
          callback(new Error('Please input the password again'))
        } else if (value !== ruleForm.pass) {
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


      return {menuData,clickMenu,rules,submitForm,resetForm,ruleFormRef
,ruleForm}
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