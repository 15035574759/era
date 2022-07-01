<template>
  <div class="mask">
    <el-dialog :show-close="false" :visible.sync="centerDialogVisible" :width="dialogWidth" center>
      <div :class="['pcmain',this.screenWidth >= 600 ?'':'main']">
        <div class="headerTop">
          Auction confirmation
          <img src="../../assets/img/close.png" alt class="close" @click="closemodule" />
        </div>
        <div class="moduleMain">
          <div class="boxBtn">
            <img src="../../assets/img/ans.png" alt @click="getConfirmear" />
            <img src="../../assets/img/buyMbnb.png" alt @click="getConfirmbnb" />
          </div>
          <p>238,647,324</p>
          <div class="tips">Price (ANS)≈ $ 816</div>
           <img @click="submitok" v-if="isMoney" src="../../assets/img/arrowUp.png" alt class="bugMBtn" />
         
          <img  src="../../assets/img/bugMBtn.png" v-if="!isMoney" alt class="bugMBtn" />
          <div class="text">
            <span class="color">Purchase $ ANSA</span>
            <span>balance：0.0000 ANS</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showBuy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      centerDialogVisible: this.showBuy,
      dialogWidth: "0",
      screenWidth: this.GLOBAL.clientWidth,
      bjIMg: require("@/assets/img/shuxbj1.png"),
      list: ["1"],
      isMoney:false,
      activeNav: 1
    };
  },
  watch: {
    showBuy(val) {
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
        this.dialogWidth = 400 + "px";
        this.bjIMg = require("@/assets/img/shuxbj1.png");
      }
    },
    // 点击弹框下的关闭
    closemodule(v) {
      this.$emit("getCancel", v);
    },
    getConfirmear(inde) {
      //查看详情
      this.$emit("getConfirmear", inde);
    },
    getConfirmbnb(inde) {
      //查看详情
      this.$emit("getConfirmbnb", inde);
    },
    
    submitok(inde) {
      //确认
      this.$emit("getConfirmlittle", inde);
    }
  }
};
</script>
<style scoped lang="less">
.pcmain {
  color: #fff;
  .moduleMain {
    margin-top: 20px;
    .boxBtn {
      display: flex;
      justify-content: space-between;
      width: 80%;
      margin: 0 auto;
      img {
        width: 40%;
      }
    }
    p {
      font-size: 32px;
      text-align: center;
      margin: 20px 0 10px;
    }
    .tips {
      text-align: center;
    }
    .bugMBtn {
      width: 98%;
      display: block;
      margin: 30px auto 10px;
    }
    .text {
      display: flex;
      justify-content: space-between;
      .color {
        color: rgba(112, 244, 165, 1);
        text-decoration: underline;
      }
    }
  }
}
.el-dialog--center .el-dialog__body {
  padding: 0;
}
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

.main {
}
</style>