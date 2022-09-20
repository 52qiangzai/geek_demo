import request from "@/utils/request";

// 根据文章id获取文章详情
export const reqArticleDetail = (article_id) => {
  return request.get(`/v1_0/articles/${article_id}`);
};
