const devServer = {
  proxy: {
    "/": {
      // 测试接口
      target: "http://****:8001",
      changeOrigin: true,
      pathRewrite: {
        "^/": "/",
      },
    },
  },
};

module.exports = devServer;
