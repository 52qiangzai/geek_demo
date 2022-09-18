<template>
  <div>
    <router-view></router-view>
    <FooterBar />
  </div>
</template>

<script>
import FooterBar from "@/components/FooterBar";
export default {
  name: "Layout",
  components: { FooterBar },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
</style>