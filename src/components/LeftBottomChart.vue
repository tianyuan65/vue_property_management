<template>
  <h2>每日访客数量统计</h2>
  <div id="chartLeftBottom" class="chartLeftBottom"></div>
</template>

<script setup>
import {inject,onMounted} from 'vue'
import link from '../api/link'
import apiUrl from '../api/url'

let echarts=inject("echarts")

// 挂载即渲染图表
onMounted(()=>{
  const LeftBottomChart=echarts.init(document.getElementById("chartLeftBottom"))

  link(apiUrl.chartDataLeftBottom).then(value=>{
    console.log('LeftBottomChart',value);

    // 请求成功后，处理完数据，则绘制图表
    LeftBottomChart.setOption({
      xAxis:{
        type:"category",
        // x轴展示日期
        data:value.data.day,
        // 坐标轴两边留白策略，默认值为true，意思是留点位置，改为false，则第一个数据紧贴y轴
        boundaryGap:false,
        axisLine:{
          // 设置x轴样式
          lineStyle:{
            color:"#fff"
          }
        }
      },
      // 提示框组件，将鼠标移到每个数据点，会出现提示框来展示x轴和y轴的具体数据
      tooltip:{},
      yAxis:{
        type:"value",
        axisLine:{
          // 设置y轴样式
          lineStyle:{
            color:"#fff"
          }
        }
       
      },
      // 设置图表的位置
      grid:{
        left:"1%",
        right:"4%",
        bottom:"3%",
        // grid 区域是否包含坐标轴的刻度标签，默认值为false，改为true，可让grid区域包含坐标轴刻度
        containLabel:true
      },
      // 系列
      series:[
        {
          // 折线图
          type:"line",
          name:"外卖",
          data:value.data.num.外卖,
          // 数据堆叠，同个类目轴上系列配置相同的 stack 值可以堆叠放置。
          stack:"Total",
          // 是否平滑曲线显示，默认值为false，
          smooth:true,
          // 样式
          areaStyle:{
            // 区域的填充样式
            opacity:0.5,  // 透明度
            color:new echarts.graphic.LinearGradient(0,0,0,1,[
              {
                offset:0,
                color:"rgb(128,255,165)"
              },
              {
                offset:1,
                color:"rgb(1,191,236)"
              }
            ])
          },
          // 设置线条样式
          lineStyle:{
            // 可以设置线条宽度
            width:0
          }
        },
        {
          // 折线图
          type:"line",
          name:"快递",
          data:value.data.num.快递,
          // 数据堆叠，同个类目轴上系列配置相同的 stack 值可以堆叠放置。
          stack:"Total",
          // 是否平滑曲线显示，默认值为false，
          smooth:true,
          // 样式
          areaStyle:{
            // 区域的填充样式
            opacity:0.5,  // 透明度
            color:new echarts.graphic.LinearGradient(0,0,0,1,[
              {
                offset:0,
                color:"rgb(0,221,255)"
              },
              {
                offset:1,
                color:"rgb(77,119,255)"
              }
            ])
          },
          // 设置线条样式
          lineStyle:{
            // 可以设置线条宽度
            width:0
          }
        },
        {
          // 折线图
          type:"line",
          name:"一般访客",
          data:value.data.num.一般访客,
          // 数据堆叠，同个类目轴上系列配置相同的 stack 值可以堆叠放置。
          stack:"Total",
          // 是否平滑曲线显示，默认值为false，
          smooth:true,
          // 样式
          areaStyle:{
            // 区域的填充样式
            opacity:0.5,  // 透明度
            color:new echarts.graphic.LinearGradient(0,0,0,1,[
              {
                offset:0,
                color:"rgb(55,162,255)"
              },
              {
                offset:1,
                color:"rgb(116,21,219)"
              }
            ])
          },
          // 设置线条样式
          lineStyle:{
            // 可以设置线条宽度
            width:0
          }
        },
        {
          // 折线图
          type:"line",
          name:"授权访客",
          data:value.data.num.授权访客,
          // 数据堆叠，同个类目轴上系列配置相同的 stack 值可以堆叠放置。
          stack:"Total",
          // 是否平滑曲线显示，默认值为false，
          smooth:true,
          // 样式
          areaStyle:{
            // 区域的填充样式
            opacity:0.5,  // 透明度
            color:new echarts.graphic.LinearGradient(0,0,0,1,[
              {
                offset:0,
                color:"rgb(255,0,134)"
              },
              {
                offset:1,
                color:"rgb(135,0,157)"
              }
            ])
          },
          // 设置线条样式
          lineStyle:{
            // 可以设置线条宽度
            width:0
          }
        },
      ]
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
  .chartLeftBottom{
    height:4.5rem;
  }
</style>