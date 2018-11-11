import Vue from 'vue'
import Router from 'vue-router'
import container from '@/components/container'

/*管理员*/
import adminshow from '@/components/adminshow'
import addAdmin from '@/components/addAdmin'
import editPass from '@/components/editPass'
import updateAdmin from '@/components/updateAdmin'
/*权限*/
import lableshow from '@/components/lableshow'
import addlabel from '@/components/addlabel'
import updatelabel from '@/components/updatelabel'
/*角色*/
import roleshow from '@/components/roleshow'
import addrole from '@/components/addrole'
import updaterole from '@/components/updaterole'
/*登录*/
import login from  '@/components/login/login'
/*部门*/
import addPart from '@/components/addPart'
import partshow from '@/components/partshow'
import updatePart from '@/components/updatePart'
/*用户管理*/
import addUser from '@/components/addUser'
import usershow from '@/components/usershow'
import one from '@/components/one'
import two from '@/components/two'

Vue.use(Router)
var obj=new Router({
  routes: [
    {
      path: '/',
      component: container,
        children:[
            {
              path:'/adminshow',
              component:adminshow
            },
            {
                path:'/addAdmin',
                component:addAdmin
            },
            {
              path:'/lableshow',
              component:lableshow
            },
            {
                path:'/addlabel',
                component:addlabel
            },
            {
                path:'/updatelabel',
                component:updatelabel
            },
            {
                path:'/roleshow',
                component:roleshow
            },
            {
                path:'/addrole',
                component:addrole
            },
            {
                path:'/updaterole',
                component:updaterole
            },
            {
                path:'/editPass',
                component:editPass
            },
            {
                path:'/updateAdmin',
                component:updateAdmin
            },
            {
                path:'/addUser',
                component:addUser,
                children:[
                    {path:'',component:one},
                    {path:'/lists/:ids',component:one}
                ]
            },
            {
                path:'/usershow',
                component:usershow,
                children:[
                    {path:'',component:two},
                    {path:'/lists/:ids',component:two}
                ]
            },
            {
                path:'/addPart',
                component:addPart
            },
            {
                path:'/partshow',
                component:partshow
            },
            {
                path:'/updatePart',
                component:updatePart
            },
        ]
    },
    {
      path:'/login',
      component:login
    }
  ]
})
obj.beforeEach(function (to,form,next) {
  if(to.path=="/login"){
    next();
  }else{
    if(sessionStorage.login=='ok'){
      next();
    }else {
      next("/login")
    }
  }
})
export default obj;
