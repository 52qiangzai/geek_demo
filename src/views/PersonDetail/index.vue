<template>
  <div>
    <HeaderBar />
    <van-cell value="内容" is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">单元格</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { reqUserProfile } from "@/api/user";
import HeaderBar from "@/components/HeaderBar";
export default {
  name: "PersonDetail",
  components: { HeaderBar },
  data() {
    return {
      userProfile: {},
    };
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      let { data, message } = await reqUserProfile();
      if (message === "OK") this.userProfile = data;
    },
  },
};
</script>
<style lang="less" scoped>
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}

</style>