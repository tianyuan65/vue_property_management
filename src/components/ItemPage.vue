<template>
  <div class="item">
    <!-- 具名插槽 -->
    <slot name="main"></slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
  .item{
      height:5.125rem;
      border: 1px solid rgb(166, 164, 164);
      margin: .25rem;
      background: rgba(115, 84, 84, 0.899);
  }
</style>