/**
 * @author dajun.jiang
 * @description 通过 keep-alive 组件缓存页面，toPathName 缓存，离开当前页面后就清除缓存
 */
const setKeepAlive = (pathName, toPathName, fromPathName, that) => {
  const keepAlive = that.$store.getters.getKeepAlive;
  const index = keepAlive.findIndex((name) => {
    return name === fromPathName;
  });
  if (pathName.indexOf(toPathName) > -1) {
    if (index === -1) {
      keepAlive.push(fromPathName);
      that.$store.commit("setKeepAlive", keepAlive);
    }
  } else {
    if (index > -1) {
      keepAlive.splice(index, 1);
      that.$store.commit("setKeepAlive", keepAlive);
    }
  }
};

export default setKeepAlive;
