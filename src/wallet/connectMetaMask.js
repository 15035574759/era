import Web3 from "web3"
const isInstalled = () => {
  const {
    ethereum
  } = window;
  return Boolean(ethereum);
};
export const connectInfo = async () => {
  if(window.ethereum){
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.numberToHex(256)  }], 
        // params: [{ chainId: '0x38'  }], 
      });
      connectInfoDetail()
    } catch (error) {
      console.log('wallet_switchEthereumChain' ,error);
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: web3.utils.numberToHex(256),
                // chainId: '0x38',
                // rpcUrl: 'https://bsc-dataseed.binance.org/',
                rpcUrl: 'https://http-testnet.hecochain.com',
              },
            ],
          });
          connectInfoDetail()

        } catch (addError) {
          console.error(addError);
        }
      }
    }
  }
}
export const connectInfoDetail = () => {
  return new Promise(async (resolve ,reject)=>{
    if (!isInstalled())  {
      reject()
    };
    console.log('ethereum.selectedAddress',ethereum.selectedAddress);
    if (!ethereum.selectedAddress) {
      reject()
    } 

    console.log('connectInfoDetail');

    
    window.web3 = new Web3(ethereum);
    
    const accounts = await ethereum.request({
      method: 'eth_accounts'
    });
    if (accounts.length === 0) {
      window.newVue.$store.commit("isConnected", false);
      return reject();
    }
    const address = accounts[0];
    // const address = '0x57ccFdF76D4926E50A0322682A118fe3A3dc43E1';
    const chainId = await ethereum.request({
      method: 'eth_chainId'
    });
    getBaseData(chainId,accounts,address)
    resolve()
    ethereum.on('accountsChanged', () => {
      // window.location.reload();
      // connectInfo()
      window.newVue.$store.commit("disconnectMetaMask");
    });
    ethereum.on('chainChanged', (res) => {
      // window.location.reload();
      // connectInfo()
    });
  })
}
export const connect = async () => {
  console.log('connect');
  return new Promise((resolve , reject)=>{
    ethereum
    .request({
      method: 'eth_requestAccounts'
    })
    .then(() => {
      resolve()
      connectInfo()
    })
    .catch((err) => {
      if (err.code === 4001) {
        console.log(err.message);
      }
      reject()
    });
  })
};

async function getBaseDataWithoutConnect(){
  console.log('重新获取数据');
}

  
export async  function getBaseData(chainId,accounts,address){
  console.log('触发getData------------------------------------');

  window.newVue.$store.commit("getChainId", chainId);
  window.newVue.$store.commit("getAddress", address);
  window.newVue.$store.commit("isConnected", true);
  window.newVue.$store.dispatch("getUserNtfs");
  window.newVue.$store.dispatch("getmarketNtfs");
  window.newVue.$store.dispatch("getFarmsLPPoolInfo");
  window.newVue.$store.dispatch("getFarmsNTFStake");
  
}
