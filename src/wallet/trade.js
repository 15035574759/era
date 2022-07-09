import tokenAbi from "./abis/tokenContract.json";
import DsgNftAbi from "./abis/DsgNft.json"
import NftMarketAbi from "./abis/nftMarket.json"
import SinglePoolAbi from "./abis/singlePool.json"
import NftPoolAbi from "./abis/EarnPool.json"
import IDODsgNftABI from "./abis/IDODsgNft.json"
import CONFIG from './address.js'
import CURIDS from '@/utils/random.json'
import {
    toWei,
    toolNumber
  } from '@/utils/tool'
import { getCurId, getBalanceOf, getTokenId, getTokenLevel, getPower } from './inquire'
import NtfPoolAbi from "./abis/EarnPool.json";
import IDOAbi from "./abis/IDO.json";

export const Mint =async function (nftName,  res){
    console.log('nftName',nftName);
    console.log('res',res);

// 测试
    // let timestamp1 = new Date().getTime().toString()
    // window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp1})
    // setTimeout(()=>{
    //   window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp1 , val:2 , hash:'timestamp1' , isUserDeny:true})
    // },500)
    // return


    // let curId = await getCurId()
    // //1000, 1500, 2500, 3500, 5000, 7000
    // const powerList = [1000, 1500, 2500, 3500, 5000, 7000]
    // let index = Number(curId) - 1000
    // if(isNaN(index) || index < 0) index = 0
    // let level = CURIDS[index].value
    // let power = powerList[level-1]
    let balance = await getBalanceOf()
    balance = Number(balance) - 1;
    let tokenId = await getTokenId(balance); //获取TokenId
    let level = await getTokenLevel(tokenId); //获取NFT等级
    let power = CONFIG.nftPower(level);
    // console.log('curId' , curId);
    console.log('level' , level);
    console.log('tokenId' , tokenId);
    console.log('power', power);
    const address = window.newVue.$store.state.base.address;
    const contractAddress = CONFIG.DsgNft
    const contract = new web3.eth.Contract(DsgNftAbi, contractAddress);
    let price = web3.utils.toHex(toWei(CONFIG.MintPrice , 18))
    console.log('price',price);


    let encodedABI = contract.methods.mint(address , nftName ,level , power ,res,address).encodeABI();
    let timestamp = new Date().getTime().toString()
    window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
    return new Promise((resolve, reject) => {
      let hashInfo
      web3.eth.getTransactionCount(address).then(async transactionNonce => {
        let gasPrice = await web3.eth.getGasPrice();
        let estimateGas = await web3.eth.estimateGas({
          from: address,
          to: contractAddress,
          data: encodedABI,
          value:price
        })
        console.log('estimateGas' ,estimateGas)
        const params = [{
          from: address,
          to: contractAddress,
          data: encodedABI,
          gasPrice: web3.utils.toHex(gasPrice),
          gas: web3.utils.toHex(estimateGas),
          // gas: web3.utils.toHex(5000000),
          value:price,
        }];
        web3.eth.sendTransaction(params[0])
          .on('transactionHash', function (hash) {
            console.log('hash', hash);
            if (hash) {
              hashInfo = hash
            }
          })
          .on('receipt', function (receipt) {
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
            resolve(level)
          })
          .on('error', function (err) {
            let isUserDeny = err.code === 4001
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
            console.log('err' , err)
            reject(err)
          })
      })
      .catch(err=>{
        console.log('Mint',err)
        // let errStr = err.toString()
        // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
        // let unknow = errStr.indexOf(unknowErrMsg) !== -1
        // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
        // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
        window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
        reject(err)
      })
    })
}


export const userNtfSell = async function (tokenId , maxPrice , minPrice , startTime , durationTime , nft , currency){
  console.log('tokenId',tokenId);
  console.log('maxPrice',maxPrice);
  console.log('minPrice',minPrice);
  console.log('startTime',startTime);
  console.log('durationTime',durationTime);
  console.log('nft',nft);
  console.log('currency',currency);
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.nftMarket
  const contract = new web3.eth.Contract(NftMarketAbi, contractAddress);
  maxPrice = web3.utils.toHex(toWei(maxPrice , 18))
  minPrice = web3.utils.toHex(toWei(minPrice , 18))

  let encodedABI = contract.methods.startSales(tokenId , maxPrice , minPrice , startTime , durationTime  , nft , currency).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
        .on('transactionHash', function (hash) {
          console.log('hash', hash);
          if (hash) {
            hashInfo = hash
          }
        })
        .on('receipt', function (receipt) {
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
          resolve()
        })
        .on('error', function (err) {
          let isUserDeny = err.code === 4001
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
          console.log('err' , err)
          reject(err)
        })
    })
    .catch(err=>{
      console.log('Mint',err)
      // let errStr = err.toString()
      // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
      // let unknow = errStr.indexOf(unknowErrMsg) !== -1
      // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
      // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
      window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
      reject(err)
    })
  })
}


