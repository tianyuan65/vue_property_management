import md5 from 'js-md5'
import {ref} from 'vue'

export default function useMd5 (data){
    // 将接收到的参数data(也就是密码)，用md5方法进行转换加密，又调用ref函数来声明为响应式数据
    let md5Data=ref(md5(data))

    return{md5Data}
}
