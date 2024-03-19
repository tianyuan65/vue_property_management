<template>
  <!-- 调用slice()，展示截取根据当前分页的住户数，当前所在页数减1，乘一页显示条数(从0开始截取)，截取到当前页数乘以每页显示条数 -->
  <el-table :data="$store.state.HomeModule.listData.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="楼盘名称" />
    <el-table-column prop="type" label="房源类型" />
    <el-table-column prop="num" label="门牌号" />
    <el-table-column prop="hometype" label="房源户型" />
    <el-table-column prop="name" label="户主" />
    <!--  -->
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          修改
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          删除
        </el-button>
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
  
  <!-- 修改的弹出框，点击按钮时弹出 -->
  <UpdateDialog/>
</template>

<script setup>
  import { onMounted, ref , reactive } from 'vue'
  import link from '../../../api/link'
  import apiUrl from '../../../api/url.js'
  import UpdateDialog from '../../../components/UpdateDialog.vue'
  import {useStore} from 'vuex'

  // interface User {
  //   date: string
  //   name: string
  //   address: string
  // }

  const store=useStore()

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
  // 修改该住户信息
  const handleEdit = (index, row) => {
    // 调用commit方法，触发handleEdit时，在mutations中调用SETDIALOG函数
    store.commit("SETDIALOG")
    // 调用commit方法，触发handleEdit时，在mutations中调用SETOWNER函数，并传递修改的数据row
    store.commit("SETOWNER",row)
    console.log(index, row)
  }
  // 删除该住户的信息
  const handleDelete = (index, row) => {
    console.log(index, row)
    store.dispatch("deleteData",row)
  }

  onMounted(()=>{
    // 调用dispatch方法，来触发actions中的UpdateOwnersList函数
    store.dispatch("UpdateOwnersList")
    
  })

</script>

<style>

</style>