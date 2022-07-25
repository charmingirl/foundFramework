const BigNumber = require('bignumber.js')


/**
 * 把有精度的amount  除以精度  变成正常交易值  变小
* @param {string|number} amount
* @param {string|number} decimals
* */
export const fromWeiAmountFunc = (amount,decimals)=>{
    let bigAmount = new BigNumber(amount);
    let bigDecimals = new BigNumber(decimals);
    let fromWeiAmount = bigAmount.dividedBy(bigDecimals)
    return fromWeiAmount.toString()
}
/**
 * 把无精度的amount  乘精度  变成区块交易值   变大
* @param {string|number} amount
* @param {string|number} decimals
* */
export const toWeiAmountFunc = (amount,decimals)=>{
    let bigAmount = new BigNumber(amount);
    let bigDecimals = new BigNumber(decimals);
    let toWeiAmount = bigAmount.multipliedBy(bigDecimals)
    return toWeiAmount.toString()
}