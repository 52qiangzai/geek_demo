import request from "@/utils/request";

// 根据文章id获取文章详情
export const reqArticleDetail = (article_id) => {
  return request.get(`/v1_0/articles/${article_id}`);
};

// 根据id关注作者
export const reqFollowings = (author_id) => {
  return request.post("/v1_0/user/followings", { target: author_id });
};

// 根据id取消关注作者
export const reqCancelFollowings = (author_id) => {
  return request.delete(`/v1_0/user/followings/${author_id}`);
};

// 文章点赞
export const reqLikeArticle = (article_id) => {
  return request.post(`/v1_0/article/likings`, { target: article_id });
};

// 文章取消点赞
export const reqCancelLikeArticle = (article_id) => {
  return request.delete(`/v1_0/article/likings/${article_id}`);
};

// 文章举报
export const reqArticleReport = ({ target, type, remark }) => {
  return request.post("/v1_0/article/reports", { target, type, remark });
};

// 文章不感兴趣
export const reqUninterestedArticle = (article_id) => {
  return request.post("/v1_0/article/dislikes", {
    target: article_id,
  });
};

// 文章收藏
export const reqArticleCollections = (article_id) => {
  return request.post("/v1_0/article/collections", {
    target: article_id,
  });
};

// 文章取消收藏
export const reqArticleCancelCollections = (article_id) => {
  return request.delete(`/v1_0/article/collections/${article_id}`);
};

// 用户阅读历史
export const reqUserReadHistory = ({ page, per_page }) => {
  return request.get(`/v1_0/user/histories`, {
    params: {
      page,
      per_page,
    },
  });
};

// 获取用户收藏列表
export const reqUserCollections = ({ page, per_page }) => {
  return request.get(`/v1_0/article/collections`, {
    params: {
      page,
      per_page,
    },
  });
};
