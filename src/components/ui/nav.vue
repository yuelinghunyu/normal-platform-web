<template>
  <ul class="custom-nav">
    <li
      v-for="(chapter, chapterIndex) in chapterList"
      :key="chapter.classifyName.id"
      class="custom-nav-item"
      ref="navItem"
      @click.stop="handleChapterEvent(chapterIndex)"
    >
      <i class="custom-nav-item__tag" v-if="chapter.newFlag"></i>
      <span class="custom-nav-item__title">
        {{
          $i18n.locale === "zh-CN"
            ? chapter.classifyName.nameCn
            : chapter.classifyName.nameEn
        }}
      </span>
    </li>
  </ul>
</template>
<script>
import { addClass, removeClass } from "yuelinghunyu-common-plugin";
export default {
  name: "CustomNav",
  props: ["chapterList"],
  mounted() {
    this.handleChapterEvent(this.getIndex());
  },
  data() {
    return {
      currentId: null,
      lastIndex: null,
    };
  },
  methods: {
    getIndex() {
      const id = this.$route && Number(this.$route.query.id);
      if (id === -1) return 0;
      else {
        const index = this.chapterList.findIndex((chapter) => {
          return chapter.classifyName.id === id;
        });
        if (index > -1) return index;
        else return 0;
      }
    },
    resetClassName(navDoms) {
      navDoms.forEach((dom) => {
        removeClass(dom, "custom-nav-item__prev");
        removeClass(dom, "custom-nav-item__active");
        removeClass(dom, "custom-nav-item__next");
      });
    },
    handleChapterEvent(index) {
      if (this.lastIndex === index) return;
      this.lastIndex = index;
      const navDoms = this.$refs.navItem;
      const preIndex = index > 0 ? index - 1 : null;
      const nextIndex = index < this.chapterList.length - 1 ? index + 1 : null;
      this.resetClassName(navDoms);
      this.currentId = this.chapterList[index].classifyName.id;
      if (preIndex !== null) {
        addClass(navDoms[preIndex], "custom-nav-item__prev");
      }
      addClass(navDoms[index], "custom-nav-item__active");
      if (nextIndex !== null) {
        addClass(navDoms[nextIndex], "custom-nav-item__next");
      }
      this.$router.replace({
        path: "/home/xiao-wei/chapter",
        query: {
          id: this.currentId,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-nav {
  @include flex-column;
  &-item {
    width: 100%;
    padding: 0.14rem 0.08rem;
    @include flex-justify-row-center;
    @include set-font(0.12rem, #8d8d8f, 0.19rem);
    background-color: #f0f0f2;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
    span {
      @include word-break;
      @include text-ellipsis-row(2);
    }
    &__prev {
      border-radius: 0 0 0.08rem 0;
    }
    &__active {
      background-color: #fff;
    }
    &__next {
      border-radius: 0 0.08rem 0 0;
    }
    &__tag {
      font-style: normal;
      position: absolute;
      display: flex;
      @include size(0.04rem, 0.04rem);
      background-color: #ff221e;
      right: 0.1rem;
      top: 0.1rem;
      border-radius: 50%;
    }
  }
}
</style>
