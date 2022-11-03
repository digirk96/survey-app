import {createRouter, createWebHistory} from "vue-router"
import DashBoard from "../views/DashBoard.vue"
import Login from "../views/Login.vue"
import DefaultLayout from "../components/DefaultLayout.vue"
import AuthLayout from "../components/AuthLayout.vue"
import Register from "../views/Register.vue"
import Survey from "../views/Survey.vue"
import store from "../store"




const routes=[


    {
        path:'/',
        redirect:'/dashboard',
        name:'DefaultLayout',
        component: DefaultLayout,
          meta: {
          requiresAuth:true
        },
        children:[
            {
                path:'/dashboard',
                 name:'DashBoard',
                component:DashBoard,

          },
           {
                path:'/survey',
                 name:'Survey',
                component:Survey,

            }
        ]
  },

  {
     path:'/auth',
        redirect:'/login',
        name:'Auth',
    component: AuthLayout,

     meta: {
         isGuest :true
    },

    children: [
        {
        path:'/login',
        name:'Login',
        component:Login
    },
       {
        path:'/register',
        name:'Register',
        component:Register
    }
     ]

  }






];


const router = createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: 'Login' })
  }
  else if (store.state.user.token && to.meta.isGuest) {
      next({ name: 'DashBoard' })
  }

  else { next() }
})

export default router
