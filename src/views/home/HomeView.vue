<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto"><LeftMenu/></el-aside>
      <el-container>
        <el-header><RightTop/></el-header>
        <el-main>
          <!-- home下嵌套路由的出口 -->
          <router-view></router-view>
        </el-main>
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
    background: #545c64;
    height:100%;
  }
  .el-header{
    // background: #ccf;
  }
  .el-main{
    background: #bfa;
  }
  .el-container,.el-aside,.common-layout,#app,body,html{
    height:100%;
  }
</style>