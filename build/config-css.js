const css = {
  loaderOptions: {
    // 给 sass-loader 传递选项
    sass: {
      data: `@import "~Src/styles/css/style.scss";`,
    },
  },
};

module.exports = css;
