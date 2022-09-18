<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/layout/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="chat-o" replace to="/layout/question"
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon="tv-o" replace to="/layout/video"
        >视频</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" replace to="/layout/me"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="less" scoped>
</style>