import { createRouter, createWebHistory } from "@ionic/vue-router";
import Welcome from "../views/Welcome.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import SelectSchool from "../views/SelectSchool.vue";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Question from "../views/Question.vue";
import AddRequest from "../views/AddRequest.vue";
import AddQuestion from "../views/AddQuestion.vue";
import AllRequests from "../views/AllRequests.vue";
import AllQuestions from "../views/AllQuestions.vue";

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
    path: "/allquestions:school",
    name: "AllQuestions",
    component: AllQuestions,
  },
  {
    path: "/home:school",
    name: "Home",
    component: Home,
  },
  {
    path: "/selectschool",
    name: "SelectSchool",
    component: SelectSchool,
  },
  {
    path: "/addRequest",
    name: "AddRequest",
    component: AddRequest,
  },
  {
    path: "/addQuestion",
    name: "AddQuestion",
    component: AddQuestion,
  },
  {
    path: "/question:q",
    name: "Question",
    component: Question,
    props: true,
  },
  {
    path: "/search:item",
    name: "Search",
    component: Search,
  },
  {
    path: "/AllRequests:school",
    name: "AllRequests",
    component: AllRequests,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
