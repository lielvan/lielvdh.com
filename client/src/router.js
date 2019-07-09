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
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/",
          name: "dashboard",
          component: require("@/views/dashboard/Level.vue").default
        },
        {
          path: "chapters",
          component: require("@/views/dashboard/chapters/Chapters.vue").default,
          children: [
            {
              path: "/",
              name: "chapters",
              component: require("@/views/dashboard/chapters/Table.vue").default
            },
            {
              path: "new",
              name: "new-chapter",
              component: require("@/views/dashboard/chapters/Create.vue").default
            },
            {
              path: ":id/edit",
              name: "edit-chapter",
              component: require("@/views/dashboard/chapters/Edit.vue").default
            }
          ]
        },
        {
          path: "books",
          component: require("@/views/dashboard/books/Books.vue").default,
          children: [
            {
              path: "/",
              name: "books",
              component: require("@/views/dashboard/books/Table.vue").default
            },
            {
              path: "new",
              name: "new-book",
              component: require("@/views/dashboard/books/Create.vue").default
            },
            {
              path: ":id/edit",
              name: "edit-book",
              component: require("@/views/dashboard/books/Edit.vue").default
            }
          ]
        },
        {
          path: "motos",
          component: require("@/views/dashboard/motos/Motos.vue").default,
          children: [
            {
              path: "/",
              name: "motos",
              component: require("@/views/dashboard/motos/Table.vue").default
            },
            {
              path: "new",
              name: "new-moto",
              component: require("@/views/dashboard/motos/Create.vue").default
            },
            {
              path: ":id/edit",
              name: "edit-moto",
              component: require("@/views/dashboard/motos/Edit.vue").default
            },
          ]
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  // debugger;
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters['auth/isLoggedIn']) {
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