import request from "@/utils/request";

// 发送验证码接口

export const reqSendCode = (mobile) => {
  return request.get(`v1_0/sms/codes/${mobile}`);
};

// 用户登录
export const reqUserLogin = ({ mobile, code }) => {
  return request.post("/v1_0/authorizations", {
    mobile,
    code,
  });
};

// 获取用户信息
export const reqUserBaseInfo = () => {
  return request.get("/v1_0/user");
};

// 获取用户个人简介
export const reqUserProfile = () => {
  return request.get("/v1_0/user/profile");
};

// 更新用户信息
export const reqUpdateUserProfile = (objInfo) => {
  return request.patch("/v1_0/user/profile", objInfo);
};

// 上传用户头像
export const reqUploadUserHead = (file) => {
  return request.patch("/v1_0/user/photo", file);
};
