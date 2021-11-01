const devServer = {
  proxy: {
    "/weiH5Api": {
      // 测试接口
      target: "http://10.112.32.223:8001",
      changeOrigin: true,
      pathRewrite: {
        "^/weiH5Api": "/",
      },
    },
  },
};

module.exports = devServer;
