import Vue from "vue";
import Vuex from "vuex";
import home from "@/store/module/home";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    home,
  },
});

export default store;
