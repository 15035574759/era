<template>
  <div class="mask">
    <el-dialog :show-close="false" :visible.sync="centerDialogVisible" :width="dialogWidth" center @closed="closemodule">
      <div :class="['pcmain',this.screenWidth >= 600 ?'':'main']" >
        <div class="headerTop">
          {{type==='Unstake' ?  'Unstake LP' :'Stake LP'}}
          <img src="../../assets/img/close.png" alt class="close" @click="closemodule" />
        </div>
        <div class="Box">
          <div class="name">
            <span>Input</span>
            <span v-if="type==='Unstake'">Balance:{{lpToken.userDeposit === '0' ? '0' : toFixed(lpToken.userDeposit , 6)}}</span>
            <span v-else v-loading="lpToken.loading">Balance:{{lpToken.balance === '0' ? '0' : toFixed(lpToken.balance , 6)}}</span>
          </div>
          <div class="cantes">
            <!-- <span class="number">0.00</span> -->
            <input
                type="text"
                v-model="LPnum"
                minLength="1"
                maxLength="79"
                placeholder="0.00"
                @input="changeLPNum"/>
            <div class="tip">
              <span @click="putMax">max</span>
              <p>ANS/BNB</p>
            </div>
          </div>
        </div>
        <div class="btnOuter" v-loading="lpToken.loading || trading" v-if="type!=='Unstake'">
          <img  src="../../assets/img/lpmodulebtn_approve.png"
            @click="getApprove"
            v-if="!lpToken.approve"
            alt
            class="submit"
          />
          <img  src="../../assets/img/lpmodulebtnno.png" v-else-if="btnDisbaled" alt class="submit" />
          <img  src="../../assets/img/lpmodulebtn.png"
            @click="getConfirmUp"
            v-else
            alt
            class="submit"
          />
        </div>

        <div class="btnOuter" v-loading="trading" v-else>

          <img  src="@/assets/img/unstake_disable.png" v-if="UnstakeBtnDisabled" alt class="submit" />
          <img  src="@/assets/img/unstake.png"
            @click="getUserUnstake"
            v-else
            alt
            class="submit"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { farmsLPApprove  , userFarmsDeposit , userFarmsUnstake} from '@/wallet/trade'
export default {
  props: {
    showarrowUp: {
      type: Boolean,
      default: true
    },
    type:String
  },
  data() {
    return {
      centerDialogVisible: this.showarrowUp,
      dialogWidth: "0",
      screenWidth: this.GLOBAL.clientWidth,
      LPnum:'',
      actives: true,
      swiperOption: {},

      trading:false

      // lpToken:{
      //   balance:'10'
      // }
    };
  },
  watch: {
    showarrowUp(val) {
      this.centerDialogVisible = val;
      if(this.type!=='Unstake'){
        this.$store.dispatch("getUserBalance")
      }
    }
  },
  computed:{
    ...mapState({
      lpToken:state=>state.base.lpToken
    }),
    btnDisbaled(){
      let balance = isNaN(this.lpToken.balance) ? 0 : Number(this.lpToken.balance)
      return Number(this.LPnum) > balance ||  Number(this.LPnum) === 0
    },
    UnstakeBtnDisabled(){
      let balance = isNaN(this.lpToken.userDeposit) ? 0 : Number(this.lpToken.userDeposit)
      return Number(this.LPnum) > balance ||  Number(this.LPnum) === 0
    }
  },
  created() {},
  mounted() {
    this.setDialogWidth();
  },
  methods: {
    putMax(){
      if(this.lpToken.loading) return
      if(this.type!=='Unstake'){
        this.LPnum = this.toFixed(this.lpToken.balance , 6)
      }else {
        this.LPnum = this.toFixed(this.lpToken.userDeposit , 6)
      }
    },
    changeLPNum(e){
      this.LPnum = this.$inputLimit(e , 6 , true)
    },
    setDialogWidth() {
      if (this.screenWidth < 600) {
        this.dialogWidth = "90%";
      } else {
        this.dialogWidth = 500 + "px";
      }
    },
    // 点击弹框下的关闭
    closemodule(v) {
      this.LPnum = ''
      this.$emit("getCancel");
    },
    getApprove(){
      if(this.trading) return
      this.trading = true
      farmsLPApprove()
      .then(()=>{
        this.$store.commit('setUserBalanceApprove' , true)
      })
      .finally(()=>{
        this.trading = false
      })
    },
    getUserUnstake(){
      if(this.trading) return
      this.trading = true
      userFarmsUnstake(this.LPnum)
      .then(()=>{
        this.$store.dispatch('getFarmsLPPoolInfo' )
        this.closemodule()
      })
      .finally(()=>{
        this.trading = false
      })
    },
    getConfirmUp() {
      if(this.trading) return
      this.trading = true
      userFarmsDeposit(this.LPnum)
      .then(()=>{
        this.$store.dispatch('getFarmsLPPoolInfo' )
        this.closemodule()
      })
      .finally(()=>{
        this.trading = false
      })
    }
  }
};
</script>
<style scoped lang="less">
.pcmain {
  color: #fff;

  .headerTop {
    text-align: center;
    position: relative;
    color: #fff;
  }
  .btnOuter {
    img{
      cursor: pointer;
    }
    ::v-deep{
        .el-loading-mask{
          background-color: rgba(38, 53, 44 , 0.8)
        }
        .el-loading-spinner {
          margin-top: -20px;
          .circular{
            height: 30px;
            width: 30px;
          }
        }
      }
  }
  .Box {
    background: #335741;
    border-radius: 8px;
    padding: 30px 20px;
    margin: 20px 0;
    .name {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      margin-bottom: 10px;
      ::v-deep{
        .el-loading-mask{
          background-color: rgba(51, 87, 65 , .8);
        }
        .el-loading-spinner {
          margin-top: -16px;
          .circular{
            height: 30px;
            width: 30px;
          }
        }
      }
    }
    .cantes {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 30px;
      input {
        flex-grow: 1;
        height: 30px;
        padding: 0;
        margin: 0;
        // padding-left: 10px;
        background-color: transparent;
        border: none;
        outline: none;
        color: #fff;
        font-size: 24px;
        box-sizing: border-box;
        width: calc(100% - 200px);
      }
      input::placeholder{
        color: #fff;
        font-size: 24px;
      }
      .number {
        color: RGBA(111, 136, 120, 1);
        font-size: 24px;
      }
      .tip {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 200px;
        span {
          display: inline-block;
          width: 79px;
          height: 36px;
          text-align: center;
          line-height: 36px;
          border-radius: 20px;
          margin-right: 10px;
          background: RGBA(75, 149, 105, 1);
          cursor: pointer;
          user-select: none;
        }
        p {
          font-size: 24px;
          color: rgba(112, 244, 165, 1);
          white-space: nowrap;
        }
      }
    }
  }
  .submit {
    display: block;
    margin: 0 auto;
    width: 60%;
  }
}
.main {
  .headerTop {
    text-align: center;
    position: relative;
    color: #fff;
    padding: 10px;
  }
}
.close {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
}
</style>
