import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Sign from './views/Sign.vue'
import WorkerMessage from './components/worker_message.vue'
import WorkerPassTable from './components/worker_pass_table.vue'
import WorkerSearch from './components/worker_search.vue'
import WorkerCheck from './components/worker_check.vue'
import WorkerCorrect from './components/worker_correct.vue'
import StandardSet from './components/standard_set.vue'
import StandardSearch from './components/standard_search.vue'
import StandardLoginTable from './components/standard_login_table.vue'
import StandardCorrect from './components/standard_correct.vue'
import StandardCheck from './components/standard_check.vue'
import SalarySearch from './components/salary_search.vue'
import SalaryLoginTable from './components/salary_login_table.vue'
import SalaryLogin from './components/salary_login.vue'
import SalaryWatch from './components/salary_watch.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/Home',
      component: Home,
      children:[
        {
          path: 'worker_message',
          component: WorkerMessage
        },
        {
          path: 'worker_pass_table',
          component: WorkerPassTable
        },
        {
          path: 'worker_search',
          component: WorkerSearch
        },
        {
          path:"worker_check",
          component:WorkerCheck
        },
        {
          path:"worker_correct",
          component:WorkerCorrect
        },
        {
          path:"standard_set",
          component:StandardSet
        },
        {
          path:"standard_search",
          component:StandardSearch
        },
        {
          path:"standard_login_table",
          component:StandardLoginTable
        },
        {
          path:"standard_correct",
          component:StandardCorrect
        },
        {
          path:"standard_check",
          component:StandardCheck
        },
        {
          path:"salary_search",
          component:SalarySearch
        },
        {
          path:"salary_login_table",
          component:SalaryLoginTable
        },
        {
          path:"salary_login",
          component:SalaryLogin
        },
        {
          path:"salary_watch",
          component:SalaryWatch
        }
      ]
    },
    {
      path: '/Sign',
      component: Sign
    },
    {
      path: '*',
      redirect: '/Sign'
    }
  ]
})