export const userNtfSellApprove = async function (tokenId , poolAddress ){

  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.DsgNft
  const contract = new web3.eth.Contract(DsgNftAbi, contractAddress);

  let encodedABI = contract.methods.approve(poolAddress,tokenId).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
        .on('transactionHash', function (hash) {
          console.log('hashfffffffff', hash);
          if (hash) {
            hashInfo = hash
          }
        })
        .on('receipt', function (receipt) {
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
          resolve()
        })
        .on('error', function (err) {
          let isUserDeny = err.code === 4001
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
          console.log('err' , err)
          reject(err)
        })
    })
    .catch(err=>{
      console.log('Mint',err)
      // let errStr = err.toString()
      // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
      // let unknow = errStr.indexOf(unknowErrMsg) !== -1
      // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
      // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
      window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
      reject(err)
    })
  })
}



export const userFarmsDeposit = async function ( amount ){

  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.singlePool
  const contract = new web3.eth.Contract(SinglePoolAbi, contractAddress);
  amount = web3.utils.toHex(toWei(amount , 18))
  let encodedABI = contract.methods.deposit(amount).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
        .on('transactionHash', function (hash) {
          console.log('hash', hash);
          if (hash) {
            hashInfo = hash
          }
        })
        .on('receipt', function (receipt) {
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
          resolve()
        })
        .on('error', function (err) {
          let isUserDeny = err.code === 4001
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
          console.log('err' , err)
          reject(err)
        })
    })
    .catch(err=>{
      console.log('Mint',err)
      // let errStr = err.toString()
      // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
      // let unknow = errStr.indexOf(unknowErrMsg) !== -1
      // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
      // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
      window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
      reject(err)
    })
  })
}



export const userFarmsUnstake = async function ( amount ){

  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.singlePool
  const contract = new web3.eth.Contract(SinglePoolAbi, contractAddress);
  amount = web3.utils.toHex(toWei(amount , 18))
  let encodedABI = contract.methods.withdraw(amount).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
        .on('transactionHash', function (hash) {
          console.log('hash', hash);
          if (hash) {
            hashInfo = hash
          }
        })
        .on('receipt', function (receipt) {
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
          resolve()
        })
        .on('error', function (err) {
          let isUserDeny = err.code === 4001
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
          console.log('err' , err)
          reject(err)
        })
    })
    .catch(err=>{
      console.log('Mint',err)
      // let errStr = err.toString()
      // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
      // let unknow = errStr.indexOf(unknowErrMsg) !== -1
      // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
      // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
      window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
      reject(err)
    })
  })
}

export const userHarvest = async function ( amount ){
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.singlePool
  const contract = new web3.eth.Contract(SinglePoolAbi, contractAddress);
  amount = web3.utils.toHex(toWei(amount , 18))
  let encodedABI = contract.methods.harvest(amount).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
          .on('transactionHash', function (hash) {
            console.log('hash', hash);
            if (hash) {
              hashInfo = hash
            }
          })
          .on('receipt', function (receipt) {
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
            resolve()
          })
          .on('error', function (err) {
            let isUserDeny = err.code === 4001
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
            console.log('err' , err)
            reject(err)
          })
    })
        .catch(err=>{
          console.log('Mint',err)
          // let errStr = err.toString()
          // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
          // let unknow = errStr.indexOf(unknowErrMsg) !== -1
          // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
          // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
          window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
          reject(err)
        })
  })
}

export const userNftHarvest = async function ( amount ){
  console.log(amount)
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.nftEarnErc20Pool
  const contract = new web3.eth.Contract(NtfPoolAbi, contractAddress);
  //amount = web3.utils.toHex(toWei(amount , 18))
  let encodedABI = contract.methods.harvest().encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
          .on('transactionHash', function (hash) {
            console.log('hash', hash);
            if (hash) {
              hashInfo = hash
            }
          })
          .on('receipt', function (receipt) {
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
            resolve()
          })
          .on('error', function (err) {
            let isUserDeny = err.code === 4001
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
            console.log('err' , err)
            reject(err)
          })
    })
        .catch(err=>{
          console.log('Mint',err)
          // let errStr = err.toString()
          // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
          // let unknow = errStr.indexOf(unknowErrMsg) !== -1
          // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
          // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
          window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
          reject(err)
        })
  })
}


