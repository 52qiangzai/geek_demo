<template>
  <div class="container">
    <van-tabs v-model="active" sticky type="line" @click="onClickTab">
      <van-tab
        v-for="(item, index) in channelsList"
        :key="item.id"
        :title="item.name"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="已加载全部内容"
          @load="loadingMore"
          :immediate-check="false"
        >
          <ArticleItem
            v-for="(article, index) in articlesList"
            :key="index"
            :artObj="article"
          />
          <van-empty description="暂无内容" v-show="!articlesList.length" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ArticleItem },
  data() {
    return {
      active: 0, //active和文章id对应
      loading: false,
      finished: false,
    };
  },
  computed: {
    ...mapState({
      channelsList: (state) => {
        return state.home.channelsList || [];
      },
      articlesList: (state) => {
        return state.home.articlesList || [];
      },
      pre_timestamp: (state) => {
        return state.home.pre_timestamp || "";
      },
    }),
  },
  mounted() {
    this.$store.dispatch("home/getAllChannels");
    this.getArticles(this.active, Date.now());
  },
  methods: {
    // 发送获取文章请求
    async getArticles(id, timestamp) {
      return await this.$store.dispatch("home/getAllArticles", {
        channel_id: id,
        timestamp: timestamp,
      });
    },
    // 切换tab事件
    onClickTab(id) {
      this.getArticles(id, Date.now());
    },
    // 加载更多文章
    async loadingMore() {
      let res = await this.getArticles(this.active, this.pre_timestamp);
      if (res === "OK") {
        this.loading = false;
      } else {
        this.loading = true;
        this.finished = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
}
</style>