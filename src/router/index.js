import Vue from 'vue'
import VueRouter from 'vue-router'
import Harvest from "../views/Harvest.vue";
import Home from "../views/Home.vue";
import Numbers from "../views/Numbers.vue";
import Intro from "../views/Intro"
import Research from "../views/Research"
import PageEdit from '../components/PageEdit'
import Login from '../views/Login'
import AdminEdit from '../views/AdminEdit'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:'/Intro',
      children:[
            {
                path: '/Intro',
                name: '董俊课题组介绍',
                component: Intro
            },{
                path: '/Research',
                name: '研究方向',
                component: Research
            },{
                path: '/Harvest',
                name: '论文专利',
                component: Harvest
            },{
                path: '/Numbers',
                name: '成员',
                component: Numbers
            },{
              path: '/Intro/edit',
              name: '介绍编辑',
              component: PageEdit
            },{
              path: '/Harvest/edit',
              name: '成果编辑',
              component: PageEdit
          },{
              path: '/Research/edit',
              name: '研究方向编辑',
              component: PageEdit
          },{
              path: '/Numbers/edit',
              name: '成员编辑',
              component: PageEdit
          }
        ]
    }, {
        path: '/Login',
        name: 'Login',
        component: Login,
    }, {
        path: '/AdminEdit',
        name: 'AdminEdit',
        component: AdminEdit,
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
