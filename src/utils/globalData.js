// 环境的切换
let _devServe = "devServe"
let _devBuild = 'devBuild'
let _prodBuild = 'prodBuild'
let _mkContract = null
let _testTokenContract = null
let currentEnv = process.env.NODE_ENV && process.env.NODE_ENV.trim() || '';
if (currentEnv == _devServe) {
    _mkContract= '0x6948422511714D34DAe464Dfc71178Fac86A3869'
    _testTokenContract = {symbol:'FLY',address: '0xaE56eDd4D903a531e83233D40983DE985679AF74',decimal:8, decimals: 8}

} else if (currentEnv == _devBuild) {
    _mkContract= '0x6948422511714D34DAe464Dfc71178Fac86A3869'

} else if (currentEnv == _prodBuild) {
    _mkContract= '0x6948422511714D34DAe464Dfc71178Fac86A3869'
}
export default {
    _devServe,
    _devBuild,
    _prodBuild,
    _mkContract,
    _testTokenContract,
    _fbAddress:'fbAddress',
    _ethAddress:'ethAddress',
    _MOKOM:'MOKOM',
    _ShowSignInfo:'showSignInfo', // 常规交易信息展示
}