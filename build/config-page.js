const pages = {
  index: {
    entry: "src/main.js",
    template: "public/index.html",
    filename: "index.html",
    title: "移动端应用",
    chunks: ["chunk-vendors", "chunk-common", "index"],
  },
};

module.exports = pages;
