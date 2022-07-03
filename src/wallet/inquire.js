import tokenAbi from "./abis/tokenContract.json";
import DsgNftAbi from "./abis/DsgNft.json"
import NftMarketAbi from "./abis/nftMarket.json"
import SinglePoolAbi from "./abis/singlePool.json"
import NtfPoolAbi from "./abis/EarnPool.json"
import IDOAbi from "./abis/IDO.json"
import IDOInvitePoolABI from "./abis/invitePool.json"
import IDODsgNftABI from "./abis/IDODsgNft.json"
import CONFIG from './address.js'
import { fromWei , toWei , toThousands } from "../utils/tool";

export  const getCurId = async function () {
  const contract = new web3.eth.Contract(DsgNftAbi, CONFIG.DsgNft);
  let decimals = '';
  await contract.methods.getCurId().call(function (error, result) {
    if (!error) {
      decimals = result
      console.log('getCurId' , decimals)
    }else   {
      console.log('getCurId_err',error)
    }
  });
  return decimals;
}


export  const getBaseURI = async function () {
  const contract = new web3.eth.Contract(DsgNftAbi, CONFIG.DsgNft);
  let baseURI = '';
  await contract.methods.baseURI().call(function (error, result) {
    if (!error) {
      baseURI = result
      console.log('baseURI' , baseURI)
    }else   {
      console.log('baseURI_err',error)
    }
  });
  return baseURI;
}


export  const getBalanceOf = async function () {
    const address = window.newVue.$store.state.base.address;
    const contract = new web3.eth.Contract(DsgNftAbi, CONFIG.DsgNft);
    let balanceOf = '0';
    await contract.methods.balanceOf(address).call(function (error, result) {
        if (!error) {
        balanceOf = result
        console.log('balanceOf' , balanceOf)
        }else   {
        console.log('balanceOf_err',error)
        }
    });
    return balanceOf;
}



export  const getTokenId = async function (index) {
  const address = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(DsgNftAbi, CONFIG.DsgNft);
  let ID = '0';
  await contract.methods.tokenOfOwnerByIndex(address , index).call(function (error, result) {
    if (!error) {
      ID  = result
      console.log('TokenId' , ID )
    }else   {
      console.log('TokenId_err',error)
    }
  });
  return ID;
}


export  const getTokenLevel = async function (tokenId) {
  const contract = new web3.eth.Contract(DsgNftAbi, CONFIG.DsgNft);
  let ID = '0';
  await contract.methods.getNft(tokenId).call(function (error, result) {
    if (!error) {
      ID  = result.level
      // console.log('TokenLevel' , result )
    }else   {
      console.log('TokenLevel_err',error)
    }
  });
  return ID;
}

// market 列表
export  const getMarketSalesAmount = async function () {
  const contract = new web3.eth.Contract(NftMarketAbi, CONFIG.nftMarket);
  let amount = '0';
  await contract.methods._salesAmount().call(function (error, result) {
    if (!error) {
      amount  = result
      console.log('MarketSalesAmount' , result )
    }else   {
      console.log('MarketSalesAmount_err',error)
    }
  });
  return amount;
}
export  const getMarketSalesInfo = async function (index) {
  const contract = new web3.eth.Contract(NftMarketAbi, CONFIG.nftMarket);
  let info = {};
  await contract.methods.getSales(index).call(function (error, result) {
    if (!error) {
      let obj = {}
      for(let key in result){
        if(isNaN(key)){
          obj[key] = result[key]
        }
      }
      info  = obj
    }else   {
      console.log('SalesInfo_err',error)
    }
  });
  return info;
}
// farms列表
export  const getFarmsSalesAmount = async function (kind) {
  let contract
  if(kind === 'nft'){
    contract = new web3.eth.Contract(DsgNftAbi, CONFIG.DsgNft);
  }
  let ID = '0';
  await contract.methods._salesObjects(tokenId).call(function (error, result) {
    if (!error) {
      ID  = result.level
      console.log('TokenLevel' , result )
    }else   {
      console.log('TokenLevel_err',error)
    }
  });
  return ID;
}



export const getFarmsBalanceOf = async function (kind ) {

  const address = window.newVue.$store.state.base.address;
  let contract
  if(kind === 'LP'){
    contract = new web3.eth.Contract(tokenAbi, CONFIG.LPToken);
  }else {

  }
  let balanceOf = '0';
  await contract.methods.balanceOf(address).call(function (error, result) {
      if (!error) {
      balanceOf = fromWei(result , 18)
      }else   {
      console.log('FarmsBalanceOf_err',error)
      }
  });
  return balanceOf;
}



