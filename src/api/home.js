import request from "@/utils/request";

// 获取所有频道信息
export const reqAllChannels = () => {
  return request.get("/v1_0/channels");
};

// 获取当前频道文章
export const reqAllArticlesById = ({ channel_id, timestamp }) => {
  return request.get("/v1_0/articles", {
    params: {
      channel_id,
      timestamp,
    },
  });
};
