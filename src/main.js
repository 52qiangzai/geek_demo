import Vue from "vue";
import App from "./App.vue";

import "@/styles/reset.css";

import router from "@/router";
import store from "@/store";

import { Tabbar, TabbarItem, NavBar } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
