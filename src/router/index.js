import { createRouter, createWebHistory } from "@ionic/vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Welcome from "../views/Welcome.vue";
import Search from "../views/Search.vue";
import AddRequest from "../views/AddRequest.vue";
import AllRequests from "../views/AllRequests.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/AddRequest",
    name: "AddRequest",
    component: AddRequest,
  },
  {
    path: "/Search:item",
    name: "Search",
    component: Search,
  },
  {
    path: "/AllRequests",
    name: "AllRequests",
    component: AllRequests,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
