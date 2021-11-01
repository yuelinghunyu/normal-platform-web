<template>
  <div id="app">
    <app-page></app-page>
  </div>
</template>
<script>
/**
 * @author dajun.jiang
 * @description 蔚站2.0入口
 */
// 引用组件
import AppPage from "Src/components/page/index.vue";
import { pageReload } from "Src/plugin/utils";
export default {
  name: "App",
  components: {
    AppPage,
  },
  created() {
    pageReload();
  },
};
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  max-width: 562.5px;
  margin: 0 auto;
  position: relative;
}
</style>
