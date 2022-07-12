import request from "@/request/index";


// test
export const test = ()=>request.get('/nft/front/query/head')
//获取链信息
export const getChainInfo = ()=>request.get('/chains')
// 获取充值币种
export const getToken = (chainName)=>request.get('/chains/'+chainName)

//获取充值地址信息
export const getRechargeInfo = (chainName,address)=>request.get('/chains/'+chainName+'/accounts/'+address)

//获取充值记录
export const getRechargeList = (address)=>request.get('/transactions/' + address )


//获取映射记录
export const getMapList = (address)=>request.get('/records/' + address )


//wss 地址
export const wssAddress = request.wss


