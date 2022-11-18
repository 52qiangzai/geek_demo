<template>
  <div class="article-comment">
    <!-- 全部评论 -->
    <van-sticky offset-top="11.73333vw">
      <div class="title van-hairline--bottom">
        <span>全部评论 ({{ article.comm_count }})</span>
        <span>{{ article.like_count }} 点赞</span>
      </div>
    </van-sticky>
    <!-- 评论列表 -->
    <!-- <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有评论了"
        @load="onLoad"
      >
        <div
          class="item van-hairline--bottom"
          v-for="item in commentObj.results"
          :key="item.com_id"
        >
          <van-image round width="10vw" height="10vw" :src="item.aut_photo" />
          <div class="info">
            <p>
              <span class="name">{{ item.aut_name }}</span>
              <span class="zan"
                >{{ item.like_count }} <geek-icon name="like2"
              /></span>
            </p>
            <p class="cont">{{ item.content }}</p>
            <p>
              <span class="reply" @click="clickReply(item)"
                >{{ item.reply_count }}回复
                <i class="van-icon van-icon-arrow"></i
              ></span>
              <span class="time">{{ item.pubdate | relativeTime }}</span>
            </p>
          </div>
        </div>
      </van-list>
    </div> -->
    <!-- 底部工具 -->
    <div class="footer van-hairline--top">
      <div class="input" @click="showInput = true">
        <i class="van-icon van-icon-edit"></i>
      </div>
      <div class="btn" @click="$emit('to-comment')">
        <p>评论</p>
      </div>
      <div class="btn" @click="likeArticle">
        <p ref="likeBtn">点赞</p>
      </div>
      <div class="btn" @click="collectArticle">
        <p>收藏</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reqArticleComment } from "@/api/comment";
import { reqLikeArticle,reqCancelLikeArticle } from "@/api/article";
export default {
  name: "CommentList",
  props: {
    article: Object,
  },
  data() {
    return {
      commentObj: {},
      loading: false,
      finished: false,
      showInput: false,
      isLike: false,
    };
  },
  mounted() {
    this.getComment();
  },
  methods: {
    // 获取文章评论
    async getComment() {
      try {
        let { data, message } = await reqArticleComment(
          "a",
          this.article.art_id,
          10
        );
        if (message === "OK") this.commentObj = data;
      } catch (error) {}
    },
    // 点赞文章
    async likeArticle() {
      let res;
      if (!this.isLike) {
        res = await reqLikeArticle(this.article.art_id);
        const { message } = res;
        if (message === "OK") {
          this.$refs.likeBtn.innerText = "已点赞";
          this.$toast.success("已点赞");
        }
      } else {
        res = await reqCancelLikeArticle(this.article.art_id);
        this.$refs.likeBtn.innerText = "点赞";
        this.$toast.success("已取消点赞");
      }
      this.isLike = !this.isLike;
    },
    // 收藏文章
    collectArticle() {},
    // 提交评论
    submit() {},
    onLoad() {},
    clickReply() {},
    reply() {},
  },
};
</script>
<style scoped lang="less">
::v-deep .van-nav-bar__text {
  color: @geek-color;
}
::v-deep .van-field__control {
  background: @geek-gray-color;
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 4px;
}
.van-popup {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.reply-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  background: #fff;
  display: flex;
  width: 100%;
  align-items: center;
  .input {
    &.big {
      width: 260px;
    }
    margin-left: 10px;
    width: 200px;
    height: 34px;
    background: @geek-gray-color;
    border-radius: 17px;
    line-height: 36px;
    padding-left: 10px;
    .van-icon {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: center;
    position: relative;
    p {
      margin: 0;
      font-size: 10px;
    }
    .geek-icon {
      font-size: 18px;
    }
    i {
      height: 16px;
      min-width: 16px;
      padding: 0 3px;
      background: @geek-color;
      color: #fff;
      font-size: 10px;
      position: absolute;
      right: 0;
      top: -4px;
      line-height: 16px;
      border-radius: 8px;
      font-style: normal;
    }
  }
}
.article-comment {
  .title {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background: #fff;
    span {
      font-size: 16px;
      &:last-child {
        color: #ccc;
        font-size: 14px;
      }
    }
  }
  .list {
    padding: 0 16px;
    .item {
      display: flex;
      padding: 10px 0;
      .info {
        padding-left: 10px;
        flex: 1;
        p {
          margin: 0;
          .name {
            font-size: 16px;
          }
          .zan {
            font-size: 14px;
            float: right;
            color: #999;
            .geek-icon {
              font-size: 12px;
              position: relative;
              top: -1px;
            }
          }
          &.cont {
            font-size: 14px;
            color: #666;
            padding: 10px 0;
            word-break: break-all;
            padding-right: 40px;
          }
          .reply {
            min-width: 60px;
            height: 24px;
            text-align: center;
            line-height: 28px;
            font-size: 12px;
            background: @geek-gray-color;
            display: inline-block;
            border-radius: 14px;
            color: #666;
            .van-icon {
              position: relative;
              top: 1px;
            }
          }
          .time {
            font-size: 12px;
            color: #999;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>