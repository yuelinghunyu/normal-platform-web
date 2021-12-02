const css = {
  loaderOptions: {
    // 给 sass-loader 传递选项
    sass: {
      data: `@import "~Styles/css/style.scss";`,
    },
  },
};

module.exports = css;
