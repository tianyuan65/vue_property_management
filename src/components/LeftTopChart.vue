<template>
  <div>
    <h2>住户人数统计</h2>
    <div id="chartLeftTop" class="chartLeftTop"></div>
  </div>
</template>

<script setup>
// 引入inject方法，用于祖孙组件间通信
import {inject,onMounted,reactive} from 'vue'
import link from '../api/link'
import apiUrl from '../api/url'

// let data=reactive([])
// 声明名为xData和yData的数组响应式数据
let xData=reactive([])
let yData=reactive([])

// 调用inject方法，接收来自祖先组件的数据
let echarts=inject('echarts')

// 在DOM加载完毕后，呈现柱状图
onMounted(()=>{
  // 调用echarts的init方法来初始化，并获取节点
  const LeftTopchart=echarts.init(document.getElementById("chartLeftTop"))
  // 向apiUrl的chartDataLeftTop路径发送get请求来获取数据，随后即可根据数据绘制附表
  link(apiUrl.chartDataLeftTop).then(value=>{
    // 解构赋值出value中的data
    let {data}=value
    console.log(data);
    // 将获取到的数据遍历，遍历后的结果中的属性分别赋值给xData和yData，以便于把数据插入到图表中
    xData=data.map(xd=>xd.title)
    yData=data.map(yd=>yd.num)

    console.log("x",xData);
    console.log("y",yData);
    // 请求成功后，处理完数据，则绘制图表
    LeftTopchart.setOption({
      // x轴
      xAxis:{
        // 展示值
        type:"value",
        axisLine:{
          // 设置x轴样式
          lineStyle:{
            color:"#fff"
          }
        }
      },
      // y轴
      yAxis:{
        // 展示类别
        type:"category",
        data:xData,
        axisLine:{
          // 设置y轴样式
          lineStyle:{
            color:"#fff"
          }
        }
      },
      // 设置图表的位置
      grid:{
        top:"3%",
        left:"1%",
        bottom:"3%",
        right:"6%",
        // grid 区域是否包含坐标轴的刻度标签，默认值为false，改为true，可让grid区域包含坐标轴刻度
        containLabel:true
      },
      // 系列
      series:[
        {
          // 类型为柱状图
          type:"bar",
          data:yData,
          itemStyle:{
            borderRadius:[0,20,20,0],  // 顺时针左上，右上，右下，左下\
            color:new echarts.graphic.LinearGradient(0,0,1,0,[
              {
                offset:0,
                color:'#ccf'
              },
              {
                offset:0.5,
                color:'#bfa'
              },
              {
                offset:1,
                color:'aqua'
              },
            ])
          }
        }
      ]
    })
  })
})
</script>

<style lang="scss" scoped>
  h2{
    height:0.6rem;
    color:#fff;
    line-height: .6rem;
    text-align: center;
    font-size: 0.25rem;
  }
  .chartLeftTop{
    height:4.5rem;
  }
</style>