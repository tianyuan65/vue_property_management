import service from '../utils/service'  // 引入拦截器
// 封装相关的数据请求

// 声明link函数，接收url、method、data、params为形参，发送请求时要用
let link=(url,method,data,params)=>{
    // 函数中返回一个Promise实例对象
    return new Promise((resolve,reject)=>{
        // 调用拦截器的request方法来发送请求
        service.request({
            // url:url,  //可简写，下面的几个也一样
            url,
            method,
            data,
            params
        }).then(value=>{
            // 成功则调用resolve方法，来接收后台来的数据；
            resolve(value)
        }).catch(error=>{
            // 失败则调用reject方法，来接收错误的信息
            reject(error)
        })
    })
}
export default link  // 最后暴露link函数，便于在组件中直接引入调用，并从后台获取数据