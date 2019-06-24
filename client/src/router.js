import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import Home from "@/views/Home";
import Login from "@/views/dashboard/Login";
import Dashboard from "@/views/dashboard/Dashboard";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      component: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
  // debugger;
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isLoggedIn) {
      next()
      return
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router;