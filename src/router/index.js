import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const base=()=>import('@/view/base')
const login=()=>import('@/view/login')
const fxUser=()=>import('@/components/fenxi/user')
const fxOrder=()=>import('@/components/fenxi/order')
const qxglList=()=>import('@/components/qxgl/list')
const qxglAdd=()=>import('@/components/qxgl/add')
const jsList=()=>import('@/components/jsgl/list')
const jsAdd=()=>import('@/components/jsgl/add')
const jsEdit=()=>import('@/components/jsgl/edit')
const glyList=()=>import('@/components/gly/list')
const glyAdd=()=>import('@/components/gly/add')
const glyEdit=()=>import('@/components/gly/edit')
const goodsflList=()=>import('@/components/goodsfl/list')
const goodsflAdd=()=>import('@/components/goodsfl/add')
const goodsflEdit=()=>import('@/components/goodsfl/edit')
const sp=()=>import('@/components/spgl/sp')
import axios from "axios"
Vue.use(Router)

let router= new Router({
  routes: [
    {
      path: '/base',
      name: 'base',
      component: base,
      children:[
        {
          path: 'fxuser',
          name: 'fxuser',
          component:fxUser
        },
        {
          path: 'fxorder',
          name: 'fxorder',
          component:fxOrder
        },
        {
          path: 'qxgllist',
          name: 'qxgllist',
          component:qxglList
        },{
          path: 'qxgladd',
          name: 'qxgladd',
          component:qxglAdd
        },
        {
          path: 'jslist',
          name: 'jslist',
          component:jsList
        },
        {
          path: 'jsadd',
          name: 'jsadd',
          component:jsAdd
        },
        {
          path: 'jsedit/:id',
          name: 'jsedit',
          component:jsEdit
        },
        {
          path: 'glylist',
          name: 'glylist',
          component:glyList
        },
        {
          path: 'glyadd',
          name: 'glyadd',
          component:glyAdd
        },
        {
          path: 'glyedit/:id',
          name: 'glyedit',
          component:glyEdit
        },
        {
          path: 'goodsfllist',
          name: 'goodsfllist',
          component:goodsflList
        },
        {
          path: 'goodsfladd',
          name: 'goodsfladd',
          component:goodsflAdd
        },
        {
          path: 'goodsfledit/:id',
          name: 'goodsfledit',
          component:goodsflEdit
        },
        {
          path: 'sp',
          name: 'glgoods',
          component:sp
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component:login
    },{
      path: '/',
      redirect:"/base/fxuser"
    }
  ]
})
router.beforeEach((to,from,next)=>{
  let token=localStorage.getItem('houtaitoken')?JSON.parse(localStorage.getItem('houtaitoken')).token:""
  let id=localStorage.getItem('houtaitoken')?JSON.parse(localStorage.getItem('houtaitoken')).id:""
     if(to.name !='login'){
       axios.get('/checktoken',{headers:{token:token}}).then(res=>{
        //  console.log(res)
        if (res.data.err_code == 200) {
            //  axios.get('/checkqx',{params:{
            //    id:id,
            //    name:to.name
            //  }}).then(res=>{
            //    if(res.data.err_code==200){
            //     next();
            //    }else{
            //      alert('没有权限')
            //    }
            //  })
            next()
        } else {
          // console.log("token 过期")
          router.push({ name: "login" })
        }
       })
     }else{
       next()
     }
})
export default router