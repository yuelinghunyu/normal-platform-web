const argv = process.argv;
// 去最后一个值
const md = argv[argv.length - 1];
console.log(md);
process.env.VUE_APP_MODULE = md;
const pages = {
  index: {
    entry: "src/main.js",
    template: "public/index.html",
    filename: "index.html",
    title: "蔚站",
    chunks: ["chunk-vendors", "chunk-common", "index"],
  },
};

module.exports = pages;
