<template>
  <div class="home">
    <div class="contentStyle">
      <tab-template @change="changeTab" :list="tabList">
        <div :slot="tabList[0].slot">
          <choose-button :fakeButton="true" :is-select="isSelectChannel" @click="onShowChannel" :title="'充值通道'"
                         :choose="chooseChannel"></choose-button>
          <choose-button :fakeButton="true" :src="chooseToken.url" :is-select="isSelectToken" @click="onShowToken"
                         :title="'充值币种'"
                         :choose="chooseToken.token || chooseToken||'--'"></choose-button>
          <template v-if="chooseChannel === 'FRC20'">

            <choose-button :balance="balance" @clickInput="clickAll" :show-input="true" @input="getValue"
                           :title="'充值数量'"></choose-button>
            <div class="flex">
              <button-self @click="onTransfer" :margin-top="16" :width="307">确定</button-self>

            </div>
          </template>

          <!--    地址-->
          <div v-if="chooseChannel !== 'FRC20' && chooseChannel !== '选择通道'" class="flex-col-center addressCodeBox">
            <span>扫一扫，向我充值</span>
            <div class="codeStyle">
              <qr-code-self :qrcodeUrl="chargeAddr"></qr-code-self>
            </div>
            <div class="flex-start-start addressStyle">
              <span style="width: 23%">充值地址：</span>
              <span style="width: 77%;" class="address-br">{{ chargeAddr }}               <copy-self
                  :value="chargeAddr"/>
</span>
            </div>
          </div>
          <!--          充值记录-->
          <div class="recordStyle">
            <title-template>充值记录</title-template>
            <record-item-template :len="chargeLen" :data="chargeList"></record-item-template>
          </div>
        </div>
        <div :slot="tabList[1].slot">
          <map-record-template :len="mapListLen" :data="mapRecordList"/>
        </div>
      </tab-template>
    </div>
    <choose-pop-template :data="tokenData" @onSelect="onSelectToken" @hidePop="tokenPop = false" :show="tokenPop">
      <span class="font_600" slot="title">币种选择</span>
    </choose-pop-template>
    <sheet-template @onSelect="onSelectChannel" @close="channelSheet = false" :show="channelSheet"
                    :actions="channelList"></sheet-template>

  </div>
</template>

<script>
// @ is an alias to /src


import ConnectWalletTemplate from "@/components/connectWallet-template";
import ButtonSelf from "@/components/Button-self";
import {Icon} from 'vant';
import Vue from 'vue'
import ChooseButton from "@/components/choose-button";
import TabTemplate from "@/components/tab-template";
import TabberSelf from "@/components/tabber-self";
import TitleTemplate from "@/components/title-template";
import RecordItemTemplate from "@/components/recordItem-template";
import ChoosePopTemplate from "@/components/choose-pop-template";
import CopySelf from "@/components/copy-self";
import SheetTemplate from "@/components/sheet-template";
import MapRecordTemplate from "@/components/mapRecord-template";
import {getChainInfo, getMapList, getRechargeInfo, getRechargeList, getToken, wssAddress,} from "@/request/request";
import {Balance, BalanceOf, sendTransaction} from '../web3/commonFunc'
import {mkCharge} from '../web3/contr711Func'
import {Local} from "@/utils/tools";
import QrCodeSelf from "@/components/qrCode-self";

Vue.use(Icon);