export const userFarmsStake = async function ( tokenId ){
  console.log(tokenId);
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.nftEarnErc20Pool
  const contract = new web3.eth.Contract(NftPoolAbi, contractAddress);
  let encodedABI = contract.methods.stake( tokenId ).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
        .on('transactionHash', function (hash) {
          console.log('hash', hash);
          if (hash) {
            hashInfo = hash
          }
        })
        .on('receipt', function (receipt) {
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
          resolve()
        })
        .on('error', function (err) {
          let isUserDeny = err.code === 4001
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
          console.log('err' , err)
          reject(err)
        })
    })
    .catch(err=>{
      console.log('Mint',err)
      // let errStr = err.toString()
      // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
      // let unknow = errStr.indexOf(unknowErrMsg) !== -1
      // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
      // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
      window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
      reject(err)
    })
  })
}

export const userFarmsStakeApprove = async function (tokenId ){

  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.nftEarnErc20Pool
  const contract = new web3.eth.Contract(NftPoolAbi, contractAddress);

  let encodedABI = contract.methods.approve(CONFIG.nftMarket,tokenId).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
        .on('transactionHash', function (hash) {
          console.log('hash', hash);
          if (hash) {
            hashInfo = hash
          }
        })
        .on('receipt', function (receipt) {
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
          resolve()
        })
        .on('error', function (err) {
          let isUserDeny = err.code === 4001
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
          console.log('err' , err)
          reject(err)
        })
    })
    .catch(err=>{
      console.log('Mint',err)
      // let errStr = err.toString()
      // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
      // let unknow = errStr.indexOf(unknowErrMsg) !== -1
      // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
      // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
      window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
      reject(err)
    })
  })
}



export const farmsLPApprove = async function (){

  const address = window.newVue.$store.state.base.address;
  const approveAmount =  web3.utils.toHex(toolNumber(1.157920892373163*Math.pow(10 , 59)))
  const contractAddress = CONFIG.singlePool
  const contract = new web3.eth.Contract(tokenAbi, CONFIG.LPToken);

  let encodedABI = contract.methods.approve(CONFIG.singlePool,approveAmount).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: CONFIG.LPToken,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        nonce: web3.utils.toHex(transactionNonce),
        to: CONFIG.LPToken,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
        .on('transactionHash', function (hash) {
          console.log('hash', hash);
          if (hash) {
            hashInfo = hash
          }
        })
        .on('receipt', function (receipt) {
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
          resolve()
        })
        .on('error', function (err) {
          let isUserDeny = err.code === 4001
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
          console.log('err' , err)
          reject(err)
        })
    })
    .catch(err=>{
      console.log('Mint',err)
      // let errStr = err.toString()
      // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
      // let unknow = errStr.indexOf(unknowErrMsg) !== -1
      // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
      // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
      window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
      reject(err)
    })
  })
}


// 授权
export const approve =  function (tokenAddress, otherAddress ,  amount , decimals=18) {
  console.log('tokenAddress',tokenAddress);
  console.log('approveAddress',otherAddress);
  const account = window.newVue.$store.state.base.address;
  const approveAmount = (amount &&  decimals)? web3.utils.toHex(toWei(amount , decimals))  : web3.utils.toHex(toolNumber(1.157920892373163*Math.pow(10 , 59)))
  const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
  const contract = otherAddress || window.newVue.$store.state.base.bankAddress
  const approveEncodedABI = tokenContract.methods
    .approve(contract, approveAmount)
    .encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' , {val:0 ,id:timestamp })
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(account).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateParams = {
        from: account,
        to: tokenAddress, // 池地址
        data: approveEncodedABI, // Required
      }
      let estimateGas = await web3.eth.estimateGas(estimateParams)
        const params = [{
          // chainId: window.newVue.$store.state.base.chainId,
          nonce: web3.utils.toHex(transactionNonce),
          // gasLimit: web3.utils.toHex(6000000),
          gasLimit: web3.utils.toHex(estimateGas),
          gasPrice: web3.utils.toHex(gasPrice),
          to: tokenAddress,
          from: account,
          data: approveEncodedABI
        }];
        web3.eth.sendTransaction(params[0])
        .on('transactionHash', function (hash) {
          console.log('hash', hash);
          if (hash) {
            hashInfo = hash
          }
        })
        .on('receipt', function (receipt) {
          // 交易成功
          window.newVue.$store.dispatch('changeTradeStatus' , {  id:timestamp , val:1 , hash:hashInfo})
          resolve(hashInfo)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
        })
        .on('error', function (err) {
          let isUserDeny = err.code === 4001 
          window.newVue.$store.dispatch('changeTradeStatus' , {  id:timestamp , val:2 , isUserDeny, hash:hashInfo})
          console.log('err' , err)
          reject(err)
        })
      
    });
  })
}



