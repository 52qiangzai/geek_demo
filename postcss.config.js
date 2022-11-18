// css后处理器使用配置文件
module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 改为设计稿的视口宽度
    },
  },
};
