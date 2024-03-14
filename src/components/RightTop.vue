<template>
  <div>
    <el-icon @click="showMenu">
        <!-- 默认展示呈现菜单 -->
        <CaretRight v-if="showWhich"/>
        <CaretLeft v-else/>
    </el-icon>
  </div>
</template>

<script setup>
    import {CaretRight,CaretLeft} from '@element-plus/icons-vue'
    import {ref} from 'vue'

    // 声明isShow，用于展示向右还是向左的图标
    let showWhich=ref(true)

    const showMenu=()=>{
        // showMenu函数被触发时，值取反
        showWhich.value=!showWhich.value
        console.log('click to show menu on left');
    }
</script>

<style lang="scss">
    .el-header{
        line-height: 70px;
        .el-icon{
            font-size: 20px;
        }
    }
</style>