export const userFarmsWithdraw = async function ( tokenId ){
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.nftEarnErc20Pool
  const contract = new web3.eth.Contract(NftPoolAbi, contractAddress);
  let encodedABI = contract.methods.withdraw( tokenId ).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
      //  gas: web3.utils.toHex(estimateGas),
         gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
        .on('transactionHash', function (hash) {
          console.log('hash', hash);
          if (hash) {
            hashInfo = hash
          }
        })
        .on('receipt', function (receipt) {
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
          resolve()
        })
        .on('error', function (err) {
          let isUserDeny = err.code === 4001
          window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
          console.log('err' , err)
          reject(err)
        })
    })
    .catch(err=>{
      console.log('Mint',err)
      // let errStr = err.toString()
      // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
      // let unknow = errStr.indexOf(unknowErrMsg) !== -1
      // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
      // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
      window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
      reject(err)
    })
  })
}

// IDO 100USDT购买1000ANS
export const IDOPayDeposit = async function ( amount=100, inviter_address='0x0000000000000000000000000000000000000000'){
  inviter_address = inviter_address || '0x0000000000000000000000000000000000000000';
  console.log(amount, inviter_address)
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.IDOToken
  const contract = new web3.eth.Contract(IDOAbi, contractAddress);
  // amount = web3.utils.toHex(toWei(amount , 18))
  amount = web3.utils.toHex(toWei(amount , 18))
  console.log(amount, inviter_address);
  let encodedABI = contract.methods.deposit(amount, inviter_address).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
          .on('transactionHash', function (hash) {
            console.log('hash', hash);
            if (hash) {
              hashInfo = hash
            }
          })
          .on('receipt', function (receipt) {
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
            resolve(hashInfo)
          })
          .on('error', function (err) {
            let isUserDeny = err.code === 4001
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
            console.log('err' , err)
            reject(err)
          })
    })
        .catch(err=>{
          console.log('Mint',err)
          // let errStr = err.toString()
          // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
          // let unknow = errStr.indexOf(unknowErrMsg) !== -1
          // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
          // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
          window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
          reject(err)
        })
  })
}

// IDO提取
export const IDOHarvest = async function ( amount ){
  console.log(amount)
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.IDOToken
  const contract = new web3.eth.Contract(IDOAbi, contractAddress);
  amount = web3.utils.toHex(toWei(amount , 18))
  let encodedABI = contract.methods.harvest(amount).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
          .on('transactionHash', function (hash) {
            console.log('hash', hash);
            if (hash) {
              hashInfo = hash
            }
          })
          .on('receipt', function (receipt) {
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
            resolve(hashInfo)
          })
          .on('error', function (err) {
            let isUserDeny = err.code === 4001
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
            console.log('err' , err)
            reject(err)
          })
    })
        .catch(err=>{
          console.log('Mint',err)
          // let errStr = err.toString()
          // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
          // let unknow = errStr.indexOf(unknowErrMsg) !== -1
          // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
          // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
          window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
          reject(err)
        })
  })
}

// IDO USDT 奖励提取
export const IDOUsdtRewardHarvest = async function ( amount ){
  console.log(amount)
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.IDOToken
  const contract = new web3.eth.Contract(IDOAbi, contractAddress);
  amount = web3.utils.toHex(toWei(amount , 18))
  let encodedABI = contract.methods.harvest_reward(amount).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
          .on('transactionHash', function (hash) {
            console.log('hash', hash);
            if (hash) {
              hashInfo = hash
            }
          })
          .on('receipt', function (receipt) {
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
            resolve(hashInfo)
          })
          .on('error', function (err) {
            let isUserDeny = err.code === 4001
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
            console.log('err' , err)
            reject(err)
          })
    })
        .catch(err=>{
          console.log('Mint',err)
          // let errStr = err.toString()
          // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
          // let unknow = errStr.indexOf(unknowErrMsg) !== -1
          // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
          // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
          window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
          reject(err)
        })
  })
}

