import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Login from "@/components/Login";
import Dashboard from "@/views/dashboard/Dashboard";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    }
  ]
});
