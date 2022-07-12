import globalData from "../utils/globalData";
import mkAbi from './abi/mkv1.json'
import web3 from './index'

const contractAddress = globalData && globalData._mkContract.trim()
const mkAbiContract = new web3.eth.Contract(mkAbi, contractAddress)


export const mkCharge = async (address, amount,lostGas=false) => {
    let totalGas = 0
    try {
        let symbol = 'FIBO'
        let method = 'charge'
        let toWeiAmount = web3.utils.toWei(amount, 'ether')
        let inputData = mkAbiContract.methods.charge().encodeABI()
        let value = web3.utils.numberToHex(toWeiAmount)
        let gasPrice = await web3.eth.getGasPrice()
        let gas = await mkAbiContract.methods.charge()
            .estimateGas({
                from: address,
                value:toWeiAmount
            })
        totalGas = web3.utils.fromWei(gasPrice, 'ether') * gas
        let to = contractAddress
        if(lostGas){
            amount = amount - totalGas
            let toWeiAmount = web3.utils.toWei(amount.toString(), 'ether')
            value = web3.utils.numberToHex(toWeiAmount)
        }
        return {totalGas, inputData, gas, gasPrice, to, value, symbol, method,amount}
    } catch (e) {
        console.log('e:',e)
        e = exchangeTip(e,totalGas)
        return {err: e.toString()}

    }
}

const exchangeTip = (e)=>{
    e = e.toString()
    if(e.indexOf('insufficient balance for transfer')!==-1){
        return '余额不足'
    }
    return e
}