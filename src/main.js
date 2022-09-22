import Vue from "vue";
import App from "./App.vue";

import "@/styles/reset.css";

import router from "@/router";
import store from "@/store";
import "@vant/touch-emulator";

import myHighlight from "@/utils/myhighlight";
Vue.use(myHighlight);

import {
  Tabbar,
  TabbarItem,
  NavBar,
  Form,
  Field,
  Button,
  CountDown,
  Toast,
  Tab,
  Tabs,
  Icon,
  Cell,
  CellGroup,
  List,
  Lazyload,
  Empty,
  Skeleton,
  Image as VanImage,
  ShareSheet,
  Col,
  Row,
  ActionSheet,
  DatetimePicker,
  Popup,
  Dialog,
} from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(CountDown);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(Lazyload);
Vue.use(Empty);
Vue.use(Skeleton);
Vue.use(VanImage);
Vue.use(ShareSheet);
Vue.use(Col);
Vue.use(Row);
Vue.use(ActionSheet);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    this.$dialog = Dialog;
    this.$toast = Toast;
  },
  render: (h) => h(App),
}).$mount("#app");
