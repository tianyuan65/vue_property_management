import link from '../../api/link'
import apiUrl from '../../api/url'

// 声明一个名为HomeModule的对象
const HomeModule={
    state:{  // 控制组件状态，就是存放数据的地方
        // 使navBool值默认为true，为了在RightTop中使用
        navBool:true,
        // 使dialogFormVisible默认值为false，也就是UpdateDialog组件默认不弹出，只有在被触发时弹出
        dialogFormVisible:false,
        // 使updateListData默认值为空字符串，当userlist中数据发生变化时，将最新数据赋值进去
        updateListData:{},
        listData:[]
    },
    mutations:{
        // 在mutations中调用在组件中触发的SET_NAV_BOOL函数，传递state作为形参，也就是上面的那个state
        SET_NAV_BOOL(state:any){
            // 值取反
            state.navBool=!state.navBool
        },
        // 更新弹出框的状态--弹出 or 关闭
        SETDIALOG(state:any){
            // 将state中的dialogFormVisible的值取反，用于UpdateDialog组件的展示与隐藏
            state.dialogFormVisible=!state.dialogFormVisible
        },
        // 在mutations中调用在UpdateOwners组件当中handleEdit事件函数被触发时调用的SETOWNER函数
        SETOWNER(state:any,payload:any){
            // 将组件中修改的数据row，在这里作为参数payload接收，并修改的数据赋值给state.updateListData
            state.updateListData=payload
        },
        // 更新列表中数据
        UPDATEOWNERLIST(state:any,payload:any){
            // 将获取的数据value.data赋值给state.listData，来更新/修改userlist里的数据
            state.listData=payload.data
        },
    },
    actions:{
        // UpdateOwners组件的onMounted中调用dispatch方法触发的该函数
        UpdateOwnersList(context:any){
            //调用link函数
            link(apiUrl.userlist).then((value:any)=>{
                // 调用commit方法触发mutations中的UPDATEOWNERLIST
                context.commit('UPDATEOWNERLIST',value)
                console.log(value);
            })
        },
        deleteData(context:any,value:any){
            link(apiUrl.userlist+'/'+value.id,"DELETE").then((value:any)=>{
                console.log(value);
                window.location.reload()
            })
        }
    },
    getter:{}
}

export default HomeModule