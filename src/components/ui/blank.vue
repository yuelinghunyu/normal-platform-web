<template>
  <div class="custom-blank">
    <van-image width="120" height="120" :src="loading" />
  </div>
</template>
<script>
export default {
  name: "CustomBlank",
  data() {
    return {
      loading: require("Styles/image/blank.png"),
    };
  },
};
</script>
<style lang="scss" scoped>
.custom-blank {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
