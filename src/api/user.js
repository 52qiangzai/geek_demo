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
