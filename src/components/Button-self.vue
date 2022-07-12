<template>
    <!--  :style="{height:height + 'px',width:width + 'px'}"-->
    <van-button type="info" :style="{lineHeight:height + 'px',height:height + 'px',width:width + 'px' , fontSize:fontSize + 'px',marginTop:marginTop + 'px'}"
                :disabled="disabled" :loading-text="loadingText"
                :loading="loading" @click="onClick">
      <slot/>
    </van-button>

</template>

<script>
import Vue from 'vue';
import {Button} from 'vant';

Vue.use(Button);
export default {
  name: "Button-self",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '上链中',
    },
    height: {
      type: Number,
      default: 40,
    },
    width: {
      type: Number,
      default: 319,
    },
    fontSize: {
      type: Number,
    },
    marginTop: {
      type: Number,
    },
  },
  methods: {
    onClick() {
      this.$emit("click")
    }
  }
}
</script>

<style lang="less">
.van-button--info {
  border: none;
  border-radius: 6px;
  background: linear-gradient(122deg, #BF79FF 0%, #67BBFB 100%)!important;
}

</style>