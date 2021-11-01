<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar" v-show="contenteditable"></div>
    <div ref="editor" class="text"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "EdiorView",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    contenteditable: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
    document
      .getElementsByClassName("w-e-text")[0]
      .removeAttribute("contenteditable");
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig.onchange = (html) => {
        this.$emit("change", html); // 将内容同步到父组件中
      };
      // 创建富文本编辑器
      this.editor.create();
      this.editor.$textElem.attr("contenteditable", this.contenteditable);
    },
  },
  watch: {
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
  },
};
</script>
