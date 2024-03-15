// 声明一个名为HomeModule的对象
const HomeModule={
    state:{  // 控制组件状态，就是存放数据的地方
        // 使navBool值默认为true，为了在RightTop中使用
        navBool:true
    },
    mutations:{
        // 在mutations中调用在组件中触发的SET_NAV_BOOL函数，传递state作为形参，也就是上面的那个state
        SET_NAV_BOOL(state:any){
            // 值取反
            state.navBool=!state.navBool
        }
    },
    actions:{},
    getter:{}
}

export default HomeModule