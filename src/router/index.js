import Vue from "vue";
import VueRouter from "vue-router";
import ListView from "../pages/ListView.vue";
import ManageView from "../pages/ManageView.vue";
import RegisterView from "../pages/RegisterView.vue";
import TasksSummaryView from "../pages/TasksSummaryView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "taskSummary",
    component: TasksSummaryView,
  },
  {
    path: "/manage",
    name: "manage",
    component: ManageView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: ListView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
