const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        // less 的全局变量
        globalVars: {
          "geek-color": "#FC6627",
          "geek-gray-color": "#F7F8FA",
        },
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://geek.itheima.net",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
