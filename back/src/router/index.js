import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/Login/index')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../components/Home/index'),
      children: [
        {
          path: 'addArticle',
          name: 'AddArticle',
          component: () => import('../components/Home/AddArticle/index')
        },
        {
          path: 'listArticle',
          name: 'ListArticle',
          component: () => import('../components/Home/ListArticle/index')
        },
        {
          path: 'editerArticle',
          name: 'EditerArticle',
          component: () => import('../components/Home/EditerArticle/index')
        },
        {
          path: 'addOneList',
          name: 'AddOneList',
          component: () => import('../components/Home/AddOneList/index')
        },
        {
          path: 'addTwoList',
          name: 'AddTwoList',
          component: () => import('../components/Home/AddTwoList/index')
        },
        {
          path: 'allList',
          name: 'AllList',
          component: () => import('../components/Home/AllList/index')
        },
        {
          path: 'backPort',
          name: 'BackPort',
          component: () => import('../components/Home/BackPort/index')
        },
        {
          path: 'editPort',
          name: 'EditPort',
          component: () => import('../components/Home/EditPort/index')
        },
        {
          path: 'addPort',
          name: 'AddPort',
          component: () => import('../components/Home/AddPort/index')
        },
        {
          path: 'hello',
          name: 'Hello',
          component: () => import('../components/Home/Hello/index')
        },
        {
          path: 'fontPort',
          name: 'FontPort',
          component: () => import('../components/Home/FontPort/index')
        },
        {
          path: 'editerTwo',
          name: 'EditerTwo',
          component: () => import('../components/Home/EditerTwo/index')
        }
      ]
    }
  ]
})
import axios from 'axios'
axios.post('/api/user/search',{id: sessionStorage['id']}).then((res) => {
  const code = res.data.code
})
router.beforeEach((to, from, next) => {
  document.querySelector('title').innerHTML = to.name
  if (to.name == 'Login') {
    next()
  } else if(sessionStorage['success'] == '1') {
    axios.post('/api/user/search',{id: sessionStorage['id']}).then((res) => {  
      if (res.data.code === '1117') {
        next()
      }
    })
  } else {
    next('/')
  }

})
export default router