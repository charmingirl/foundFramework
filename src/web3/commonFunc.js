const krc20abi = require('./abi/krc20.json')

import {fromWeiAmountFunc,toWeiAmountFunc} from "@/web3/utils/contractCoinTranslateWei";


let web3 = null
export const initWeb3 = (callback)=>{
    import("./index").then(res=>{
        console.log('res---',res)
        web3 = res.default
        callback&&callback(web3)
    })
}
/*
*余额  主网币 @params：address // 要查询的钱包地址
*/
export const Balance = async function (address) {
    try {
        let amount = await web3.eth.getBalance(address)
        if (amount == '0') {
            return {amount: Number(amount)}
        }
        amount = web3.utils.fromWei(amount, 'ether')
        let str = handlerAmount(amount)
        return {amount: Number(str)}
    } catch (err) {
        return {err: err.toString()}
    }
}

/*
* 余额 合约币
* @params：contract // 要查询的代币的合约{address,decimals}
* @params：address // 要查询的钱包地址
* */
export const BalanceOf = async (contract, address) => {
    let amount = 0
    try {
        const NameContract = new web3.eth.Contract(krc20abi, contract.address.trim())
        amount = await NameContract.methods.balanceOf(address).call()
        if (amount == '0') {
            return {amount: Number(amount)}
        }
        let decimals = Math.pow(10, Number(contract.decimals))
        let fromWeiAmount = fromWeiAmountFunc(amount,decimals)
        let str = handlerAmount(fromWeiAmount)
        return {amount: Number(str)}
    } catch (e) {
        console.log('e--BalanceOf:', e)
        return {err: e.toString()}
    }
}


/**
 * 上链
 * */
export const sendTransaction = async (rawSign, callback) => {
    await web3.eth.sendSignedTransaction(rawSign)
        .on('transactionHash', (hash, err) => {
            callback && callback('transactionHash', hash)
        })
        .on('receipt', receipt => {
            callback && callback('receipt', receipt)
        })
        .on('confirmation', (c, receipt) => {
            callback && callback('confirmation', {c, receipt})
        }).on('error', (err) => {
            callback && callback('err', err)
        })
}

/*
* 授权系列
* */

/**
 * 授权
 * @params:address //当前钱包地址
 * @params:contract //授权合约币的合约
 * @params:funcContractAddr //被授权的智能合约地址
 * @params:mainCoin //主网币余额
 */
export const approveFunc = async (paramsInfo) => {
    let {address, contract, funcContractAddr, mainCoin} = paramsInfo
    let contractAddr = contract.address // 合约币的合约地址
    let to = contractAddr  // to是授权合约币地址
    let method = 'approve'
    try {
        let symbol = contract.symbol
        const specialContract = new web3.eth.Contract(krc20abi, contractAddr)
        let amount = await specialContract.methods.totalSupply().call()
        let inputData = specialContract.methods.approve(funcContractAddr, amount).encodeABI()
        let gasPrice = await web3.eth.getGasPrice()
        let gas = await specialContract.methods.approve(funcContractAddr, amount)
            .estimateGas({
                from: address
            })
        let value = web3.utils.numberToHex('0')
        let totalGas = web3.utils.fromWei(gasPrice, 'ether') * gas
        if (mainCoin && (Number(mainCoin) < Number(totalGas))) {
            return {err: 'gas费不足'}
        }
        return {totalGas, inputData, gas, gasPrice, to, symbol, method, value}
    } catch (e) {
        e = e.toString()
        return {err: e}
    }
}
/**
 * 获取授权额度
 *@params:address //当前钱包地址
 * @params:tokenAddr //授权合约币的合约地址
 * @params:funcContractAddr //被授权的智能合约地址
 * */
export const getAllowance = async (paramsInfo) => {
    let {address, tokenAddr, funcContractAddr} = paramsInfo
    console.log('chainAddress,address,tokenAddr,funcContractAddr', address, tokenAddr, funcContractAddr)
    try {
        const specialContract = new web3.eth.Contract(krc20abi, tokenAddr.trim())
        let amount = await specialContract.methods.allowance(address, funcContractAddr.trim()).call()
        return {amount}
    } catch (e) {
        console.log('e----getAllowance:', e)
        return {err: e.toString()}
    }
}


//判断是否是小数并截取3位小数
const handlerAmount = (amount, decimalsNum = 4) => {
    let str = amount.toString()
    let end = str.indexOf('.')
    if (end != -1) {
        str = str.slice(0, end +  decimalsNum)
    }
    return str
}

