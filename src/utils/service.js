import axios from 'axios'

// 声明axiosUrl为空字符串
let axiosUrl=''

// 判断条件为目前是否为development环境
if(process.env.NODE_ENV==="development"){
    // 是则，使axiosURL的值为先前在.env.development文件中设置的获取数据的路径
    axiosUrl=process.env.Vue_APP_API
}else{
    // 否则，使axiosURL的值为其他的获取数据的路径
    axiosUrl=process.env.Vue_APP_API
}

// 创建axios实例
const service=axios.create({
    baseUrl:axiosUrl  // 声明默认请求地址
})

// 请求拦截
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截，在接收到响应的时候，进行一些操作
service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // 在接收到请求返回结果时，先不显示错误的信息，先对响应的状态码进行一些处理，给用户错误的提示信息
    console.log('error:',error.response.status);  // error:404
    // 拦截到错误信息时，在此可以判断错误状态代码来输出错误信息来提醒用户
    switch (error.response.status) {
        case 404:
            alert('The current path is wrong!!')
            break;
        case 500:
            alert('Failed to connect with server, please try again later!!')
        break;
    
        default:
            alert('Unknown error!!')
            break;
    }
    // Do something with response error
    return Promise.reject(error);
});

export default service