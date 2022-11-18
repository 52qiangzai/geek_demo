<template>
  <div class="article-page">
    <!-- 导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()">
      <template #title>
        <div class="nav-author" v-show="showNavAuthor">
          <van-image round width="7vw" height="7vw" :src="article.aut_photo" />
          <span class="name">{{ article.aut_name }}</span>
          <span class="line">|</span>
          <span
            @click="followAuthor"
            class="follow"
            :class="{ un: article.is_followed }"
          >
            {{ article.is_followed ? "取消关注" : "关注" }}
          </span>
        </div>
      </template>
      <template #right>
        <van-icon name="ellipsis" size="5.4vw" @click="showShare = true" />
      </template>
    </van-nav-bar>
    <!-- 骨架容器 -->
    <div v-if="loading" class="article-skeleton">
      <van-skeleton title :row="12" />
    </div>
    <!-- 文章主体容器 -->
    <div v-else class="article-wrapper" ref="wrapper" @scroll="scrollWrapper">
      <!-- 头部：标题 时间 作者 -->
      <div class="header" ref="header">
        <h3 class="title">{{ article.title }}</h3>
        <div class="time">
          <span>{{ article.pubdate }}</span>
          <span>|</span>
          <span>{{ article.read_count }} 阅读</span>
          <span>|</span>
          <span>{{ article.comm_count }} 评论</span>
        </div>
        <div class="author van-hairline--bottom">
          <van-image
            round
            width="10vw"
            height="10vw"
            :src="article.aut_photo"
          />
          <span class="name">{{ article.aut_name }}</span>
          <van-button
            v-if="article.is_followed"
            @click="followAuthor"
            round
            size="small"
            >取消关注</van-button
          >
          <van-button
            v-else
            @click="followAuthor"
            round
            size="small"
            color="#FC6627"
            >+关注</van-button
          >
        </div>
      </div>
      <!-- 内容：文章内容 -->
      <div class="main" ref="main">
        <div class="html" v-html="article.content" v-highlight></div>
        <div class="space"></div>
      </div>
      <!-- 分享面板 -->
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
      <!-- 评论：评论组件 -->
      <!-- <article-comment
        :article="article"
        @to-comment="scrollComment"
      ></article-comment> -->
      <CommentList :article="article"/>
    </div>
  </div>
</template>
<script>
import {
  reqArticleDetail,
  reqFollowings,
  reqCancelFollowings,
} from "@/api/article";
import CommentList from "@/components/CommentList";
export default {
  name: "ArticleDetail",
  components: { CommentList },
  data() {
    return {
      // 文章详情
      article: {},
      // 是否显示头部作者信息
      showNavAuthor: false,
      // 分享面板
      showShare: false,
      // 正在加载
      loading: false,
      // 是否滚动到评论
      isToComment: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    // 滚动到评论
    scrollComment() {
      // 确定操作行为
      this.isToComment = !this.isToComment;
      if (this.isToComment) {
        // 滚动评论
        const headerHeight = this.$refs.header.offsetHeight;
        const mainHeight = this.$refs.main.offsetHeight;
        this.$refs.wrapper.scrollTop = headerHeight + mainHeight;
      } else {
        // 滚动顶部
        this.$refs.wrapper.scrollTop = 0;
      }
    },
    // 关注或者取消关注
    async followAuthor() {
      try {
        // 当前是关注状态
        if (this.article.is_followed) {
          // 需要取消关注
          let res = await reqCancelFollowings(this.article.aut_id);
          this.article.is_followed = false;
          this.$toast.success("已取消关注");
        } else {
          // 需要关注
          let { message } = await reqFollowings(this.article.aut_id);
          this.article.is_followed = true;
          if (message === "OK") this.$toast.success("关注成功");
        }
      } catch (error) {
        this.$toast.fail("操作失败");
      }

      // const newStatus = !this.article.is_followed;
      // const [err] = await followAuthor(this.article.aut_id, newStatus);
      // if (err) return this.$toast.fail("操作失败");
      // this.$toast.success(newStatus ? "关注成功" : "取消关注");
      // this.article.is_followed = newStatus;
    },
    // 获取文章详情
    async getArticle() {
      this.loading = true;
      const { data, message } = await reqArticleDetail(this.$route.query.id);
      if (message === "OK") {
        this.article = data;
        this.loading = false;
      }
    },
    // 滚动容器
    scrollWrapper() {
      // 1. 获取卷曲的高度
      // 2. 获取头部容器高度
      // 3. 通过比较得到数据
      // 4. 通过数据控制 nav 作者信息显示隐藏
      const scrollTop = this.$refs.wrapper.scrollTop;
      const headerHeight = this.$refs.header.offsetHeight;
      this.showNavAuthor = scrollTop > headerHeight;
    },
  },
};
</script>
<style scoped lang="less">
.article-skeleton {
  margin-top: 60px;
}
.article-wrapper {
  height: 100%;
  overflow-y: auto;
  padding: 44px 0 50px;
  // 头部
  .header {
    padding: 0 16px;
    .title {
      font-size: 20px;
      font-weight: normal;
      padding: 10px 0;
      margin: 0;
    }
    .time {
      font-size: 12px;
      color: #999;
      span:nth-child(2n) {
        margin: 0 5px;
        color: #ccc;
        position: relative;
        top: -1px;
      }
    }
    .author {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .name {
        flex: 1;
        padding-left: 10px;
        font-size: 16px;
      }
    }
  }
  // 内容
  .main {
    .space {
      height: 16px;
      background: @geek-gray-color;
    }
    .html {
      word-break: break-all;
      // width: 100%;
      overflow: hidden;
      padding: 20px 16px;
      /deep/ img {
        max-width: 100%;
        background: #f9f9f9;
      }
      /deep/ pre {
        white-space: pre-wrap;
        code {
          white-space: pre;
        }
      }
    }
  }
}

/deep/ .van-nav-bar__title {
  max-width: 270px;
  width: 270px;
}
.nav-author {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > span {
    font-size: 14px;
    padding-left: 5px;
  }
  .line {
    color: #ccc;
    position: relative;
    top: -1px;
  }
  .follow {
    color: @geek-color;
    // 不加&  .follow .un   后代选择器
    // 加上&  .follow.un    交集选择器
    &.un {
      color: #999;
    }
  }
}
</style>