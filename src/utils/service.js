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

// 响应拦截
service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default service