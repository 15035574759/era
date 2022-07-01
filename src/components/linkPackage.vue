<template>
  <div class="mask">
    <el-dialog :show-close="false" :visible.sync="centerDialogVisible"   :width="dialogWidth" center>
      <div class="main">
        <div class="headerTop tittleFont">
          Wallet Connect
          <img src="../assets/img/close.png" alt class="close" @click="closemodule" />
        </div>
        <div class="list">
          <div :class="['item',active==0? 'active':'']" @click="check(0)">
            <img src="../assets/img/MetamaskLogo.png" alt />
            <span>Metamask</span>
          </div>
          <div :class="['item',active==1? 'active':'']" @click="check(1)">
            <img src="../assets/img/WalletConnect.png" alt />
            <span>WalletConnect</span>
          </div>
<!--           <div :class="['item',active==2? 'active':'']" @click="check(2)">-->
<!--            <img src="../assets/img/TokenPocket.png" alt />-->
<!--            <span>TokenPocket</span>-->
<!--          </div>-->
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
    },
  data() {
    return {
      centerDialogVisible: this.show,
      dialogWidth: 0,
      active: 1,
      screenWidth: this.GLOBAL.clientWidth,
    };
  },
  watch: {
      show(val) {
        this.centerDialogVisible = val;
        this.setDialogWidth();
      }
    },
  created() {
    this.setDialogWidth();
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
  },
  methods: {
    setDialogWidth() {

      if (this.screenWidth &&this.screenWidth < 600) {
        this.dialogWidth = "80%";
         } else {
        this.dialogWidth = 400 + "px";
         }

    },
    check(item) {
      this.active = item;
      //选择
       this.$emit('getConfirm',item);
    },
    // 点击弹框下的关闭
    closemodule(v) {
         this.$emit('getCancel',v);
    }
  }
};
</script>
<style scoped lang="less">
 .tittleFont{

  font-family: "ProximaNova-Xbold.woff";
}
.main {
  color: #fff;
}
.headerTop {
  text-align: center;
  color: #fff;

}
.close {
  width: 25x;
  height: 25px;
  position: absolute;
  right: 26px;
  top: 26px;
}
.list {
  margin-top: 20px;
  .item {
    margin: 10px auto;
    width: 80%;
    height: 56px;
    background: rgba(56, 82, 66, 0.4);
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    cursor: pointer;
    img {
      margin: 0;
      width: 40px
    }
  }
  .item.active {
    background: rgba(42, 193, 101, 0.39);
  }
}
</style>
