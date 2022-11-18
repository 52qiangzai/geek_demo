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
        <van-cell
          is-link
          title="昵称"
          @click="showEditPageHandler('昵称', userProfile.name)"
        >
          <template #default>
            <span class="custom-title">{{ userProfile.name }}</span>
          </template>
        </van-cell>
        <!-- 简介 -->
        <van-cell
          is-link
          title="简介"
          @click="showEditPageHandler('简介', userProfile.intro)"
        >
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
        <van-cell is-link title="生日" @click="showBirthday = true">
          <template #default>
            <span class="custom-title">{{ userProfile.birthday }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="layout" @click="userLayout">
      <van-button type="primary" block>退出登录</van-button>
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
    <!-- 编辑生日 -->
    <van-action-sheet v-model="showBirthday">
      <div class="content">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showBirthday = false"
          @confirm="onConfirmBirthday"
        />
      </div>
    </van-action-sheet>

    <van-popup
      v-model="showEditPage"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <div class="edit-container">
        <EditPage
          @closeEditPage="closeEditPage"
          :userProfile="isClickObj"
          @submitEditPage="submitEditPage"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { removeToken } from "@/utils/token";
import EditPage from "@/views/PersonDetail/EditPage";
import {
  reqUserProfile,
  reqUserBaseInfo,
  reqUploadUserHead,
  reqUpdateUserProfile,
} from "@/api/user";
import HeaderBar from "@/components/HeaderBar";
import dayjs from "dayjs";
export default {
  name: "PersonDetail",
  components: { HeaderBar, EditPage },
  data() {
    return {
      userProfile: {},
      show: false,
      showSex: false,
      showBirthday: false,
      actions: [{ name: "拍照" }, { name: "本地选择" }],
      actionsSex: [{ name: "男" }, { name: "女" }],
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      showEditPage: false,
      isClickObj: {},
    };
  },
  mounted() {
    this.getUserProfile();
  },

  computed: {
    currentDate: {
      get() {
        return dayjs(this.userProfile.birthday).toDate();
      },
      set(value) {},
    },
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
    // 更改性别
    onSelectSex(action, index) {
      // console.log(index);
      this.userProfile.gender = index;
      this.updateUserInfo(this.userProfile);
      this.showSex = false;
    },
    // 更改生日
    onConfirmBirthday(value) {
      this.userProfile.birthday = dayjs(value).format("YYYY-MM-DD");
      this.updateUserInfo(this.userProfile);
      this.showBirthday = false;
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
        this.show = false;
        const { message, data } = await reqUploadUserHead(fileData);
        if (message === "OK") {
          this.userProfile.photo = data.photo;
          this.$toast.success("上传成功");
        }
      } catch (error) {
        this.$toast.fail("上传失败");
      }
    },
    // 展示信息页
    showEditPageHandler(name, value) {
      console.log(name, value);
      this.isClickObj = { k: name, v: value };
      this.showEditPage = true;
    },
    // 关闭信息页
    closeEditPage(v) {
      this.showEditPage = v;
    },
    // 提交编辑
    submitEditPage(v) {
      const [a, b] = v;
      if (a === "昵称") {
        this.userProfile.name = b;
      } else {
        this.userProfile.intro = b;
      }
      this.updateUserInfo(this.userProfile);
      this.showEditPage = false;
    },
    //退出登录
    userLayout() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "是否确定退出登录？",
        })
        .then(() => {
          removeToken();
          this.$toast.success("退出成功");
          this.$router.push({ name: "login" });
        })
        .catch(() => {
          this.$toast.fail("已取消退出");
        });
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
.content {
  padding: 16px 16px;
}
.layout {
  width: 100vw;
  position: fixed;
  bottom: 5px;
}
</style>