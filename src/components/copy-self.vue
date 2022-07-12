<template>
  <van-icon
    :size="size"
    color="#333"
    class="tag-read"
    :data-clipboard-text="value"
    @click="onCopy"
    name="description"
  />
</template>

<script>
import Clipboard from "clipboard";
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);
export default {
  name: "copy-self",
  props: {
    value: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "16px",
    },
  },
  methods: {
    onCopy() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", (e) => {
        this.$toast.success("复制成功");
        console.log("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
  },
};
</script>

<style scoped>
.tag-read{
  margin-left: 5px;
}
</style>