<template>
  <div>
    <van-nav-bar
      :title="`编辑${userProfile.k}`"
      right-text="提交"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="message"
      rows="1"
      autosize
      :label="userProfile.k"
      type="textarea"
      :placeholder="`请输入${userProfile.k}`"
    />
  </div>
</template>

<script>
export default {
  name: "EditPage",
  props: {
    userProfile: Object,
  },
  data() {
    return {
      message: this.userProfile.v,
    };
  },
  methods: {
    onClickLeft() {
      this.$emit("closeEditPage", false);
    },
    onClickRight() {
      if (this.message.trim() === "" || this.message === null) {
        return this.$toast.fail("输入内容不能为空");
      }
      this.$emit("submitEditPage", [this.userProfile.k, this.message]);
    },
  },
};
</script>
<style lang="less" scoped>
</style>