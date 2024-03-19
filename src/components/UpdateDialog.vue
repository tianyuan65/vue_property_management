// 弹出框组件
<template>

  <el-dialog v-model="$store.state.HomeModule.dialogFormVisible" title="请输入修改内容" width="500">
    <el-form :model="form" >
      <el-form-item label="编号" >
        <!-- 将:label-width属性添加到这里，更新输入框的样式 -->
        <el-input autocomplete="off" :label-width="formLabelWidth" disabled/>
      </el-form-item>
      <el-form-item label="楼盘名称" >
        <!-- 将:label-width属性添加到这里，更新输入框的样式 -->
        <el-input v-model="form.title" autocomplete="off" :label-width="formLabelWidth"/>
      </el-form-item>
      <el-form-item label="房源类型" >
        <!-- 将:label-width属性添加到这里，更新输入框的样式 -->
        <el-input v-model="form.type" autocomplete="off" :label-width="formLabelWidth"/>
      </el-form-item>
      <el-form-item label="门牌号" >
        <!-- 将:label-width属性添加到这里，更新输入框的样式 -->
        <el-input v-model="form.num" autocomplete="off" :label-width="formLabelWidth"/>
      </el-form-item>
      <el-form-item label="房源户型" >
        <!-- 将:label-width属性添加到这里，更新输入框的样式 -->
        <el-input v-model="form.hometype" autocomplete="off" :label-width="formLabelWidth"/>
      </el-form-item>
      <el-form-item label="户主" >
        <!-- 将:label-width属性添加到这里，更新输入框的样式 -->
        <el-input v-model="form.name" autocomplete="off" :label-width="formLabelWidth"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="confirmMsg">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import {useStore} from 'vuex'
import link from '../api/link.js'
import apiUrl from '../api/url.js'

const store=useStore()
// const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    id:'',
    // 楼盘名称信息
    title:'',
    // 房源类型
    type:'',
    // 门牌号
    num:'',
    // 房源户型
    hometype:'',
    // 户主信息
    name: '',
})

// 点击取消，触发关闭弹出框函数
const closeDialog=()=>{
    // 复用，在UpdateOwner组件当中的handleEdit函数中用于展示弹出框，这里用于关闭
    store.commit("SETDIALOG")
}

// 点击确定，触发修改户主的信息，并关闭弹出框
const confirmMsg=()=>{
    // 输出输入框里修改的内容
    console.log('name:',form.name,'title:',form.title);
    // 需要修改的内容
    console.log(store.state.HomeModule.updateListData);
    let data={
        id:form.id,
        title:form.title,
        type:form.type,
        num:form.num,
        hometype:form.hometype,
        name:form.name,
    }
    // 调用link函数，向userlist路径发送PUT请求修改户主和楼盘名称
    link(apiUrl.userlist+'/'+store.state.HomeModule.updateListData.id,"PUT",data).then(value=>{
        console.log(value);
        
    })
    // 点击确定刷新页面的同时，更新页面中的数据
    window.location.reload()
    // 最后关闭输入框
    closeDialog()
}


</script>