<template>
  <div class="custom-placeholder">
    <van-image
      class="custom-placeholder-icon"
      width="80%"
      height="80%"
      :src="placeholder"
    />
  </div>
</template>
<script>
export default {
  name: "CustomPlaceholder",
  data() {
    return {
      placeholder: require("Styles/image/nio.png"),
    };
  },
};
</script>
<style lang="scss" scoped>
.custom-placeholder {
  @include size(100%, 100%);
  position: relative;
  background-color: #f0f0f0;
  opacity: 0.5;
  &-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