export default {
  name: 'HomeView',
  components: {
    QrCodeSelf,
    MapRecordTemplate,
    SheetTemplate,
    CopySelf,
    ChoosePopTemplate,
    RecordItemTemplate,
    TitleTemplate,
    TabberSelf,
    TabTemplate,
    ChooseButton,
    ButtonSelf,
    ConnectWalletTemplate
  },
  created() {
    this.ethAddress = Local.get(this.$globalData._ethAddress)
    this.fbAddress = Local.get(this.$globalData._fbAddress)
    this.initWebsocket()
    this.getChainInfo()
    this.getMainCoinBalance()
    this.getContrCoinBalance()
    this.getChargeList(this.ethAddress)
    //  获取rawTx
    // webview交互
    window.getSignTx = (signInfo) => {
      let rawTx = JSON.parse(signInfo).data
      this.onChain(rawTx)
    };

  },
  data() {
    return {
      tabList: [
        {title: '我要映射', slot: 'map'},
        {title: '映射记录', slot: 'mapRecord'}
      ],
      tokenPop: false,
      channelSheet: false,
      tokenData: [{
        'icon': 'https://www.fibonacci-chain.com/icons/fibo.png',
        'symbol': 'FIBO'
      }],
      channelList: [
        {name: 'FIBO'}
      ],
      chooseChannel: '选择通道',
      isSelectChannel: false,
      chooseToken: '选择币种',
      isSelectToken: false,
      mapRecordList: [],
      mapListLen: 0,
      balance: 0, // 主网币余额
      contractCoinBalance: 0, // 合约币余额
      ethAddress: null,
      fbAddress: null,
      amount: 0,
      chargeAddr: '', // 充值地址
      client: null,
      chargeList: [],  // 充值记录列表
      chargeLen: 0, // 充值列表长度
      mapList: [],
      mapLen: 0,
      webSocketObj: null,
    }
  },
  destroyed() {
    this.onClose()
  },
  methods: {
    initWebsocket() {
      let baseUrl = wssAddress
      if (!this.ethAddress) {
        return this.$toast.fail('wss 地址错误')
      }
      this.webSocketObj = new WebSocket(baseUrl + this.ethAddress)
      this.webSocketObj.onmessage = this.onMessage
      this.webSocketObj.onopen = this.onOpen
      this.webSocketObj.onerror = this.onError
      this.webSocketObj.onclose = this.onClose
    },

    onOpen() {
      console.log('onOpen', this.webSocketObj.readyState)
    },
    onMessage(e) {
      console.log('e:', e)
      let {data} = e
      data = JSON.parse(data)
      if (data.id) {
        let message = '到账数量：' + data.toAmount + '  MK'
        this.$toast.success(message)
      }
    },
    onClose() {
      console.log('onClose---')
      this.webSocketObj && this.webSocketObj.close && this.webSocketObj.close();
    },

    //获取账户主网币余额
    getMainCoinBalance() {
      Balance(this.ethAddress).then(res => {
        if (res.err) {
          this.$toast.fail(res.err)
          return
        }
        this.balance = res.amount
        console.log('mainCoinBalance:',this.balance)
      })
    },
    //获取账户合约币余额
    getContrCoinBalance() {
      let contract = this.$globalData._testTokenContract
      BalanceOf(contract, this.ethAddress).then(res => {
        if (res.err) {
          this.$toast.fail(res.err)
          return
        }
        this.contractCoinBalance = res.amount
        console.log('contractCoinBalance:',this.contractCoinBalance)
      })
    },
    //调合约
    onTransfer() {
      let ethAdd = this.ethAddress
      let amount = Number(this.amount)
      if (ethAdd && amount && amount > 0) {
        if (amount > Number(this.balance)) {
          return this.$toast.fail('输入大于余额')
        }
        if (amount == Number(this.balance)) {
          this.onMkCharge(ethAdd, amount.toString(), true)
        } else {
          this.onMkCharge(ethAdd, amount.toString())
        }
      } else {
        if (amount <= 0) {
          this.$toast.fail('请输入大于0的数量')
        } else {
          this.$toast.fail('请输入数量')
        }
      }
    },
    //合约调用
    async onMkCharge(ethAdd, amount, lostGas = false) {
      const signData = await mkCharge(ethAdd, amount, lostGas)
      console.log('signData:', signData)
      if (signData.err) {
        return this.$toast.fail(signData.err)
      }
      let data = {
        from: this.fbAddress, ...signData
      }
      uni.postMessage({
        data: {
          action: this.$globalData._ShowSignInfo,
          data,
        }
      })
    },

    changeTab(index) {
      let type = this.tabList[index].title
      if (type == '我要映射') {
        this.getChargeList(this.ethAddress)
      } else if (type == '映射记录') {
        // 请求映射记录接口
        this.getMapList(this.ethAddress)
      }
    },

    //点击全部按钮
    clickAll() {
      this.amount = this.balance
    },
    //获取input 值
    getValue(value) {
      this.amount = value
    },

    onShowChannel() {
      let len = this.channelList && this.channelList.length || 0
      if (len > 0) {
        this.channelSheet = true
      } else {
        this.$toast.fail('暂无充值通道可选')
      }
    },
    onShowToken() {
      if (this.tokenData.length <= 1) {
        return
      }
      let len = this.tokenData && this.tokenData.length || 0
      if (len > 0) {
        this.tokenPop = true
      } else {
        this.$toast.fail('暂无币种可选')
      }
    },
    onSelectToken(token) {
      this.tokenPop = false
      this.isSelectToken = true
      this.chooseToken = token
    },
    onSelectChannel(item) {
      let {name} = item
      this.chooseChannel = name
      this.channelSheet = false
      this.isSelectChannel = true
      this.getToken(name)
      //  获取充值地址
      this.getChargeAddress(name)
    },
    // 获取连信息
    getChainInfo() {
      getChainInfo().then(res => {
        let {data} = res
        let channelList = []
        data && data.forEach((item, index) => {
          channelList[index] = {name: item}
        })
        this.channelList = channelList
      })
    },
    //  获取充值信息
    getToken(chainName) {
      getToken(chainName).then(res => {
        let {data} = res
        this.tokenData = data || []
        if (data && data.length === 1) {
          this.chooseToken = data[0]
        }
      })
    },
    //  获取充值地址
    async getChargeAddress(channel) {
      const {data} = await getRechargeInfo(channel, this.ethAddress)
      this.chargeAddr = data.address || ''
    },
    //  获取充值记录
    getChargeList(address) {
      // address = '0xb3bfd12F4eAB0fC8eb0abA8cb8C2C0aedE490De3'
      getRechargeList(address).then(res => {
        let {data} = res
        this.chargeList = data || []
        this.chargeLen = this.chargeList.length
      })
    },
    //  获取映射记录
    getMapList(address) {
      // address = '0xb3bfd12F4eAB0fC8eb0abA8cb8C2C0aedE490De3'
      getMapList(address).then(res => {
        let {data} = res
        this.mapRecordList = data || []
        this.mapListLen = this.mapRecordList.length
      })
    },
    async onChain(rawTx) {
      this.$toast.loading({
        duration: 0,
        message: '上链中',
        mask: true
      })
      await sendTransaction(rawTx, async (process, data) => {
        if (process === "err") {
          this.$toast.fail(data.toString())
        }
        if (process === "confirmation" && data.c === 3) {
          this.$toast.success('上链成功')
          this.$toast.clear()
          this.getChargeList(this.ethAddress)
          this.getMainCoinBalance()
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.home {
  height: 100%;
}

.contentStyle {
  padding: 10px 14px;
  width: 347px;
  min-height: 509px;
  height: auto;
  background: #FFFFFF;
  border-radius: 12px;
  padding-bottom: 60px;

}

/deep/ .van-tabs__content {
  margin-top: 20px;
}

.addressCodeBox {
  span {
    font-size: 14px;
    font-weight: 500;
  }
}

.codeStyle {

  margin-top: 11px;
  margin-bottom: 22px;
  width: 122px;
  height: 122px;
  background: pink;

}

.addressStyle {
  padding: 0 6px;

  span {
    font-size: 14px;
  }
}

.recordStyle {
  margin-top: 44px;
}
</style>
