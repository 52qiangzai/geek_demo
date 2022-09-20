import { reqAllArticlesById, reqAllChannels } from "@/api/home";
//时间格式化插件
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn"; // 导入本地化语言
dayjs.extend(relativeTime);
dayjs.locale("zh-cn"); // 使用本地化语言
const home = {
  namespaced: true,
  state: {
    channelsList: [],
    articlesList: [],
    pre_timestamp: "",
  },
  mutations: {
    get_AllChannels(state, data) {
      state.channelsList = data;
    },
    get_AllArticle(state, { data, timestamp }) {
      let { results, pre_timestamp } = data;
      let newResult = results.map((item) => {
        item.pubdate = dayjs(item.pubdate).fromNow();
        return item;
      });
      if (timestamp !== state.pre_timestamp) {
        state.articlesList = newResult;
      } else {
        state.articlesList.push(...newResult);
      }
      state.pre_timestamp = pre_timestamp;
    },
  },
  actions: {
    // 获取所有频道信息
    async getAllChannels({ commit }) {
      try {
        let res = await reqAllChannels();
        if (res.message === "OK") commit("get_AllChannels", res.data.channels);
      } catch (error) {
        console.log("获取失败");
      }
    },
    // 获取所有文章信息
    async getAllArticles({ commit }, { channel_id, timestamp }) {
      try {
        let res = await reqAllArticlesById({ channel_id, timestamp });
        if (res.message === "OK") {
          commit("get_AllArticle", { data: res.data, timestamp });
        }
        return res.message;
      } catch (error) {
        console.log("文章获取失败");
        return "error";
      }
    },
  },
};
export default home;
