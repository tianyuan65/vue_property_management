<template>
  <div class="content">
    <div class="inputDom">
      <el-input v-model="input" style="width: 240px" placeholder="请输入收款金额" /><br><br>
      <el-button type="success" @click="createQrcode">生成二维码</el-button>
    </div>
    <!-- 二维码 -->
    <div class="qrCode" ref="qrcodeDom"></div>
  </div>
</template>

<script setup>
import { ref , nextTick } from 'vue'
import {QRcode} from 'qrcodejs2'
const input = ref('')

// 创建ref对象，赋值给变量qrcodeDom
let qrcodeDom=ref(null)

const createQrcode=()=>{
  // 每次生成新的二维码前清空之前创建的二维码
  qrcodeDom.value.innerHTML=""
  // 在DOM加载完毕后，生成二维码
  nextTick(()=>{
    new QRcode(qrcodeDom.value,{
      text:input.value,  //生成的二维码内容
      colorDrak:"#000",  // 二维码颜色
      colorLight:"#fff",  // 二维码的背景色
      // correctLevel : QRcode.CorrectLevel.H
    })
  })
}
</script>

<style>
.content{
  text-align: center;
}
.qrCode{
  width:300px;
  height: 300px;
  margin: 0 auto;
}
.inputDom{
  width:400px;
  margin:0 auto;
}
</style>