import Vue from 'vue'
import Router from 'vue-router'
import upload from '@/components/upload'

Vue.use(Router)
var obj=new Router({
  routes: [
    {
      path: '/',
      component:upload
    }
  ]
})
export default obj;
