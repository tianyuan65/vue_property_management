<template>
  <!-- 调用slice()，展示截取根据当前分页的住户数，当前所在页数减1，乘一页显示条数(从0开始截取)，截取到当前页数乘以每页显示条数 -->
  <el-table :data="tableData.listData.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="楼盘名称" />
    <el-table-column prop="type" label="房源类型" />
    <el-table-column prop="num" label="门牌号" />
    <el-table-column prop="hometype" label="房源户型" />
    <el-table-column prop="name" label="户主" />
    <el-table-column>
      <!-- 通过槽口，将其添加到header中 -->
      <template #header>
        <!-- 引入el-input，调整大小，并通过v-model指令与search响应式数据双向绑定，用v-on指令绑定blur事件，输入框失去焦点时失去焦点时触发searchLink事件函数，搜寻与输入的内容相关的信息 -->
        <el-input size="small" placeholder="请输入查询内容" v-model="search" @blur="searchLink"/>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"

    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.listData.length"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  
</template>

<script setup>
  import { onMounted, ref , reactive } from 'vue'
  import link from '../../../api/link'
  import apiUrl from '../../../api/url.js'

  let search=ref("")

  // 声明默认当前所在页数为第一页
  const currentPage4 = ref(1)
  // 声明默认一页信息显示条数为15条
  const pageSize4 = ref(15)

  // 改变每页信息显示条数
  const handleSizeChange = (val) => {
    pageSize4.value=val
    console.log(`${val} items per page`)
  }
  // 触发改变当前所在页数
  const handleCurrentChange = (val) => {
    currentPage4.value=val
    console.log(`current page: ${val}`)
  }

  // 声明tableData变量
  const tableData=reactive({
    listData:[]
  })

  // 输入框失去焦点，即触发searchLink事件函数
  const searchLink=()=>{
    // 在事件函数内，调用link函数向userlist路径发送get请求获取数据，请求的数据用name来获取，而name的值为search的值
    link(apiUrl.userlist,"GET",{},{name:search.value}).then(value=>{
      console.log(value);
      // 获取到输入框相关的数据后，将展示到页面中的值替换为获取到的值
      tableData.listData=value.data
    })
  }

  onMounted(()=>{
    // 挂载即调用link函数
    link(apiUrl.userlist).then(value=>{
      console.log(value);
      // 将获取的数据value.data赋值给tableData.listData
      tableData.listData=value.data
    })
  })

</script>

<style>

</style>