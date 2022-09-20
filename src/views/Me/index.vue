<template>
  <div class="user-page">
    <div class="user-profile">
      <!-- 个人信息 -->
      <div class="info">
        <van-image round fit="cover" :src="user.photo" />
        <h3 class="name">{{ user.name }}</h3>
        <router-link class="btn" :to="{ path: '/person' }"
          >个人信息<van-icon name="arrow"
        /></router-link>
      </div>
      <!-- 统计信息 -->
      <van-row>
        <van-col span="6">
          <p>{{ user.art_count }}</p>
          <p>动态</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.follow_count }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.fans_count }}</p>
          <p>粉丝</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.like_count }}</p>
          <p>被赞</p>
        </van-col>
      </van-row>
      <!-- 用户链接 -->
      <van-row class="user-links">
        <van-col span="6"> <van-icon name="chat-o" />消息通知 </van-col>
        <van-col span="6"> <van-icon name="shop-collect-o" />我的收藏 </van-col>
        <van-col span="6">
          <van-icon name="browsing-history-o" />阅读历史
        </van-col>
        <van-col span="6"> <van-icon name="medal-o" />我的作品 </van-col>
      </van-row>
    </div>
    <div class="more">
      <p>更多服务</p>
      <van-row>
        <van-col span="6"
          ><van-icon name="comment-circle-o" />用户反馈
        </van-col>
        <van-col span="6">
          <van-icon
            @click.native="$router.push('/user/chat')"
            name="chat-o"
          />小智同学
        </van-col>
        <van-col span="6"> </van-col>
        <van-col span="6"> </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { reqUserBaseInfo } from "@/api/user";
export default {
  name: "Me",
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const { data, message } = await reqUserBaseInfo();
      if (message === "OK") this.user = data;
    },
  },
};
</script>
<style scoped lang='less'>
.user-page {
  background: #fafafa;
  height: 100vh;
}
.more {
  margin: 0 15px;
  background-color: #fff;
  border-radius: 10px;
  height: 120px;
  p {
    font-size: 16px;
    padding: 10px 15px;
    margin: 0;
  }
  .van-row {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    .geek-icon {
      display: block;
      font-size: 22px;
      padding-bottom: 5px;
    }
  }
}
.user {
  &-profile {
    padding: 0 15px;
    // height: 240px;
    display: block;
    background: linear-gradient(318deg, #b2b5db 0%, #565482 70%, #494675 100%);
    color: #fff;
    border-bottom-left-radius: 400px 60px;
    border-bottom-right-radius: 400px 60px;
    margin-bottom: 48px;
    .info {
      display: flex;
      padding: 40px 0;
      height: 130px;
      align-items: center;
      .van-image {
        width: 50px;
        height: 50px;
        border: 3px solid #7674a2;
      }
      .name {
        font-size: 20px;
        font-weight: normal;
        margin-left: 10px;
        flex: 1;
      }
      .btn {
        color: #fff;
        line-height: 1;
        font-size: 12px;
        .van-icon {
          position: relative;
          top: 1px;
        }
      }
    }
    p {
      margin: 0;
      text-align: center;
      height: 20px;
    }
  }
  &-links {
    padding: 20px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    color: #333;
    position: relative;
    top: 20px;
    .geek-icon {
      display: block;
      font-size: 22px;
      padding-bottom: 5px;
    }
  }
}
</style>