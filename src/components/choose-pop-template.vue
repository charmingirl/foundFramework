<template>
  <!--          币种选择-->
  <van-popup @close="hidePop" class="flex-col" v-model="show" closeable :round="true">
    <h2 class="margin_bottom_27 flex">
      <slot name="title"/>
    </h2>
    <div class="choiceItem flex" @click="onClick(v,i)" :class="{chooseStyle:currentIndex == i}" v-for="(v,i) in data">
      <img style="width: 20px;margin-right: 5px" :src="v.icon" alt="">
      {{ v.symbol }}
    </div>
  </van-popup>
</template>

<script>
import Vue from 'vue';
import {Popup} from 'vant';
import ButtonSelf from "@/components/Button-self";
import CopySelf from "@/components/copy-self";

Vue.use(Popup);
export default {
  name: "choose-pop-template",
  components: {CopySelf, ButtonSelf},
  props: {
    data: {
      type: Array,
      default: () => [{
        'icon': 'https://www.fibonacci-chain.com/icons/fibo.png',
        'symbol': 10,
        address:'fb123...456'
      }, {'icon': 'https://www.fibonacci-chain.com/icons/fibo.png', 'symbol': 10}]
    },
    show: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      currentItem: '',
      currentIndex: -1
    }
  },
  methods: {
    onClick(item, index) {
      this.$emit('onSelect', JSON.parse(JSON.stringify(item)))

    },
    hidePop(){
      this.$emit('hidePop')
    },
  }
}
</script>

<style scoped lang="less">
.van-popup--center {
  padding: 14px 8px;
  width: 343px;
  height: 185px;
  background: #FFFFFF;
  box-shadow: 0px 2px 10px 0px rgba(212, 212, 212, 0.2);
  border-radius: 12px;
}

.choiceItem {
  width: 100%;
  height: 42px;
  background: #F8F9FA;
  border-radius: 5px;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 6px;
}

.chooseStyle {
  border: 1px solid #027BFF;
}
</style>