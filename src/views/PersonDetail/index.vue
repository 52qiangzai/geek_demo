<template>
  <div class="infoContainer">
    <HeaderBar />
    <div class="info1">
      <van-cell-group>
        <!-- 头像 -->
        <van-cell is-link title="头像" @click="show = true">
          <template #default>
            <span class="custom-title">
              <van-image
                round
                width="25px"
                height="25px"
                :src="userProfile.photo"
                fit="cover"
              />
            </span>
          </template>
        </van-cell>
        <!-- 昵称 -->
        <van-cell is-link title="昵称">
          <template #default>
            <span class="custom-title">{{ userProfile.name }}</span>
          </template>
        </van-cell>
        <!-- 简介 -->
        <van-cell is-link title="简介">
          <template #default>
            <span class="custom-title">{{ userProfile.intro }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="info2">
      <van-cell-group>
        <!-- 性别 -->
        <van-cell is-link title="性别" @click="showSex = true">
          <template #default>
            <span class="custom-title">{{
              userProfile.gender === 0 ? "男" : "女"
            }}</span>
          </template>
        </van-cell>
        <!-- 生日 -->
        <van-cell is-link title="生日">
          <template #default>
            <span class="custom-title">{{ userProfile.birthday }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 上传图片 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @cancel="onCancel"
      @select="onSelectHead"
    />
    <input
      type="file"
      ref="headUpload"
      @change="clickUpload"
      style="display: none"
    />
    <!-- 编辑性别 -->
    <van-action-sheet
      v-model="showSex"
      :actions="actionsSex"
      cancel-text="取消"
      @cancel="onCancel"
      @select="onSelectSex"
    />
  </div>
</template>

<script>
import {
  reqUserProfile,
  reqUserBaseInfo,
  reqUploadUserHead,
  reqUpdateUserProfile,
} from "@/api/user";
import HeaderBar from "@/components/HeaderBar";
export default {
  name: "PersonDetail",
  components: { HeaderBar },
  data() {
    return {
      userProfile: {},
      show: false,
      showSex: false,
      actions: [{ name: "拍照" }, { name: "本地选择" }],
      actionsSex: [{ name: "男" }, { name: "女" }],
    };
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    // 获取用户信息
    async getUserProfile() {
      let res1 = await reqUserProfile();
      let res2 = await reqUserBaseInfo();
      if (res1.message === "OK") {
        this.userProfile = res1.data;
        this.userProfile.intro = "未填写";
      }
      if (res2.message === "OK" && res2.data.intro)
        this.userProfile.intro = res2.data.intro;
    },
    onCancel() {
      this.$toast.fail("取消更改");
    },
    // 上传头像处理函数
    onSelectHead(action, index) {
      this.$refs.headUpload.click();
    },
    onSelectSex(action, index) {
      console.log(index);
    },
    // 更新用户信息函数
    async updateUserInfo(objInfo) {
      try {
        const { message } = await reqUpdateUserProfile(objInfo);
        if (message === "OK") {
          this.$toast.success("用户信息更新成功");
          this.getUserProfile();
        }
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
    // 上传图片函数
    async clickUpload({ target: { files } }) {
      const fileData = new FormData();
      fileData.append("photo", files.item(0));
      try {
        const { message, data } = await reqUploadUserHead(fileData);
        if (message === "OK") {
          this.userProfile.photo = data.photo;
          this.$toast.success("上传成功");
          this.show = false;
        }
      } catch (error) {
        this.$toast.fail("上传失败");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}
.infoContainer {
  height: 100vh;
  background-color: #f8f8f8;
  .info2 {
    margin-top: 15px;
  }
}
</style>