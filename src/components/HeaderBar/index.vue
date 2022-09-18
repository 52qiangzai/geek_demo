<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #title> {{ title }} </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    this.title = this.$route.meta.title;
  },
  methods: {
    onClickLeft() {},
  },
};
</script>
<style lang="less" scoped>
</style>