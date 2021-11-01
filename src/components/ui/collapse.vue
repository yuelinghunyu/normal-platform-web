<template>
  <div class="custom-collapse">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "CustomCollapse",
  model: {
    prop: "activeName",
    event: "change",
  },
  props: {
    activeName: {
      type: [String, Array],
      default: () => {
        return [];
      },
      require: false,
    },
  },
  watch: {
    activeName: {
      handler() {
        this.$emit("change", this.activeName);
      },
      deep: true,
    },
  },
};
</script>
