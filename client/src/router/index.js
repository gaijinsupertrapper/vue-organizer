import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import PanelView from '@/components/PanelView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/panel/:id',
      name: 'PanelView',
      component: PanelView
    }
  ],
  mode: 'history'
})
