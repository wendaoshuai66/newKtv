import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import Index from '../components/index'
import Shop from '../components/shop'
import Affirm from '../components/affirm'
import Ok from '../components/ok'
import Fail from '../components/fail'
import Home from '../components/home'
import Detail from '../components/detail'
import Game from '../components/game'
import Risk from '../components/risk'
import Puzzle from '../components/puzzle'
import Guess from '../components/guess'
import Music from '../components/music'
import Recommend from '../components/recommend'
import Singer from '../components/singer'
import Rank from '../components/rank'
import Search from '../components/search'
import SingerDetail from '../components/singer-detail'
import TopList from '../components/top-list'
import Disc from '../components/disc'
import Login from '../components/login.vue'
Vue.use(Router)
Vue.use(Resource)
Vue.use(IScrollView, IScroll)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
    },
    {
      path: '/affirm',
      name: 'affirm',
      component: Affirm,
    },
    {
      path: '/ok',
      name: 'ok',
      component: Ok,
    },
    {
      path: '/fail',
      name: 'fail',
      component: Fail,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
    {
      path: '/risk',
      name: 'risk',
      component: Risk,
    },
    {
      path: '/guess',
      name: 'guess',
      component: Guess,
    },
    {
      path: '/puzzle',
      name: 'puzzle',
      component: Puzzle,
    },
    {
      path: '/music',
      redirect: '/music/recommend',
      name: 'music',
      component: Music,
      children: [
        {
          path: 'recommend',
          name: 'recommend',
          component: Recommend,
          children: [
            {
              path: ":id",
              name: "disc",
              component: Disc
            }
          ]
        },
        {
          path: 'singer',
          name: 'singer',
          component: Singer,
          children: [
            {
              path: ":id",
              name: "singer-detail",
              component: SingerDetail
            }
          ]
        },
        {
          path: 'rank',
          name: 'rank',
          component: Rank,
          children: [
            {
              path: ":id",
              name: "top-list",
              component: TopList
            }
          ]
        },
        {
          path: 'search',
          name: 'search',
          component: Search,
          children: [
            {
              path: ":id",
              name: "search-inger-detail",
              component: SingerDetail
            }
          ]
        },]
    },

  ]
})
