import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Logs from '@/components/Logs'
import showLogs from '@/components/showLogs'
import writeLogs from '@/components/writeLogs'
import newsCon from '@/components/newsCon'
import phone from '@/components/phone'


Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: 'Index',
          component: Index
      },
      {
        path:'/con/:id',
          component: newsCon
      },
      {
          path:'/phone',
          component: phone
      },
      {
          path: '/logs',
          name: 'Logs',
          component: Logs,
          children:[
              {path:"",component:showLogs,
              children:[
                  {path:"/write",component:writeLogs}
              ]}
          ]
      }
  ]
})
