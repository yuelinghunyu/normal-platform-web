<template>
  <div class="custom-tabs">
    <div class="custom-tabs-wrapper">
      <ul v-tabScroll ref="tablist" class="custom-tabs-scroll scrollbar">
        <li
          v-for="(tab, key) in getTabSlots.tabProps"
          :key="key"
          class="custom-tabs-item"
          @click="clickHandler(tab, tab.name)"
          :data-name="tab.name"
        >
          <span
            class="custom-tabs-item--span"
            :class="{
              'custom-tabs-item--span__active': index === tab.name,
            }"
            >{{
              $i18n.locale === "zh-CN" ? tab.item.name : tab.item.nameEn
            }}</span
          >
        </li>
        <div
          class="tab--line custom-tabs-item--inline"
          style="left: -100%"
        ></div>
      </ul>
    </div>
    <div ref="tabpanel">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomTabs",
  model: {
    prop: "active",
    event: "change",
  },
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  directives: {
    tabScroll(el, binding, event) {
      const vue = event.context;
      el.onclick = () => vue.changeHandler(el);
      setTimeout(el.onclick, 500);
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    clickHandler(tab, name) {
      this.index = name;
      this.$emit("change", this.index);
      this.$emit("click", {
        ...tab,
      });
    },
    changeHandler(el) {
      const elW = el.clientWidth;
      const liList = el.querySelectorAll("li");
      const curEl = Array.from(liList).find((li) => {
        return Number(li.dataset.name) === this.index;
      });
      const childW = curEl.clientWidth;
      const offsetLeft = curEl.offsetLeft;
      const pres = el.querySelector("div.tab--line");
      const left = offsetLeft - (elW - childW) / 2;
      el.scrollLeft = left;
      const presW = pres.clientWidth;
      pres.style.left = left + (elW - childW) / 2 + (childW - presW) / 2 + "px";
    },
  },
  computed: {
    getTabSlots() {
      const slots = this.$slots.default;
      if (!slots) return;
      const arr = [];
      const tabProps = [];
      for (let i = 0; i < slots.length; i++) {
        if (slots[i].tag) {
          const cmpName = slots[i].tag.split("-")[
            slots[i].tag.split("-").length - 1
          ];
          if (cmpName === "CustomTab") {
            arr.push(slots[i]);
            tabProps.push(slots[i].componentOptions.propsData);
          }
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$slots.default = arr;
      return {
        tabProps,
        slots: arr,
      };
    },
  },
  watch: {
    active: {
      handler() {
        this.index = this.active;
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-tabs {
  background-color: rgba(255, 255, 255, 1);
}
.custom-tabs-wrapper {
  @include size(100%, 0.45rem);
  overflow: hidden;
}
.custom-tabs-scroll {
  display: flex;
  height: 0.45rem;
  position: relative;
  z-index: 0;
  overflow: hidden;
  overflow-x: auto;
  scroll-behavior: smooth;
}
.custom-tabs-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  position: relative;
  z-index: 0;
  cursor: pointer;
  font-size: 0.14rem;
  flex-shrink: 0;
}
// fs-28 color-f
.custom-tabs-item--span {
  font-size: 0.16rem;
  color: $normal-color;
  font-weight: 500;
}
.custom-tabs-item--span__active {
  font-size: 0.18rem;
  color: #040b29;
}
// tab--line transition-300 width-50 height-5 bg-edit posi-a b0
.custom-tabs-item--inline {
  transition: all 0.3s;
  width: 0.16rem;
  height: 0.02rem;
  background-color: #00bcbc;
  position: absolute;
  z-index: 0;
  bottom: 0;
}
/*修改滚动条样式*/
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
