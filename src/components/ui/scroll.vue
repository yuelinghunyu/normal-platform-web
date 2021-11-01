<template>
  <div
    class="custom-scroll"
    ref="scrollWrapper"
    @scroll.passive="handleScrollEvent"
  >
    <div class="custom-scroll-content" ref="scrollContent">
      <!-- 下拉刷新 -->
      <div class="custom-scroll--pull-down" v-if="isPullDown">
        <div class="custom-scroll--pull-down__icon" v-show="beforePullDown">
          {{ pullDownText }}
        </div>
        <div class="custom-scroll--pull-down__loading" v-show="!beforePullDown">
          loading
        </div>
      </div>
      <!-- slot列表内容 -->
      <slot></slot>
      <!-- 上拉加载 -->
      <div class="custom-scroll--pull-up" v-if="isPullUp">
        {{ pullUpText }}
      </div>
    </div>
  </div>
</template>
<script>
import { calcRem, getTransfrom } from "Plugin/utils";
const pulldownHeight = 60; // 下拉刷新临界点
const pulldownTop = 40; // 进入下拉刷新位移top
const moveCount = 200; // 下拉位移系数
export default {
  name: "CustomScroll",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    triggerHeight: {
      type: [Number, String],
      default: 200,
    },
    top: {
      type: [Number, String],
      default: 0,
    },
    bottom: {
      type: [Number, String],
      default: 0,
    },
    isPullDown: {
      type: Boolean,
      default: false,
    },
    isPullUp: {
      type: Boolean,
      default: false,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      beforePullDown: true,
      isRefreshEnd: null, // 是否下拉刷新完成
      joinRefresh: null, // 进入下拉刷新状态
      refreshFlag: 0, // 下拉刷新执行标志位
      translateY: 0, // 下拉位移Y值,
      pullDownText: "下拉刷新",
      pullUpText: "加载中...",
    };
  },
  mounted() {
    this.handleRefreshEvent();
    let { scrollContent } = this.$refs;
    scrollContent.addEventListener("touchstart", this.callbackTouchStart);
    scrollContent.addEventListener("touchmove", this.callbackTouchMove);
    scrollContent.addEventListener("touchend", this.callbackTouchEnd);
  },
  methods: {
    callbackTouchStart(e) {
      if (this.refreshFlag) return e.preventDefault();
      const target = e.changedTouches[0];
      this.firstOffsetY = target.clientY;
    },
    callbackTouchMove(e) {
      if (!this.isPullDown) return;
      if (!this.firstOffsetY) return;
      if (this.refreshFlag) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      let { scrollWrapper, scrollContent } = this.$refs;
      const target = e.changedTouches[0];
      if (scrollWrapper.scrollTop === 0) {
        const percentage =
          (target.clientY - this.firstOffsetY) / window.innerHeight;
        this.translateY = percentage * moveCount;
        // 下拉过程
        if (this.translateY > pulldownHeight) this.pullDownText = "松开刷新";
        else this.pullDownText = "下拉刷新";
        // 更新状态
        if (percentage > 0) {
          e.preventDefault();
          this.joinRefresh = true;
          scrollContent.style[
            getTransfrom()
          ] = `translate3d(0, ${this.translateY}px, 0)`;
        } else {
          if (this.joinRefresh === null) this.joinRefresh = false;
        }
      }
    },
    callbackTouchEnd(e) {
      if (this.translateY === 0) return;
      if (this.refreshFlag) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      // 松开进行刷新
      let { scrollContent } = this.$refs;
      if (this.translateY > pulldownHeight && this.joinRefresh) {
        this.beforePullDown = false;
        this.refreshFlag = 1; // 阻止再次触发的刷新事件
        scrollContent.style[
          getTransfrom()
        ] = `translate3d(0, ${pulldownTop}px, 0)`;
        scrollContent.style.transition = "all 0.3s linear";
        this.$emit("pullingDown");
      } else {
        if (this.joinRefresh) {
          this.refreshFlag = 1;
          this.handleRefreshedReset();
        }
      }
      this.translateY = 0;
      this.joinRefresh = null;
      this.firstOffsetY = null;
    },
    handleRefreshedReset() {
      let { scrollContent } = this.$refs;
      scrollContent.style[getTransfrom()] = `translate3d(0, 0, 0)`;
      if (!scrollContent.style.transition) {
        scrollContent.style.transition = "all 0.3s linear";
      }
      setTimeout(() => {
        this.refreshFlag = 0;
        this.isRefreshEnd = null;
        this.pullDownText = "下拉刷新";
        this.pullUpText = "加载中...";
        scrollContent.style.transition = null;
      }, 300);
    },
    handleRefreshEvent() {
      let { scrollWrapper } = this.$refs;
      scrollWrapper.style.height =
        window.innerHeight -
        parseInt(this.top * calcRem()) -
        parseInt(this.bottom * calcRem()) +
        "px";
      scrollWrapper.style.top = this.top * calcRem() + "px";
      scrollWrapper.style.bottom = this.bottom * calcRem() + "px";
    },
    handleScrollEvent(e) {
      const { scrollTop, offsetHeight } = e.target;
      const { scrollContent } = this.$refs;
      const scrollOffsetY =
        scrollTop || window.pageYOffset || document.body.scrollTop;
      const contentHeight = scrollContent.offsetHeight;
      this.$emit("onScroll", e, scrollOffsetY);
      if (!this.isPullUp) return;
      if (this.isFinished) return;
      if (contentHeight <= offsetHeight) return;
      const canScrollButtom =
        scrollOffsetY +
        offsetHeight -
        (contentHeight - parseInt(this.triggerHeight));

      // 触底加载
      if (canScrollButtom >= 0) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.timer = null;
          this.$emit("pullingUp", e, scrollOffsetY);
        }, 200);
      }
    },
    // 下拉刷新完成
    handleRefreshEnd() {
      this.beforePullDown = true;
      this.isRefreshEnd = true;
      this.pullDownText = "刷新成功";
      this.handleRefreshedReset();
    },
    // 滚动到指定坐标
    scrollTo(x, y) {
      let { scrollWrapper } = this.$refs;
      scrollWrapper.scrollTo(x, y);
    },
  },
  beforeDestroy() {
    let { scrollContent } = this.$refs;
    scrollContent.removeEventListener("touchmove", this.callbackTouchStart);
    scrollContent.removeEventListener("touchmove", this.callbackTouchMove);
    scrollContent.removeEventListener("touchend", this.callbackTouchEnd);
  },
  watch: {
    data() {
      // 下拉刷新完成监听data改变触发
      if (this.refreshFlag === 1) {
        this.handleRefreshEnd();
      }
    },
    isFinished: {
      handler() {
        if (this.isFinished) this.pullUpText = "没有更多了";
        else this.pullUpText = "加载中...";
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-scroll {
  width: 100%;
  position: absolute;
  @include scrolling;
  &::-webkit-scrollbar {
    display: none;
  }
  &--pull-down {
    position: fixed;
    top: -0.4rem;
    left: 0;
    right: 0;
    @include flex-justify-row-center;
    @include size(100%, 0.4rem);
    background-color: rgba(238, 238, 238, 0.8);
  }
  &--pull-up {
    @include size(100%, 0.3rem);
    @include flex-justify-row-center;
    @include set-font(0.12rem, $active-color, 0.2rem);
  }
}
</style>
