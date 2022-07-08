import {getBaseURI  ,
        getBalanceOf ,
        getTokenId ,
        getTokenLevel,
        getMarketSalesAmount,
        getMarketSalesInfo,
        getFarmsBalanceOf,
        isApproved,
        getFarmLPHarvest,
        getFarmLPtotalDeposit,
        getFarmNtfStake,
        getFarmNtfUserInfo,
        getFarmNtfAccShare,
        getFarmLPuserDeposit,
        getFarmNtfTotalMining,
        getAngelValleyMining,
        isNTFApproved} from '@/wallet/inquire'
import CONFIG from '@/wallet/address.js'
import {getAns} from "../wallet/inquire";
export default {
    state:{
        address:'',
        connected: false,
        chainId: null,
        tradeStatus:{
          list:[],
          Current:''
        },
        mintLevel:'',
        userNtfs:{
          list:[],
          loading:true
        },
        baseURI:'',
        market:{
          list:[],
          loading:true
        },
        lpToken:{
          balance:'--',
          approve:false,
          loading:true,
          harvest:'--',
          totalDeposit:'--',
          userDeposit:1,
          infoLoad:true
        },
        farmsNtfs:{
          loading:true,
          list:[],
          tradingIndex:null,
          userPower:'--',
          harvest:'--',
          angelValleyMining:'-',
          totalMining:'-'
        },
    },
    actions:{
      createOrderForm({commit } , info){
        commit('CREATE_ORDER' , info)
      },
      changeTradeStatus({commit , dispatch  , state} , status){
        console.log('改变状态',status)
        commit('CHANGE_TRADESTATUS' , status)

        if(status.val === 1){
          dispatch('showPopUp' , {kind:'success' , hash:status.hash, id:status.id })
        }
        if(status.val === 2){
          dispatch('showPopUp' , {kind:'fail' , isUserDeny:status.isUserDeny , hash:status.hash , id:status.id})
        }
      },
      async getUserNtfs({commit,state}){
        // let url = await getBaseURI()
        commit('resetUserNtfs')
        let balance = await getBalanceOf()
        // console.log(balance);
        balance = Number(balance)
        if(!isNaN(balance) && balance > 0){
          let ntfs = []
          let promiseList = []
          for(let i=0;i<balance;i++){
            promiseList.push(
              new Promise(async (resovle , reject)=>{
                let tokenId = await getTokenId(i)
                let level = await getTokenLevel(tokenId)
                ntfs.push({
                  id:tokenId,
                  level,
                  src:CONFIG.nftImgSrc(level),
                  name:CONFIG.nftName(level),
                  power:CONFIG.nftPower(level),
                  loading:false,
                  approve:false
                })
                resovle()
              })
            )
          }
          Promise.all(promiseList)
          .then(()=>{
            // console.log(ntfs);
            commit('setUserNtfs' , {ntfs} )
          })
        }else {
          commit('setUserNtfs' , {ntfs:[]} )
        }
      },
      async getmarketNtfs({commit,state}){
        let amount = await getMarketSalesAmount()
        console.log();
        if(isNaN(amount) || amount == 0) return
        let leng = Number(amount)
        let ntfs = []
        let promises = []
        for(let i=1;i<leng+1;i++){
          promises.push(
            new Promise( async (resolve , reject)=>{
              let info = await getMarketSalesInfo(i)

              let level = await getTokenLevel(info.tokenId)
              let item = { ...info }
              item.level = level
              item.src=CONFIG.nftImgSrc(level),
              item.name=CONFIG.nftName(level),
              item.power=CONFIG.nftPower(level),
              ntfs.push(item)
              resolve()
            })
          )
        }
        Promise.all(promises)
        .then(()=>{
          console.log('marketList' , ntfs);
          commit('setMarketNtfs' , ntfs )
        })
      },
      async getUserBalance({commit , state}){
        commit('setUserBalance' , {lpbalance:'--', approve:false , loading:true})
        let lpbalance = await getFarmsBalanceOf('LP')
        let approve = await isApproved(CONFIG.LPToken , 18 , lpbalance , CONFIG.singlePool  )
        commit('setUserBalance' , {lpbalance , approve,loading:false})
      },
      async getFarmsLPPoolInfo({commit}){
        commit('setLPPoolInfo' , {harvest:'--' , totalDeposit :'--', infoLoad:true, userDeposit:'--'})
        let harvest = await getFarmLPHarvest()
        let totalDeposit = await getFarmLPtotalDeposit()
        let userDeposit = await getFarmLPuserDeposit()
        commit('setLPPoolInfo' , {harvest , totalDeposit , infoLoad:false , userDeposit})
      },
      async getFarmsNTFStake({commit} , isNotLoadingRefresh){

        !isNotLoadingRefresh && commit('setUserStakeNtfs' , {ntfs:[],loading:true} )
        let stakes = await getFarmNtfStake()
        let userPower = await getFarmNtfUserInfo()
        let angelValleyMining= await getAngelValleyMining()
        let totalMining= await getFarmNtfTotalMining()
        let ans= await getAns()
        // let accShare = await getFarmNtfAccShare()
        if(stakes.length){
          let ntfs = []
          let promiseList = []
          for(let i=0;i<stakes.length;i++){
            promiseList.push(
              new Promise(async (resovle , reject)=>{
                let level = await getTokenLevel(stakes[i])
                ntfs.push({
                  id:stakes[i],
                  level,
                  src:CONFIG.nftImgSrc(level),
                  name:CONFIG.nftName(level),
                  power:CONFIG.nftPower(level),
                })
                resovle()
              })
            )
          }
          Promise.all(promiseList)
          .then(()=>{
              console.log("ntfs",ntfs)
            commit('setUserStakeNtfs' , {ntfs,loading:false , userPower,angelValleyMining,totalMining,ans} )
          })
        }else {
          commit('setUserStakeNtfs' , {ntfs:[],loading:false , userPower,totalMining:0,angelValleyMining:0,ans} )
        }
      },
      async checkUserNtfApprove({commit , state} , id){
        let index = state.userNtfs.list.findIndex(ele=>ele.id===id)
        if(index!==-1){
          // let approve = await isApproved()
        }
      }
    },
    mutations:{
        setUserNtfLoading(state , info){
          const { id , val } = info
          let index = state.userNtfs.list.findIndex(item=>item.id === id)
          if(index !== -1){
            let origin = {...state.userNtfs.list[index]}
            origin.loading = val
            state.userNtfs.list.splice(index , 1 , origin)
          }
        },
        setUserNtfApprove(state, id){
          let index = state.userNtfs.list.findIndex(item=>item.id === id)
          if(index !== -1){
            let origin = {...state.userNtfs.list[index]}
            origin.approve = true
            state.userNtfs.list.splice(index , 1 , origin)
          }
        },
        setFarmsNtfsIndex(state , val){
          state.farmsNtfs.tradingIndex = val
        },
        setUserStakeNtfs(state,info){
          state.farmsNtfs.list = info.ntfs
          state.farmsNtfs.loading = info.loading
          state.farmsNtfs.userPower = info.userPower
          state.farmsNtfs.angelValleyMining = info.angelValleyMining
          state.farmsNtfs.totalMining = info.totalMining
          state.farmsNtfs.ans = info.ans

        },
        setLPPoolInfo(state , info){
          state.lpToken.harvest = info.harvest
          state.lpToken.totalDeposit = info.totalDeposit
          state.lpToken.userDeposit = info.userDeposit
          state.lpToken.infoLoad = info.infoLoad
        },
        setUserBalanceApprove(state , val){
          state.lpToken.approve = val
        },
        setUserBalance(state , info){
          state.lpToken.balance = info.lpbalance
          state.lpToken.loading = info.loading
          state.lpToken.approve = info.approve
        },
        resetUserNtfs(state){
          state.userNtfs.list = []
          state.userNtfs.loading = true
        },
        setMarketNtfs(state , ntfs){
          state.market.list = ntfs
          state.market.loading = false
        },
        setUserNtfs(state , info){
          state.userNtfs.list = info.ntfs
          state.userNtfs.loading = false
          state.baseURI = info.url
        },
        isConnected(state , val){
            state.connected = val
        },
        getChainId(state, value) {
          state.chainId = value;
        },
        getAddress(state, value) {
          state.address = value;
        },
        CREATE_ORDER(state , {val,id}){
          state.tradeStatus.list.push({id , val })
          console.log('tradeStatus' , state.tradeStatus.list);
          state.tradeStatus.Current = id
        },
        CHANGE_TRADESTATUS(state , status){
          if(!status.id) return
          let index = state.tradeStatus.list.findIndex(item=>{
              return item.id === status.id
          })
          if(index !== -1){
            state.tradeStatus.list[index].val = status.val // 1成功 2失败
            status.val === 2 ? state.tradeStatus.list[index].isUserDeny = status.isUserDeny : null
          }
        },
        disconnectMetaMask(state){
          state.connected = false
          state.chainId = null
          state.address = ''
        }
    },
    getters:{
      pendingOrderAmount: state=>{
        let arr = state.tradeStatus.list.filter(ele=> ele.val === 0)
        let leng =  arr.length
        console.log('pendingOrderAmount',leng);
        return leng
      },
    },
}
