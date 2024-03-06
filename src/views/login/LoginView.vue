<template>
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
</template>

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