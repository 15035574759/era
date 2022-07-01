import base from "./base.js"
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";


async function Init(callback) {
    if (window.web3 != undefined) {
        window.web3.accounts = await window.web3.eth.getAccounts();
        callback(window.web3.accounts)
    }
}


const _WalletContract = function _WalletContract(accountsChanged,disconnect,success,error) {
    var provider = new WalletConnectProvider({
        rpc: {
            56: base.bscMainnet.rpcUrls,
        },
        "chainId": 56,//需要连接的区块链id
        "networkId": 56,
        qrcode: true,//二维码是否开启
        qrcodeModalOptions: {
            mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
            ],
            desktopLinks: []
        },
    });
    provider.enable().then((res) => {
      
        window.web3 = new Web3(provider);

        //账户更改触发的方法
        provider.on("accountsChanged", (accounts) => {

            accountsChanged(accounts)
        });
        //账户断开的方法
        provider.on("disconnect", (code, reason) => {

            window.web3 = null
            window.web3.contract = null
            disconnect(code)
        });

     //这里返回的是链接地址
     Init((accounts) => {
        success(accounts)
    })
   
    }).catch((err) => {

        error(err)
    });

}
export {
    _WalletContract
}