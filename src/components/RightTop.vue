<template>
  <div>
    <el-icon @click="showMenu">
        <!-- 默认展示呈现菜单，使用数据共享的值 -->
        <CaretLeft v-if="$store.state.HomeModule.navBool"/>
        <CaretRight v-else/>
    </el-icon>
  </div>
</template>

<script setup>
    import {CaretRight,CaretLeft} from '@element-plus/icons-vue'
    import {useStore} from 'vuex'
    let store=useStore()  // 调用useStore函数，声明store对象

    // 需要使用数据共享的数据，不用自己在组件中定义的了
    // import {ref} from 'vue'
    // // 声明isShow，用于展示向右还是向左的图标
    // let showWhich=ref(true)
    // 在组件当中触发mutations的触发动作
    const showMenu=()=>{
        // 调用store的commit方法，来触发mutations更新/修改state状态
        store.commit("SET_NAV_BOOL")
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