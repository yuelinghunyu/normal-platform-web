<template>
  <div class="custom-loading">
    <van-image width="42" height="10" :src="loading" />
  </div>
</template>
<script>
export default {
  name: "CustomLoading",
  data() {
    return {
      loading: require("Styles/image/loading.gif"),
    };
  },
};
</script>
<style lang="scss" scoped>
.custom-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
