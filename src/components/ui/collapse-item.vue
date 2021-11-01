<template>
  <div class="custom-collapse-item">
    <div class="custom-collapse-item-header" @click.stop="handleCollapseEvent">
      <slot name="header"></slot>
    </div>
    <div class="custom-collapse-item-content" v-if="show">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomCollapseItem",
  props: {
    name: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    if (this.$parent.activeName && this.$parent.activeName.includes(this.name))
      this.show = true;
    else this.show = false;
  },
  methods: {
    handleCollapseEvent() {
      this.show = !this.show;
      if (this.show)
        this.$parent.activeName && this.$parent.activeName.push(this.name);
      else {
        const index =
          this.$parent.activeName &&
          this.$parent.activeName.findIndex((activeName) => {
            return activeName === this.name;
          });
        this.$parent.activeName && this.$parent.activeName.splice(index, 1);
      }
    },
  },
};
</script>