// IDO ANS 奖励提取
export const IDOAnsRewardHarvest = async function ( amount ){
  console.log(amount)
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.IDOToken
  const contract = new web3.eth.Contract(IDOAbi, contractAddress);
  amount = web3.utils.toHex(toWei(amount , 18))
  let encodedABI = contract.methods.harvest_ANS(amount).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
          .on('transactionHash', function (hash) {
            console.log('hash', hash);
            if (hash) {
              hashInfo = hash
            }
          })
          .on('receipt', function (receipt) {
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
            resolve(hashInfo)
          })
          .on('error', function (err) {
            let isUserDeny = err.code === 4001
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
            console.log('err' , err)
            reject(err)
          })
    })
        .catch(err=>{
          console.log('Mint',err)
          // let errStr = err.toString()
          // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
          // let unknow = errStr.indexOf(unknowErrMsg) !== -1
          // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
          // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
          window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
          reject(err)
        })
  })
}

// IDO 领取NFT奖励
export const IDOClaimNftReward = async function ( amount ){
  console.log(amount)
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.DsgNft
  const contract = new web3.eth.Contract(IDODsgNftABI, contractAddress);
  amount = web3.utils.toHex(toWei(amount , 18))
  let encodedABI = contract.methods.claimNftReward(amount).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
          .on('transactionHash', function (hash) {
            console.log('hash', hash);
            if (hash) {
              hashInfo = hash
            }
          })
          .on('receipt', function (receipt) {
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
            resolve(hashInfo)
          })
          .on('error', function (err) {
            let isUserDeny = err.code === 4001
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
            console.log('err' , err)
            reject(err)
          })
    })
        .catch(err=>{
          console.log('Mint',err)
          // let errStr = err.toString()
          // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
          // let unknow = errStr.indexOf(unknowErrMsg) !== -1
          // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
          // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
          window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
          reject(err)
        })
  })
}


// IDO 绑定推荐关系 单独的
export const IDOBindInvite = async function ( invite_address ){
  console.log(invite_address)
  const address = window.newVue.$store.state.base.address;
  const contractAddress = CONFIG.IDOToken
  const contract = new web3.eth.Contract(IDOAbi, contractAddress);
  // amount = web3.utils.toHex(toWei(amount , 18))
  let encodedABI = contract.methods.invite(invite_address).encodeABI();
  let timestamp = new Date().getTime().toString()
  window.newVue.$store.dispatch('createOrderForm' ,{ val:0 , id:timestamp})
  return new Promise((resolve, reject) => {
    let hashInfo
    web3.eth.getTransactionCount(address).then(async transactionNonce => {
      let gasPrice = await web3.eth.getGasPrice();
      let estimateGas = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data: encodedABI,
      })
      console.log('estimateGas' ,estimateGas)
      const params = [{
        from: address,
        to: contractAddress,
        data: encodedABI,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(estimateGas),
        // gas: web3.utils.toHex(5000000),
      }];
      web3.eth.sendTransaction(params[0])
          .on('transactionHash', function (hash) {
            console.log('hash', hash);
            if (hash) {
              hashInfo = hash
            }
          })
          .on('receipt', function (receipt) {
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:1 , hash:hashInfo})
            resolve(hashInfo)
          })
          .on('error', function (err) {
            let isUserDeny = err.code === 4001
            window.newVue.$store.dispatch('changeTradeStatus' , { id:timestamp , val:2, hash:hashInfo, isUserDeny})
            console.log('err' , err)
            reject(err)
          })
    })
        .catch(err=>{
          console.log('Mint',err)
          // let errStr = err.toString()
          // let tooClose = errStr.indexOf(overTimeErrMsg) !== -1
          // let unknow = errStr.indexOf(unknowErrMsg) !== -1
          // let errType = tooClose ?  'tradetooclose'  : (unknow ?  'unknowErr' : null)
          // window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo ,errType})
          window.newVue.$store.dispatch('changeTradeStatus' , {id:timestamp , val:2, hash:hashInfo})
          reject(err)
        })
  })
}