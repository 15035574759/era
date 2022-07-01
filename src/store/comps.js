export default {
    state:{
        
        popUpList:[],
        showPending:false,
        showConstruction:false,
        // tardeList:[],
    },
    mutations:{
        
        SHOW_POPUP(state , status){
            state.popUpList.push({...status})
            console.log('state.popUpList' , state.popUpList);
        },
        CLOSE_POPUP(state , {id , kind}){
            if(kind === 'pending'){
                state.showPending = false
            }else if(kind === 'construction'){
                state.showConstruction = false
            }


            let index = state.popUpList.findIndex(item=>{
                return item.id === id
            })
            if(index !== -1){
                state.popUpList.splice(index,1)
            }
        },
        SHOW_PENDING(state){
            state.showPending = true
        },
        SHOW_CONSTRUCTION(state){ 
            state.showConstruction = true
        },
        // REFRESH_TL(state , list){
        //     state.tardeList = list
        // }
    },
    actions:{
        showPopUp({commit } , status){
            commit('SHOW_POPUP' , status)
        },
        showPendingPopUp({commit}){
            commit("SHOW_PENDING")
        },
        closePopUp({commit} , status){
            commit('CLOSE_POPUP' , status)
        },
        // refreshTradeList({commit , rootState }){
        //     let list = []
        //     let address = rootState.base.address
        //     try {
        //         let lcList = JSON.parse(localStorage.getItem('tdl'))
        //         if(lcList && Array.isArray(lcList[address]) && lcList[address].length){
        //             list = lcList[address]
        //         }
        //     }catch(err){
        //         console.log('compsTradeList_err',err)
        //     }
        //     commit('REFRESH_TL' , list)
        // }
    }
}