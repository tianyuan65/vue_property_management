<template>
  <h2>报修统计图</h2>
  <div id="chartRightTop" class="chartRightTop"></div>
</template>

<script setup>
import {inject,onMounted} from 'vue'
import link from '../api/link'
import apiUrl from '../api/url'

let echarts=inject("echarts")

// 挂载即渲染图表
onMounted(()=>{
  const chartRightTop=echarts.init(document.getElementById("chartRightTop"))

  link(apiUrl.chartDataRightTop).then(value=>{
    console.log('RightTopChart',value.data);

    chartRightTop.setOption({
      // 在饼图下方展示展示data内name离容器上侧的距离，可以top属性的值可以指定为数值，也可以指定为bottom、top等
      legend:{top:"bottom"},
      // 配置tooltip，鼠标移入时，弹出提示框，在提示框内展示每一扇数据的具体值
      tooltip:{},
      series:[{
        // 饼状图
        type:"pie",
        data:value.data,
        // 指定饼状图的内圈和外圈半径
        radius:[10,100],
        // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
        center:["50%","45%"],
        // 是否展示为南丁格尔图，默认为false，可以改为true；改为area时，表示所有扇区圆心角相同，仅通过半径展现数据大小。
        roseType:"area",
      }]
    })
  })
})
</script>

<style>
  h2{
    height:0.6rem;
    color:#fff;
    line-height: .6rem;
    text-align: center;
    font-size: 0.25rem;
  }
  .chartRightTop{
    height:4.5rem;
  }
</style>