export const isApproved = async function (tokenAddress, decimals, amount , otherAddress) {
  console.log('检查授权' , amount);
  const account = window.newVue.$store.state.base.address;
  const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
  let contract = otherAddress || window.newVue.$store.state.base.poolAddress
  let approveAmount = 0;
  await tokenContract.methods.allowance(account, contract).call(function (error, result) {
    if (error) {
      return false;
    }else   {
      console.log('allowance_err',error)
    }
    approveAmount = result;
    console.log('result', result)
  })
  return Number(toWei(amount.toString(), decimals)) < approveAmount;
}


// farms LP池子 Harvest
export  const getFarmLPHarvest = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(SinglePoolAbi, CONFIG.singlePool);
  let amount = '0';
  await contract.methods.pendingReward(account).call(function (error, result) {
    if (!error) {
      amount  = fromWei(result , 18)
      console.log('FarmLPHarvest' , amount )
    }else   {
      console.log('FarmLPHarvest_err',error)
    }
  });
  return amount;
}
// farms LP池子 staked
export  const getFarmLPtotalDeposit = async function () {
  const contract = new web3.eth.Contract(SinglePoolAbi, CONFIG.singlePool);
  let amount = '0';
  await contract.methods.totalDeposit().call(function (error, result) {
    if (!error) {
      amount  = fromWei(result , 18)
      console.log('FarmLPtotalDeposit' , amount )
    }else   {
      console.log('FarmLPtotalDeposit_err',error)
    }
  });
  return amount;
}

export  const getFarmLPuserDeposit = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(SinglePoolAbi, CONFIG.singlePool);
  let amount = '0';
  await contract.methods.userInfo(account).call(function (error, result) {
    if (!error  && result.amount) {
      amount  = fromWei(result.amount , 18)
      console.log('FarmLPuserDeposit' , result )
    }else   {
      console.log('FarmLPuserDeposit_err',error)
    }
  });
  return amount;
}


// farms ntf池子 staked
export  const getFarmNtfStake = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(NtfPoolAbi, CONFIG.nftEarnErc20Pool);
  let amount = [];
  await contract.methods.getFullUserInfo(account).call(function (error, result) {
    if (!error && Array.isArray(result.nfts)) {
      amount  = result.nfts
      console.log('FarmNtfStake' , result )
    }else   {
      console.log('FarmNtfStake_err',error)
    }
  });
  return amount;
}


export  const getFarmNtfUserInfo = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(NtfPoolAbi, CONFIG.nftEarnErc20Pool);
  let amount = {};
  await contract.methods.getUserInfo(account).call(function (error, result) {
    if (!error && result.share) {
      amount.userPower  = toThousands(result.share)
      console.log("用户",result)
      console.log('FarmNtfUserInfo' , result )
    }else   {
      console.log('FarmNtfUserInfo_err',error)
    }
  });
  return amount;
}

export  const getAns = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(NtfPoolAbi, CONFIG.nftEarnErc20Pool);
  let amount = {};
  await contract.methods. pendingToken(account).call(function (error, result) {
    if (!error && result) {
      let ss = Math.pow(10,18)
      amount = result/ss
      amount = amount.toFixed(2)
      console.log('getAngelValleyMining' , amount )
    }else {
      console.log('getAngelValleyMining_err',error)
    }
  });
  return amount;
}

export  const getFarmNtfTotalMining = async function () {
  const contract = new web3.eth.Contract(NtfPoolAbi, CONFIG.nftEarnErc20Pool);
  let amount = {};
  await contract.methods.total_Power().call(function (error, result) {
    if (!error && result) {
      amount  = result
      console.log('FarmNtfTotalMining' , result )
    }else   {
      console.log('FarmNtfTotalMining_err',error)
    }
  });
  return amount;
}
export  const getAngelValleyMining = async function () {
  const contract = new web3.eth.Contract(NtfPoolAbi, CONFIG.nftEarnErc20Pool);
  let amount = {};
  await contract.methods.accRewardAmount().call(function (error, result) {
    if (!error && result) {
      let ss = Math.pow(10,18)
      amount  = result/ss
      amount = amount.toFixed(2)
      console.log('getAngelValleyMining' , result )
    }else {
      console.log('getAngelValleyMining_err',error)
    }
  });
  return amount;
}

