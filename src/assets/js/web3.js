
import BigNumber from "bignumber.js";
import base from "./base.js"
import {switchChain} from "./metamask"


const initContract = () => {
    return new Promise((resolve, reject) => {
        window.web3.contract = new window.web3.eth.Contract(JSON.parse(base.abi), base.contractAddress);
        resolve(window.web3.contract);
    })
}

const switchChainNet = async () => {
    const isInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum);
    };

    if(window.ethereum){
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: base.bscMainnet.chainId  }], 
        });
      } catch (error) {
        console.log('wallet_switchEthereumChain' ,error);
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: base.bscMainnet.chainId,
                  rpcUrl: base.bscMainnet.rpcUrls[0],
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
      }
    }

}


// //获取token单价 wei
// function getPrice() {
//   return new Promise((resolve, reject) => {
//     contract.methods.apePrice().call(null, function (error, result) {
//       if (error) {
//         return reject(error)
//       }
//       resolve(result)
//     });
//   });
// }


const myAllNFT = async () => {

    if (window.web3.contract == null) {
        throw new Error("please connect the wallet");
    }
    var chainID = await window.web3.eth.getChainId()
    // 检查是否在主网上
    if (chainID != base.bscMainnet.chainId){
        try{
            await switchChain(base.bscMainnet)
        }catch(error){
            console.log(error)
            throw new Error(error);
        }
    }
   
    var count = await window.web3.contract.methods.balanceOf(window.web3.accounts[0]).call()
    console.log("count", count)
    var map = {};
    for (let index = 0; index < count; index++) {
        var tokenID = await window.web3.contract.methods.tokenOfOwnerByIndex(window.web3.accounts[0], index).call({})
        var info = await window.web3.contract.methods.getNft(tokenID).call({})
        if (map[info.level]) {
            map[info.level]["count"]++
        } else {
            //author: "0xa38433265062F1F73c0A90F2FEa408f2Efd1a569" level: "1" name: "10" power: "1000" res: "1"
            map[info.level] = { "count": 0, "author": info.author, "level": info.level, "name": info.level, "power": info.power, "res": info.res }
        }
    }

    return map;
}




//铸造 wei  to 铸造给谁 nftName 可以传空 level 等级 1-5 power[1000,2500,6500,14500,35000,90000] res 随便 author 随便
const mint = (nftName, level, power, res) => {
    console.log("mint")
    return new Promise((resolve, reject) => {

        if (web3 == undefined || web3 == null) {
            if (base.phoneOs) {
                return reject("Please use MetaMask app's  browser to open it");
            }
            return reject("Please install MetaMask Browser plug-in and Connect it");
        }
        if (window.web3.contract == null) {
            return reject("wallet cannot connect,Please try again later")
        }

        console.log("window.web3.accounts[0]", window.web3.accounts[0])
        // getPrice().then((price) => {
        let amount = BigNumber("0").multipliedBy(0.08)
        console.log(window.web3.accounts[0], nftName, level, power, res)
        window.web3.contract.methods.mint(window.web3.accounts[0], nftName, level, power, res, window.web3.accounts[0]).send({ from: window.web3.accounts[0], value: amount }, function (error, transactionHash) {
            console.log("error>>>>>>>>>", error)
            if (error) {
                return reject(error.message)
            }
            return resolve("txHash:" + transactionHash)
        });
        // })
    });
}

// vConsole.destroy();
export {
    // getPrice,
    myAllNFT,
    initContract,
    mint,
    switchChainNet,
};