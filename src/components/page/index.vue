<template>
  <div class="app-page">
    <router-view></router-view>
  </div>
</template>
<script>
/**
 * @author dajun.jiang
 * @description 各个模块页面入口，非首页入口
 */
export default {
  name: "AppPage",
};
</script>
<style lang="scss" scoped>
.app-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
