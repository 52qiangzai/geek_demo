<template>
  <div>
    <HeaderBar />
    <div class="wrapper">
      <div class="question-item van-hairline--bottom" v-for="i in 5" :key="i">
        <div class="content">
          <div class="left">
            <p class="van-multi-ellipsis--l2">
              作为 IT 行业的过来人，你有什么话想对后辈说的？
            </p>
            <span>赞同 1000+</span>
            <span>评论 500+</span>
            <span>1小时前</span>
          </div>
          <div class="right">
            <img
              src="https://pic1.zhimg.com/80/v2-8e77b2771314f674cccba5581560d333_xl.jpg?source=4e949a73"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
export default {
  name: "Question",
  components: { HeaderBar },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  padding: 0 16px;
  overflow-y: auto;
  .question-item {
    padding: 16px 0;
    p {
      font-size: 16px;
      padding-bottom: 5px;
    }
    span {
      font-size: 12px;
      color: #999;
      margin-right: 10px;
      display: inline-block;
      margin-top: 5px;
    }
    .content {
      display: flex;
      .left {
        width: 67%;
        padding-right: 16px;
      }
      .right {
        width: 33%;
        img {
          width: 100%;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>