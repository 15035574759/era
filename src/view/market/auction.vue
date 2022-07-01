<template>
  <div class="mask">
    <el-dialog :show-close="false" :visible.sync="centerDialogVisible" :width="dialogWidth" center>
      <div class="main"  :class="['pcmain',this.screenWidth >= 600 ?'':'main']">
        <div class="headerTop tittleFont">
         
          Cancel auction
          <img
            src="../../assets/img/close.png"
            alt
            class="close"
            @click="closemodule"
          />
        </div>
       
        <!-- 質押 -->
        <div class="yabao paimai" >
 

          <div class="iconMain">
            <img src="../../assets/img/xunzhaung1.png" alt class="iconxunzhang" />
            <div class="boxname">
              <div class="name">Power Badge</div>
              <span>ID：002102</span>
            </div>
          </div>
          <div class="listyb">
              <div class="item">
                <div class="textname">Auction countdown</div>
                <span class="count color tittleFont">14 : 32 : 45 .60</span>
              </div>
            <div class="item">
                <div class="textname">Transaction price（ANS)≈ $ 812</div>
                <span class="count tittleFont">238,647,324</span>
              </div>
          </div>
            <p class="tip">The auction end time has not arrived, are you sure you want to cancel the auction?</p>
          <div class="ntfQR">
            <img src="../../assets/img/ntfQRsell.png" alt />
          </div>
         
        </div>
      
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showauction: {
      type: Boolean,
      default: false
    },
    routeQury:{
      type:Number,
       default: 1//默认传1 我的   2是farms
    }
  },
  data() {
    return {
      centerDialogVisible: this.showauction,
      screenWidth: this.GLOBAL.clientWidth,
      dialogWidth: "0",
     
      
    };
  },
  watch: {
    showauction(val) {
      this.centerDialogVisible = val;
    },
    
  },
 
  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
      this.GLOBAL.clientWidth = this.screenWidth;
    };
    this.$nextTick(() => {
      this.screenWidth = document.body.clientWidth;
      this.GLOBAL.clientWidth = this.screenWidth;
    });
    this.setDialogWidth();
  },
  methods: {
    setDialogWidth() {
      if (this.screenWidth < 600) {
        this.dialogWidth = "90%";
      } else {
        this.dialogWidth = 600 + "px";
      }
      console.log("222")
    },
     getConfirmauction(v) {
      this.$emit("getConfirmshowauction", v);
    },
    
    // 点击弹框下的关闭
    closemodule(v) {
      this.$emit("getCancelNFT", v);
    },
    activeTab(v){
      this.activeOption = v
    }
  }
};
</script>
<style scoped lang="less">
.pcmain {
  color: #fff;

.el-dialog--center .el-dialog__body {
  padding: 0;
}
.headerTop {
  text-align: center;
  color: #fff;
  position: relative;
  .goback {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
}
.close {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
 
.taboption{
  display: flex;
  justify-content: space-between;
  div{
    width: 94px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    margin: 20px 0;
    background: url(../../assets/img/mytabno.png) no-repeat center;
 background-size:cover ;
 span{
   margin-left: 3px;
 }
 }
 .activeTab{
    background: url(../../assets/img/mytab.png) no-repeat center;
 background-size:cover ;
 }
}
 
}
.yabao {
  margin-top: 30px;
  .iconMain {
    display: flex;
    justify-content: center;
    align-items: center;
    .iconxunzhang {
      width: 75px;
    }
    .boxname {
      text-align: center;
      margin-left: 10px;
      .name {
        color: rgba(112, 244, 165, 1);
        font-size: 22px;
      }
    }
  }
  .textname {
    text-align: center;
  }
  .listyb{

      display: flex;
      justify-content: space-between;
      margin: 30px auto;
      width: 80%;
      text-align: center;
      .count{
          font-size: 24px;
          margin-top: 10px;
      }
  }
  .tip{
      width: 60%;
      text-align: center;
      margin: 10px auto;
       color: rgba(112, 244, 165, 1);
  }
  .ntfQR {
    margin: 40px auto 0;
    width: 70%;
    img {
      width: 100%;
    }
  }
}
 .main{
     .yabao .listyb{
         display: block;
         .item{
             margin-bottom: 20px;
         }
     }
     .yabao .tip{
         width: 90%;
     }
 }
.color {
  color: rgba(112, 244, 165, 1);
}
</style>