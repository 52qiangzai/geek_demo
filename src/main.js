import Vue from "vue";
import App from "./App.vue";

import "@/styles/reset.css";

import router from "@/router";
import store from "@/store";
import "@vant/touch-emulator";
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Form,
  Field,
  Button,
  CountDown,
  Toast,
} from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(CountDown);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    this.$toast = Toast;
  },
  render: (h) => h(App),
}).$mount("#app");
