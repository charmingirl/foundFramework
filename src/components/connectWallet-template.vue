<template>
  <div class="flex-between connectBoxStyle">
    <div class="flex">
      <img style="width: 27px;height: 27px;margin-right: 6px"
           src="https://fibochain.s3-ap-east-1.amazonaws.com/0/M4AQYqzYnzYgjl1JvOBuazGkd_mk.png" alt=""/>
      <span class="logoStyle">{{ MOKOM }}</span>
    </div>
    <button-self @click="ConnectWallet" :width="100" :height="35">
      <span v-if="address" style="font-size: 12px">{{ address | mobileHidden(6, 6) }}</span>
      <span v-else style="font-size: 12px">{{ connect }}</span>
    </button-self>

  </div>
</template>

<script>
import {Local, logoutDel} from '../utils/tools'
import Vue from 'vue';
import {Button,Dialog} from 'vant';
import ButtonSelf from "@/components/Button-self";
import {isConvertMainAddr} from "@/utils/fbAddress";

// 全局注册
Vue.use(Dialog)
Vue.use(Button);
let ShowWalletList = 'showWalletList'
export default {
  name: "connectWallet-template",
  components: {ButtonSelf},
  data() {
    return {
      MOKOM: '',
      address: '',
      connect: '连接钱包',
      ShowWalletList,
    }
  },
  created() {
    let currentEnv = process.env.NODE_ENV.trim();
    let address = Local.get(this.$globalData._fbAddress)
    if (currentEnv == this.$globalData._devServe) {
      address = 'fb1sw22xr4r3s33vnghseglh8rvsfkcp95k5643wt'
    }
    address && this.setAddress(address)
    window.getAddress = (msg) => {
      logoutDel();
      if (msg.startsWith("fb")) {
        this.setAddress(msg)
      } else {
        this.$toast.fail('连接地址错误')
      }
    };
    this.MOKOM = this.$globalData._MOKOM

  },
  methods: {
    //  连接钱包
    ConnectWallet() {
      if (Local.get(this.$globalData._fbAddress) || Local.get(this.$globalData._ethAddress)) {
        console.log('已连接过钱包')
        Dialog.confirm({
          title: '确认退出',
          message: '是否确认退出地址',
        })
            .then(() => {
              // on confirm
              logoutDel();
              this.setAddress('')
              this.$emit('loginOut')
            })
            .catch(() => {
              // on cancel

            });

      } else {
        uni.postMessage({
          data: {
            action: ShowWalletList,
          },
        });
      }
    },
    setAddress(msg) {
      Local.set(this.$globalData._fbAddress, msg)
      this.address = msg
      let ethAddress = isConvertMainAddr(msg)
      if(!ethAddress){
        return this.$toast('转换地址失败')
      }
      Local.set(this.$globalData._ethAddress, ethAddress);
      this.$emit('showRouteView')
    }
  }
}
</script>

<style lang="less">
.connectBoxStyle {
  width: 100%;
  margin-bottom: 24px;

  .logoStyle {
    color: #000;
    font-weight: 500;
  }
}
</style>