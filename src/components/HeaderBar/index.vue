<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()">
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
    onClickLeft() {
      $router.back();
    },
  },
};
</script>
<style lang="less" scoped>
</style>