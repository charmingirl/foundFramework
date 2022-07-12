<template>
  <van-field clearable type="number" @input="onInput" v-model="value" :placeholder="placeholder">
    <span @click="click" style="font-size: 14px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 600;
color: #6DB5FB;" slot="right-icon">全部</span>
  </van-field>
</template>

<script>
import Vue from 'vue';
import {Field} from 'vant';

Vue.use(Field);
export default {
  name: "filed-template",
  props: {
    placeholder: {
      type: String,
      default: "请输入"
    },
    balance: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input',value)
    },
    click() {
      this.balance && (this.value = this.balance)
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.van-cell {
  margin-top: 9px;
  padding: 0 16px;
  width: 319px;
  height: 51px;
  line-height: 51px;
  background: #F6F6F6;
  border-radius: 12px;
}

/deep/.van-field__body {
  font-weight: 600;
}
</style>