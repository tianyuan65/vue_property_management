<template>
  <h2>车位统计</h2>
  <div id="chartRightBottom" class="chartRightBottom"></div>
</template>

<script setup>
// 引入inject方法，用于祖孙组件间通信
import {inject,onMounted} from 'vue'
import link from '../api/link'
import apiUrl from '../api/url'

// 调用inject方法，接收来自祖先组件的数据
let echarts=inject('echarts')

// 在DOM加载完毕后，呈现柱状图
onMounted(()=>{
  // 调用echarts的init方法来初始化，并获取节点
  const RightBottomchart=echarts.init(document.getElementById("chartRightBottom"))
  // 向apiUrl的chartDataLeftTop路径发送get请求来获取数据，随后即可根据数据绘制附表
  link(apiUrl.chartDataRightBottom).then(value=>{
    // 解构赋值出value中的data
    let {data}=value
    console.log('RightBottomchart',data);
    
    // 请求成功后，处理完数据，则绘制图表
    RightBottomchart.setOption({
      // 配置tooltip，鼠标移入时，弹出提示框，在提示框内展示每一扇数据的具体值
      tooltip:{
        // 触发类型，axis用于坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        trigger:'axis',
        // 坐标轴指示器配置项。
        axisPointer:{
          // 指示器类型，'line' 直线指示器；'shadow' 阴影指示器；'none' 无指示器；'cross' 十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
          type:'shadow'
        }
      },
      xAxis:{
        // 展示类别
        type:"category",
        data:data.day,
        axisLine:{
          // 设置x轴样式
          lineStyle:{
            color:"#fff"
          }
        }
      },
      yAxis:{
        // 展示值
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
      series:[
        {
          type:"bar",
          data:data.num.一般用户,
          // 数据堆叠
          stack:"total"
        },
        {
          type:"bar",
          data:data.num.月租用户,
          // 数据堆叠
          stack:"total"
        },
        {
          type:"bar",
          data:data.num.特殊车辆,
          // 数据堆叠
          stack:"total"
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
  .chartRightBottom{
    height:4.5rem;
  }
</style>