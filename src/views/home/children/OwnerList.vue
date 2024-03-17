<template>
  <!-- 调用slice()，展示截取根据当前分页的住户数，当前所在页数减1，乘一页显示条数(从0开始截取)，截取到当前页数乘以每页显示条数 -->
  <el-table :data="tableData.listData.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="楼盘名称" />
    <el-table-column prop="type" label="房源类型" />
    <el-table-column prop="num" label="门牌号" />
    <el-table-column prop="hometype" label="房源户型" />
    <el-table-column prop="name" label="户主" />

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

  // 声明默认当前所在页数为第一页
  const currentPage4 = ref(1)
  // 声明默认一页信息显示条数为15条
  const pageSize4 = ref(15)
  const small = ref(false)
  const background = ref(false)
  const disabled = ref(false)

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

  onMounted(()=>{
    // 挂载即调用link函数项userlist路径发送get请求获取数据
    link(apiUrl.userlist).then(value=>{
      console.log(value);
      // 将获取的数据value.data赋值给tableData.listData
      tableData.listData=value.data
    })
  })

  // const tableData = [
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles',
  //   },
  // ]

  
</script>

<style>

</style>