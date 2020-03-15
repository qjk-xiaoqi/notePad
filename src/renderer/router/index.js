import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'memo',
      component: require('@/pages/memo').default
    },
    {
      path: '/eyeProtection',
      name: 'memo',
      component: require('@/pages/eyeProtection').default
    },
    {
      path: '/robot',
      name: 'memo',
      component: require('@/pages/robot').default
    },
    {
      path: '/setting',
      name: 'memo',
      component: require('@/pages/setting').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
