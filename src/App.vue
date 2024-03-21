<template>
  <!-- 路由出口 -->
  <router-view/>
  
</template>

<script setup>
// 全局引入
import * as echarts from 'echarts'
// 引入provide方法，用于祖孙组件间通信
import {provide} from 'vue'
// 调用provide函数，给自己的后代组件传递数据，第一个参数是需要传递的数据，提供的数据名；第二个参数是真正的数据
provide("echarts",echarts)
</script>

<style lang="scss">

</style>
