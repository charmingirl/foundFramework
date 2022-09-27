# fibobrige

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 唤起钱包三种方式

```js
/**

h5_params:需要带给钱包钱包在返回给h5页面（eg:h5页面判断当前上链方法）
data:带给钱包的所有信息的固定字段 @params:web3URL; // 需要用的别的链地址 @params:mainCoin;当前链的主网币
signData:合约签署的返回信息
包括： return {totalGas, inputData, gas, gasPrice, to, value, symbol, method,amount}  || return{err:e.toString()}

uni.postMessag:向钱包发起请求 @params:action;//发起的请求是什么动作@params:data;//发起的请求所需参数
**/





// 1.连接钱包


// 2.合约交易-签署信息展示----globalData._ShowSignInfo = 'showSignInfo'
const signData = await contracyFunc(params)
let h5_params = {
        params
      }    //  业务需求非必须携带
let data = {
        from: this.fbAddress, ...signData
      }
      uni.postMessage({
        data: {
          action: this.$globalData._ShowSignInfo,
          data,
        }
      })

// 3.常规-签署信息展示----globalData._ShowSignInfo = 'showSignInfo'
let signInfo = "need sign string" // 需要签署的字符串
let h5_params = {
        showType: 'sign',
      }    //  必须携带
// 向app发送信息
      let data = {
        from: this.address,
        amount: this.vote_value,
        showType: 'sign',
        method:'投票矿池',  // 签署事件名称
        symbol:'iFLY',  // 签署代币名称
        signInfo,
        h5_params
      }
      uni.postMessage({
        data: {
          action: globalData._ShowSignInfo,
          data
        }
      })
```



// 接收钱包返回的消息
// webview交互
window.getSignTx = (signInfo) => {
// 钱包返回的参数
console.log('signInfo',signInfo)
};
