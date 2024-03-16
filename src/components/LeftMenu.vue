<template>
    <!-- 添加collapse属性，使其值等于$store.state.HomeModule.navBool，并用v-bind绑定，即可实现左侧导航栏的伸缩 -->
    <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    :collapse="!$store.state.HomeModule.navBool"
    @open="handleOpen"
    @close="handleClose"
    >
        <!-- template标签包裹带下拉和不带下拉的导航，用v-for遍历router.options.routes的第二个的children数组 -->
        <template v-for="child in router.options.routes[1].children" :key="child.path">
            <!-- 带下拉的导航，判断是否有子路由，若存在，就在带下拉的导航展示； -->
            <!-- index属性的值改为遍历的属性的值，因为不能是默认高亮，点击哪个选项，哪个选项就高亮，记得用v-bind绑定 -->
            <el-sub-menu :index="child.path" v-if="child.children">
                <template #title>
                    <el-icon>
                        <!-- 通过给component标签的is属性传递图标组件来实现动态组件 -->
                        <component :is="child.meta.icon"></component>
                    </el-icon>
                    <span>{{child.meta.title}}</span>
                </template>
                <!-- 遍历owner路由的children数组 -->
                <el-menu-item-group v-for="child2 in child.children" :key="child2.path">
                    <!-- 给这里的index属性值也改成遍历child2后的path值，意为点击哪个选项，哪个选项就高亮，记得用v-bind绑定 -->
                    <el-menu-item :index="child2.path">{{child2.meta.title}}</el-menu-item>
                    <!-- <el-menu-item index="1-2">item two</el-menu-item> -->
                </el-menu-item-group>
            </el-sub-menu>
            <!-- 不带下拉的导航，判断子路由是否存在，若不存在，就在不带下拉的导航展示 -->
            <el-menu-item :index="child.path" v-else>
                <el-icon>
                    <!-- 通过给component标签的is属性传递图标组件来实现动态组件 -->
                    <component :is="child.meta.icon"></component>
                </el-icon>
                <!-- 展示不带下拉的路由的title -->
                <span>{{child.meta.title}}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script setup>
    import {onMounted} from 'vue'
    import {useRouter} from 'vue-router'
    import {
        TrendCharts,
        Grid,
        List
    } from '@element-plus/icons-vue'
    
    let router=useRouter()
    const handleOpen = (key, keyPath) => {
        console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
        console.log(key, keyPath)
    }

    onMounted(() => {
        console.log(router);
        console.log("get route rules",router.options.routes[1].children);
    })
</script>

<style>

</style>