export  const getFarmNtfAccShare = async function () {
  const contract = new web3.eth.Contract(NtfPoolAbi, CONFIG.nftEarnErc20Pool);
  let amount = '0';
  await contract.methods.accShare_().call(function (error, result) {
    if (!error ) {
      amount  = result
      console.log('FarmNtfAccShare' , result )
    }else   {
      console.log('FarmNtfAccShare_err',error)
    }
  });
  return amount;
}

// 获取IDO可领取数量
export  const getIDOUserInfo = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(IDOAbi, CONFIG.IDOToken);
  let amount = 0;
  let total = 0;
  await contract.methods.userInfo(account).call(function (error, result) {
    if (!error) {
      if(result.amount) {
        amount  = fromWei(result.amount , 18)
      }
      if(result.total) {
        total  = fromWei(result.total , 18)
      }
      console.log('userInfo' , result )
    } else   {
      console.log('userInfo_err',error)
    }
  });
  return {
    amount: amount,
    total: total,
  };
}

// 获取IDO待释放数量
export  const getIDOReleasedAmount = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(tokenAbi, CONFIG.IDORewardToken);
  let amount = 0;
  await contract.methods.balanceOf(CONFIG.IDOToken).call(function (error, result) {
    console.log('IDO待释放数量：' , result )
    if (!error) {
      amount  = fromWei(result , 18)
    } else   {
      console.log('balanceOf_err',error)
    }
  });
  return amount;
}

// 获取ANS奖励数量
export  const getIDOANSRewardAmount = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(IDOAbi, CONFIG.IDOToken);
  let amount = 0;
  await contract.methods.rewardAns(account).call(function (error, result) {
    console.log('ANS奖励数量：' , result )
    if (!error) {
      amount  = fromWei(result , 18)
    } else   {
      console.log('balanceOf_err',error)
    }
  });
  return amount;
}

// 获取USDT奖励数量
export  const getIDOUSDTRewardAmount = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(IDOAbi, CONFIG.IDOToken);
  let amount = 0;
  await contract.methods.reward(account).call(function (error, result) {
    console.log('USDT奖励数量：' , result )
    if (!error) {
      amount  = fromWei(result , 18)
    } else   {
      console.log('balanceOf_err',error)
    }
  });
  return amount;
}

// 获取我的直推奖励
export const getIDOOneLevelLists = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(IDOInvitePoolABI, CONFIG.IDOInvitePool);
  let list = [];
  await contract.methods.getOneLevelLists(account).call(function (error, result) {
    console.log('我的直推奖励:' , result )
    if (!error) {
      list = result;
      // amount  = fromWei(result , 18)
    } else   {
      console.log('balanceOf_err',error)
    }
  });
  return list;
}

// 获取nft奖励
export const getIDORemainNft = async function () {
  const account = window.newVue.$store.state.base.address;
  const contract = new web3.eth.Contract(IDODsgNftABI, "0xAA92D655C9A79f2715A6e25B8832dBeD0331289b");
  let list = [];
  let balance = 0;
  let countBalance = 0;
  await contract.methods.getRemainNft("0x7DCBFF9995AC72222C6d46A45e82aA90B627f36D").call(function (error, result) {
    console.log('account:' , account )
    console.log('我的NFT奖励:' , result )
    if (!error) {
      if(result && result[0]) {
        balance = result[0];
      }
      if(result && result[1]) {
        countBalance = result[1];
      }
      // list = result;
      // amount  = fromWei(result , 18)
    } else   {
      console.log('getRemainNft_err',error)
    }
  });
  return {
    balance: balance,
    countBalance: countBalance,
  };
}

// export const isNTFApproved = async function (tokenAddress, decimals, amount , otherAddress) {
//   console.log('检查授权' , amount);
//   const account = window.newVue.$store.state.base.address;
//   const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
//   let contract = otherAddress || window.newVue.$store.state.base.poolAddress
//   let approveAmount = 0;
//   await tokenContract.methods.allowance(account, contract).call(function (error, result) {
//     if (error) {
//       return false;
//     }else   {
//       console.log('allowance_err',error)
//     }
//     approveAmount = result;
//     console.log('result', result)
//   })
//   return Number(toWei(amount.toString(), decimals)) < approveAmount;
// }
