const pages = require("./build/config-page");
const devServer = require("./build/config-dev-server");
const configWebpack = require("./build/config-webpack");
const css = require("./build/config-css");
// const env = process.env.NODE_ENV;
module.exports = {
  publicPath: "./",
  outputDir: process.env.outputDir,
  assetsDir: "./static",
  devServer: devServer,
  css: css,
  pages: pages,
  configureWebpack: configWebpack,
  // chainWebpack: (config) => {
  //   if (env === "development") {
  //     config
  //       .plugin("webpack-bundle-analyzer")
  //       .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
  //   }
  // },
};
