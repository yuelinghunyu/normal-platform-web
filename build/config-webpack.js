const env = process.env.NODE_ENV;
const path = require("path");
const configWebpack = {
  devtool: env === "development" || env === "test" ? "source-map" : "",
  resolve: {
    alias: {
      Src: path.resolve(__dirname, "../src/"),
      App: path.resolve(__dirname, "../app/"),
      Modules: path.resolve(__dirname, "../modules/"),
      Plugin: path.resolve(__dirname, "../plugin/"),
      Styles: path.resolve(__dirname, "../styles/"),
      Store: path.resolve(__dirname, "../store/"),
      Http: path.resolve(__dirname, "../http/"),
      Extends: path.resolve(__dirname, "../extends/"),
      Mixins: path.resolve(__dirname, "../mixins/"),
    },
  },
};

module.exports = configWebpack;
