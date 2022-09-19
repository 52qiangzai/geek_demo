<template>
  <div class="loginContainer">
    <van-nav-bar
      class="header"
      left-arrow
      @click-left="$router.push({ name: 'home' })"
      :border="false"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        type="tel"
        label="手机号"
        placeholder="请输入手机号"
        :clearable="true"
        name="mobile"
        required
        :rules="[{ validator: validatorMobile, message: '手机号格式错误' }]"
        :error="isInput"
      />
      <van-field
        v-model="code"
        name="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请输入手机验证码' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="sendCode"
            native-type="button"
            :disabled="isSend"
            ref="sendCodeBtn"
          >
            <span v-show="!isSend">发送验证码</span>
            <span v-show="isSend">
              <van-count-down
                :time="time"
                :auto-start="false"
                ref="countDown"
                @finish="finish"
              >
                <template #default="timeData">
                  {{ timeData.seconds }}秒后获取
                </template>
              </van-count-down>
            </span>
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          block
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqUserLogin, reqSendCode } from "@/api/user";
import { setToken } from '@/utils/token';
export default {
  name: "Login",
  data() {
    return {
      isSend: false,
      mobile: "",
      code: "",
      time: 1000 * 60,
      isInput: false,
    };
  },
  methods: {
    // 发送登录请求
    async onSubmit(values) {
      try {
        let res = await reqUserLogin(values);
        if (res.message === "OK") {
          // 登录成功处理
          let jsonData = JSON.stringify(res.data)
          setToken(jsonData)
          // 路由跳转
          this.$router.push({name:'me'})
        }
      } catch (error) {
        return this.$toast.fail("手机号或验证码格式不正确");
      }
    },
    // 校验手机号
    validatorMobile(val) {
      return /^1[3-9][0-9]{9}$/.test(val);
    },
    // 发送手机验证码
    async sendCode() {
      if (this.validatorMobile(this.mobile)) {
        this.isSend = true;
        this.$refs.countDown.start();
        try {
          let res = await reqSendCode(this.mobile);
          if (res.message === "OK") return this.$toast.success("短信发送成功");
        } catch (error) {
          return this.$toast.fail("发送验证码过于频繁,请稍后之后再试");
        }
      } else {
        this.isInput = true;
      }
    },
    // 计时完成后
    finish() {
      this.isSend = false;
      this.$refs.countDown.reset();
    },
  },
};
</script>
<style lang="less" scoped>
.loginContainer {
  .header {
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  }
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  form {
    width: 100%;
    // height: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  }
}
</style>