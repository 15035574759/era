import { mapState } from 'vuex';
import { connect } from '@/wallet/connectMetaMask'
export default {
    data(){
        return {
        }
    },
    computed:{
        ...mapState({
            connected:state=>state.base.connected,
        }),
    },
    methods:{
        ConnectWallet(){
            connect()
        }
    }
}