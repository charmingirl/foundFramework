<template>
  <div id="app">
    <connect-wallet-template @showRouteView="show = true" @loginOut="loginOut"></connect-wallet-template>
    <router-view v-if="show"/>
    <div v-else class="font_600 flex color_999">未连接钱包</div>
    <tabber-self v-show="isOriginHei" :tabber-list="tabberList"></tabber-self>
  </div>

</template>
<script>
import ConnectWalletTemplate from "@/components/connectWallet-template";
import {Local} from "@/utils/tools";
import TabberSelf from "@/components/tabber-self";
import {toWeiAmountFunc} from "@/web3/utils/contractCoinTranslateWei";

export default {
  components: {TabberSelf, ConnectWalletTemplate},
  data() {
    return {
      isOriginHei: true,
      screenHeight: document.documentElement.clientHeight, //此处也可能是其他获取方法
      originHeight: document.documentElement.clientHeight,
      show: false,
      tabberList: [{text: '映射', id: 0, router: '/'}, {text: '挖矿', id: 1, router: '/'}],
    }
  },
  created() {
    if (Local.get(this.$globalData._ethAddress)) {
      this.show = true
    }
  },
  mounted() {
    let self = this;
    window.onresize = function () {
      return (function () {
        self.screenHeight = document.documentElement.clientHeight;
      })()
    }
  },
  watch: {
    screenHeight(val) {
      if (this.originHeight > val + 100) { //加100为了兼容华为的返回键
        this.isOriginHei = false;
      } else {
        this.isOriginHei = true;
      }
    }
  },
  methods: {
    loginOut() {
      this.$toast('您已退出')
      this.show = false
    }
  }
}
</script>
<style>
#app {
  padding: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #F8F9FA;
  font-size: 14px;
}
</style>
