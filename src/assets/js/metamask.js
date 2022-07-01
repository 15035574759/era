import base from "./base.js"
import Web3 from "web3";

const connect  = () => {
    return new Promise( async (resolve, reject) => {

        // if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        //   if (!tp.isConnected()) {
        //     openTokenPocket()
        //     //手机
        //     //  window.location.href ='tpdapp://open?params={"url": "http://192.168.31.43:1024", "chain": "ETH", "source":""}'
        //      return
        //   }
        //   //mobile
        // }

        // Wait for loading completion to avoid race conditions with web3 injection timing.
        // window.addEventListener("load", async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            if (window.ethereum.chainId !== base.bscMainnet.chainId) {
                return switchChain(base.bscMainnet)
            }
            window.web3 = new Web3(ethereum);

            await connect()
  
            const accounts = await ethereum.request({
              method: 'eth_accounts'
            });
            console.log('accounts' , accounts);
            if (accounts.length === 0) {
              window.newVue.$store.commit("isConnected", false);
              return false;
            }
            const address = accounts[0];
            const chainId = await ethereum.request({
                method: 'eth_chainId'
            });

            ethereum.on('accountsChanged', () => {
              // window.location.reload();
              // connectInfo()
            //   window.newVue.$store.dispatch("disconnectMetaMask");
            });
            ethereum.on('chainChanged', (res) => {
              // window.location.reload();
              // connectInfo()
            });

            // window.web3 = new Web3(window.ethereum);
            // try {
            //     // Request account access if needed
            //     //   await window.ethereum.enable();

            //     window.ethereum.enable()
            //         .catch(function (reason) {
            //             //如果用户拒绝了登录请求
            //             if (reason === "User rejected provider access") {
            //                 return reject("ser rejected provider access")
            //                 // 用户拒绝登录后执行语句；
            //             } else {
            //                 // 本不该执行到这里，但是真到这里了，说明发生了意外
            //                 return reject("There was a problem signing you in");
            //             }
            //         }).then(function (accounts) {
            //             // 判断是否连接以太
            //             //    if (window.ethereum.networkVersion !== desiredNetwork) {}
            //             let currentProvider = web3.currentProvider;
            //             window.web3.setProvider(currentProvider);
            //             //如果用户同意了登录请求，你就可以拿到用户的账号
            //             window.web3.eth.defaultAccount = accounts[0];
            //             window.web3.accounts = accounts
            //             //   初始化合约
            //             //这里返回用户钱包地址
            //             //   callback(accounts[0]);
            //             resolve(window.web3);
            //         });
            //     // Acccounts now exposed 
            // } catch (error) {
            //     reject(error);
            // }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            // Use Mist/MetaMask's provider.
            window.web3 = window.web3;
            console.log("Injected web3 detected.");
            resolve(web3);
        }
        // Fallback to localhost; use dev console port by default...
        else {
            // const provider = new Web3.providers.HttpProvider(
            //   "http://127.0.0.1:9545"
            // );
            // web3 = new Web3(provider);
            if (base.phoneOs) {
                return reject("Please use MetaMask app's  browser to open it");
            }
            return reject("Please install MetaMask Browser plug-in");
        }
        // });
    });
}

const  _MeatMaskContract = async () => {
  ethereum
    .request({
      method: 'eth_requestAccounts'
    })
    .then(() => {
      connectInfo()
    })
    .catch((err) => {
      if (err.code === 4001) {
        console.log(err.message);
      }
    });
};


const switchChain = async (data) => {
    try {
        let { chainId } = data;
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902   || switchError.code === -32603) {
              return  addChain(data);
        }
        console.log("switchError",switchError)
        throw new Error(switchError.message)
        // handle other "switch" errors
    }
}

const addChain = (data) => {
      return  window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [data],
        });
}


export {
    _MeatMaskContract,
    switchChain
}