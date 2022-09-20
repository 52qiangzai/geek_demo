import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import { getToken } from "@/utils/token";

const Layout = () => import("@/views/Layout");
const Home = () => import("@/views/Home");
const Question = () => import("@/views/Question");
const Video = () => import("@/views/Video");
const Login = () => import("@/views/Login");
const Me = () => import("@/views/Me");
const ArticleDetail = () => import("@/views/ArticleDetail");
const PersonDetail = () => import("@/views/PersonDetail");

const routes = [
  {
    path: "/",
    redirect: "/layout/home", // 默认显示layout和layout下首页
  },
  {
    path: "/layout",
    component: Layout,
    children: [
      {
        name: "home",
        path: "home",
        component: Home,
        meta: {
          title: "首页",
        },
      },
      {
        name: "question",
        path: "question",
        component: Question,
        meta: {
          title: "问答",
        },
      },
      {
        name: "video",
        path: "video",
        component: Video,
        meta: {
          title: "视频",
        },
      },

      {
        name: "me",
        path: "me",
        component: Me,
        meta: {
          title: "我的",
        },
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      title: "登录",
    },
  },
  {
    name: "article",
    path: "/article",
    component: ArticleDetail,
    meta: {
      title: "文章页",
    },
  },
  {
    name: "person",
    path: "/person",
    component: PersonDetail,
    meta: {
      title: "个人信息",
    },
  },
];

const router = new VueRouter({
  routes,
});

// 路由拦截器
router.beforeEach((to, from, next) => {
  if (to.name === "me") {
    let result = getToken();
    if (result) return next();
    return next("/login");
  }
  next();
});

export default router;
