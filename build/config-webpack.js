const env = process.env.NODE_ENV;
const path = require("path");
const configWebpack = {
  devtool: env === "development" || env === "test" ? "source-map" : "",
  resolve: {
    alias: {
      Src: path.resolve(__dirname, "../src/"),
    },
  },
};

module.exports = configWebpack;
