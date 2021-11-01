<template>
  <div style="display: none">
    <slot />
  </div>
</template>

<script>
export default {
  name: "CustomTab",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    name: {
      type: Number,
      default: 0,
    },
  },
};
</script>
