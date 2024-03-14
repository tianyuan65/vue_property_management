<template>
  <div class="common-layout">
    <el-container>
      <el-aside><LeftMenu/></el-aside>
      <el-container>
        <el-header><RightTop/></el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import LeftMenu from '../../components/LeftMenu.vue'
  import RightTop from '../../components/RightTop.vue'
</script>

<style lang="scss">
  .el-aside{
    background: aqua;
    height:100%;
  }
  .el-header{
    background: #ccf;
  }
  .el-main{
    background: #bfa;
  }
  .el-container,.el-aside,.common-layout,#app,body,html{
    height:100%;
  }
</style>