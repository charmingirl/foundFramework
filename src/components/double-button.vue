<template>
  <div class="flex-around">
    <ButtonSelf
        :width="158"
        :height="40"
        :loading-text="'授权'"
        :disabled="isApprove"
        @click="clickAuthorization"
        :margin-top="marginTop"
        :loading="approveLoading"
        :fontSize="16"
    >
      授 权
    </ButtonSelf>
    <div style="width: 50px; height: 20px"></div>
    <ButtonSelf
        :width="158"
        :height="40"
        :disabled="!isApprove || isWithdraw"
        @click="clickConfirm"
        :margin-top="marginTop"
        :loading="confirmLoading"
        :fontSize="16"
    >
      <slot />
    </ButtonSelf>
  </div>
</template>

<script>
import {Local} from "@/utils/tools";
import ButtonSelf from "@/components/Button-self";



/*
* @clickAuthorization  父组件点击授权按钮时间 注:同时改变is-approvaling值
* @clickConfirm 点击父组件对应授权按钮的 合约方法的事件
*
*
* :approvalParamsInfo 授权需要的参数  {
        address: this.ethAddress,当前账户地址
        contract: this.currentToken,当前授权的代币合约
        funcContractAddr: this.$globalData._poolContract,当前被授权的合约地址
        mainCoin, 主网币余额
      }
* :is-approvaling  监听点击授权按钮触发 上链授权
* :isApprove  父组件做出是否需要授权的判断  true不用授权  false需要授权
*
* */


export default {
  name: "double-button",
  components: {ButtonSelf},
  props:{
    approvalParamsInfo:Object,
    // 确定按钮loading
    confirmLoading:{
      type:Boolean,
      default:false,
    },
    //已授权
    isApprove:{
      type:Boolean,
      default:false,
    },//已赎回
    isWithdraw:{
      type:Boolean,
      default:false,
    },
    //正在授权
    isApprovaling:{
      type:Boolean,
      default:false,
    },
    marginTop:{
      type:[String,Number],
      default:22,
    }
  },
  watch:{
    isApprovaling(val){
      if(val || !val){
        this.onAuthorization()
      }
    }
  },
  data(){
    return {
      approveLoading: false,
      approveFunc:null,
    }
  },
  methods:{
    //授权按钮
    clickAuthorization() {
      this.$emit('clickAuthorization')
    },
    //确定按钮
    clickConfirm() {
      this.$emit('clickConfirm')
    },
   onAuthorization() {
     import('@/web3/commonFunc').then(async res=>{
       let {approveFunc} = res
       this.approveFunc = approveFunc
       this.approveLoading = true;
       let signData = await this.approveFunc(this.approvalParamsInfo);
       if (signData.err) {
         this.approveLoading = false;
         return this.$toast.fail(signData.err);
       }
       let fbAddress = Local.get(this.$globalData._fbAddress);
       let data = {
         from: fbAddress,
         ...signData,
         ...this.dataParamsInfo
       };
       console.log("data:", data);
       this.approveLoading = false;
       uni.postMessage({
         data: {
           action: this.$globalData._ShowSignInfo,
           data,
         },
       });
     })

    },


  }
}
</script>

<style scoped>

</style>