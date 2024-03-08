export function checkEmail(data) {  //接收形参，用于接收输入的数据
    // 创建邮箱正则来进行邮箱格式校验
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    // 判断若传递的数据为真，则返回true，否则返回false
    return !reg.test(data) ? true :false
}

export function checkPassword(data) {  //接收形参，用于接收输入的数据
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/;// 验证密码 6至15位的字母+数字
    // 判断若传递的数据为真，则返回true，否则返回false
    return !reg.test(data) ? true : false
}