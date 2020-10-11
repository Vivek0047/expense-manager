import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/Login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/Home",
    name: "Home",
    component: () =>
      import("../views/Home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.name === 'SignUp' && isAuthenticated) next({name: 'Home'})
  else next()
  if (to.name !== 'Login' && to.name !== 'SignUp' && !isAuthenticated) next({name: 'Login'})
  else next()
  if (to.name === 'Login' && isAuthenticated) next({name: 'Home'})
  else next()
})
export default router;
