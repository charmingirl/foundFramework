let {ethers} = require('ethers/lib');
// 通过定制 URL 连接 :
let url = "https://node.fibochain.org";
let httpProvider = new ethers.providers.JsonRpcProvider(url);
let privateKey = "0x22104b1524b1e33c3c929978ded6e29e5746dd41f802536cf777201ab619ee14"
let address = '0x8394a30Ea38c23164d178651FB9c6c826d809696'

//  余额
let wallet = new ethers.Wallet(privateKey, httpProvider);
let balancePromise = wallet.getBalance();
balancePromise.then((balance) => {
    console.log(balance.toString());
});

let provider = ethers.getDefaultProvider(url);
export const getBalance = provider.getBalance(address)

getBalance.then(balance=>{
    console.log('balance-----getBalance',balance.toString());
})

// export const getBalance = provider.getBalance(address)