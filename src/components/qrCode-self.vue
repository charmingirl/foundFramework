<template>
  <div class="codeSelfStyle">
    <vue-qr
        :logo-src="logoSrc"
        :margin="0"
        :auto-color="true"
        :dot-scale="1"
        :text="qrcodeUrl"
        colorDark="white"
        colorLight="black"
    />
  </div>
</template>

<script>
import VueQr from "vue-qr";

export default {
  // 组件名称
  name: "qrCode-self",
  // 组件参数 接收来自父组件的数据
  props: {
    qrcodeUrl: {
      type: String,
      default: "http://www.baidu.com",
    },
  },
  // 局部注册的组件
  components: {VueQr},
  // 组件状态值
  data() {
    return {
      logoSrc: "",
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {
  },
};
</script>

<style scoped lang="less">
.codeSelfStyle {
  width: 100%;
  height: auto;
  margin: auto;
}
</style>