import request from "@/utils/request";

// 获取文章评论
// type  评论类型, 只能是'a'或'c', 'a'代表对文章的评论列表, 'c'代表对评论的回复列表   a -> 文章id  c-> 评论id
// source  文章id或评论id, 如果type为'a'这里传递文章id, 如果type为'c'这里传评论id
// offset  偏移量id(评论id), 值为评论id, 偏移量, 表示告诉后台从此id往后返回数据给前端, 做加载更多效果
// limit  获取评论数量, 不传, 默认后台返回10条
export const reqArticleComment = (type, source, limit = 10) => {
  return request.get("/v1_0/comments", {
    params: {
      type,
      source,
      limit,
    },
  });
};
