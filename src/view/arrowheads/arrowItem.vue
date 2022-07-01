<template>
  <div class="mask">
    <el-dialog :show-close="false" :visible.sync="centerDialogVisible" :width="dialogWidth" center @closed="initModule">
      <div :class="['pcmain',this.screenWidth >= 600 ?'':'main']">
        <div class="headerTop">
          Upgrade HashRate
          <img src="../../assets/img/close.png" alt class="close" @click="initModule" />
        </div>
        <div class="Box">
          <div class="money">
            <img src="../../assets/img/arrowIcon.png" alt />
            <div>
              <p>13,253,571</p>
              <span>Balance（ERA）</span>
            </div>
          </div>
          <div class="tip">No handling fee will be charged after the end of the 7-day lock-up period</div>
          <div class="time">
            （Time Remaining：
            <span>120:12:12</span> ）
          </div>
          <div class="list">
            <div class="item">
              <div class="name">Fee：</div>
              <span>200 ERA</span>
            </div>
            <div class="item">
              <div class="name">receivedable：</div>
              <span>200 ERA</span>
            </div>
          </div>
          <div class="imgOuter" v-loading="btnLoading">
            <img src="../../assets/img/arrowQR.png" alt class="submit" @click="cancalStake"/>
          </div>
          <div class="time">Note: a penalty of 10% of the position will be executed if you cancel hashrate in advance (7 days)，all fines will go into the ore pool.</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { userFarmsWithdraw } from '@/wallet/trade'
export default {
  props: {
    showarrowItem: {
      type: Boolean,
      default: false
    },
    itemData:{
      type:Object,
      default:()=>{return {}}
    }
  },
  data() {
    return {
      centerDialogVisible: this.showarrowItem,
      dialogWidth: "0",
      screenWidth: this.GLOBAL.clientWidth,
      bjIMg: require("@/assets/img/shuxbj1.png"),
      btnLoading:false
    };
  },
  watch: {
    showarrowItem(val) {
      this.centerDialogVisible = val;
    }
  },
  created() {},
  mounted() {
    this.setDialogWidth();
  },
  methods: {
    setDialogWidth() {
      if (this.screenWidth < 600) {
        this.dialogWidth = "90%";
        this.bjIMg = require("@/assets/img/shuxbj.png");
      } else {
        this.dialogWidth = 600 + "px";
        this.bjIMg = require("@/assets/img/shuxbj1.png");
      }
    },
    initModule(){
      this.$emit("getCancel");
    },
    cancalStake(){
      if(this.btnLoading) return 
      this.btnLoading = true
      userFarmsWithdraw(this.itemData.id)
      .then(()=>{
        this.initModule()
        this.$store.dispatch('getFarmsNTFStake' , true)
      })
      .finally(()=>{
        this.btnLoading = false
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
    color: #fff;
  }
  .close {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 26px;
    top: 26px;
  }
  .Box {
    .money {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 32px 0;
      text-align: center;
      img {
        width: 80px;
        margin-right: 20px;
      }
      p {
        color: rgba(112, 244, 165, 1);
        font-size: 30px;
        margin: 0;
      }
    }
    .tip {
      text-align: center;
    }
    .imgOuter{
      ::v-deep{
        .el-loading-mask{
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          background-color: rgba(38, 53, 44 , .8);
          .el-loading-spinner{
            margin-top: -26px;
            .circular{
              height: 40px;
              width: 40px;
            }
          }
        }
      }
    }
    .time {
      text-align: center;
      margin-top: 10px;
      span {
        color: rgba(112, 244, 165, 1);
      }
    }
    .list {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        span {
            font-size: 20px;
          color: rgba(112, 244, 165, 1);
        }
      }
    }
    .submit {
      display: block;
      margin: 0 auto;
      width: 60%;
    }
    .zhu {
      text-align: center;
    }
  }
}
.el-dialog--center .el-dialog__body {
  padding: 0;
}

.close {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 26px;
  top: 26px;
}
</style>