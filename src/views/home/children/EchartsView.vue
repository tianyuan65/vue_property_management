<template>
  <!-- 容纳分为左右两部分，每个部分两个图表的容器 -->
  <div class="container">
    <!-- 左部分 -->
    <div class="itemleft">
      <!-- 左上 -->
      <ItemPage>
        <!-- 向槽口中插入组件 -->
        <template #main>
          <LeftTopChart/>
        </template>
      </ItemPage>
      <!-- 左下 -->
      <ItemPage>
        <template #main>
          <LeftBottomChart/>
        </template>
      </ItemPage>
    </div>
    <!-- 右部分 -->
    <div class="itemright">
      <!-- 右上 -->
      <ItemPage>
        <template #main>
          <RightTopChart/>
        </template>
      </ItemPage>
      <!-- 右下 -->
      <ItemPage>
        <template #main>
          <RightBottomChart/>
        </template>
      </ItemPage>
    </div>

  </div>
</template>

<script setup>
import ItemPage from "@/components/ItemPage.vue";
import LeftTopChart from "@/components/LeftTopChart.vue";
import LeftBottomChart from "@/components/LeftBottomChart.vue";
import RightTopChart from "@/components/RightTopChart.vue";
import RightBottomChart from "@/components/RightBottomChart.vue";
</script>

<style lang="scss">
  .container{
    // 撑开
    width:100%;
    // 居中
    margin:0 auto;
    background: gold;
    // 设置flex布局
    display: flex;
    .itemleft,.itemright{
      // 让itemleft和itemright个分一半空间
      flex: 1;
    }
  }
</style>