<template>
  <div class="mask">
    <el-dialog :show-close="false" :visible.sync="centerDialogVisible" :width="dialogWidth" center>
      <div class="main">
        <div class="headerTop">
          <img src="../../assets/img/close.png" alt class="close" @click="closemodule" />
        </div>

        <el-row >
          <el-col :xs="24" :md="6" :lg="6" :xl="6">
            <div    :class="['left', this.screenWidth >= 600 ? '' : 'leftmain']">
              <img :src="itemlist.icon" alt />
              <p>{{itemlist.name}}</p>
            </div>
          </el-col>
          <el-col :xs="24" :md="16" :lg="16" :xl="16">
            <div class="right">
              <div class="info">
                <h6>Introduction</h6>
                <p>{{itemlist.info}}</p>
              </div>
              <div class="count">
                <h6>Attributes</h6>
                <div
                  :class="['bj',this.screenWidth >= 600 ?'':'bj600']"
                  :style="`background: url(${bjIMg}) no-repeat center;background-size: contain;`"
                >
                  <div class="item">
                    <img src="@/assets/img/shux1.png" alt />
                    <span>{{itemlist.countinfo}}</span>
                    <p>Total Supply</p>
                  </div>
                  <div class="item">
                    <img src="@/assets/img/shux2.png" alt />
                    <span>ordinary</span>
                    <p>Manufacturing grade</p>
                  </div>
                  <div class="item">
                    <img src="@/assets/img/shux3.png" alt />
                    <span>LV.{{itemlist.level}}</span>
                    <p>Rare level</p>
                  </div>

                </div>
              </div>
            </div>
          </el-col>
        </el-row>
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
    itemData:{
      type:Object,
      default: {}
    }
  },
  data() {
    return {
      centerDialogVisible: this.show,
      dialogWidth: "0",
      screenWidth: this.GLOBAL.clientWidth,
      bjIMg: require("@/assets/img/shuxbj1.png"),
      itemlist:{}
    };
  },
  watch: {
    show(val) {
      this.centerDialogVisible = val;
      this.itemlist = this.itemData
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
        this.bjIMg = require("@/assets/img/shuxbj.png")
      } else {
        this.dialogWidth = 800 + "px";
        this.bjIMg = require("@/assets/img/shuxbj1.png")
      }
    },
    // 点击弹框下的关闭
    closemodule(v) {
      this.$emit("getCancel", v);
    }
  }
};
</script>
<style scoped lang="less">
.main {
  color: #fff;
  padding: 20px 0 0 0;

  .left {
    margin-right: 10px;
    text-align: center;
    img {
      width: 100%;
    }
    p {
      text-align: center;
      //font-weight: 900;
    }
  }
  .leftmain{
     margin-right:  0;
     margin-bottom: 20px;
      img {
      width: 40%;
    }
    p{
      font-weight: bolder;
    }
  }

  .right {
    .info {
      margin-bottom: 30px;
      p {
        //font-weight: 800;
        color: #ffffff;
        line-height: 18px;
      }
    }
    h6 {
      margin: 0;
      margin-bottom: 10px;
      color: #70f4a5;
      font-size: 16px;
    }

    .count {
      .bj {
        display: flex;
        justify-content: space-between;
        padding: 20px 40px;
        .item {
          img {
            width: 20px;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
        span {
          color: #70f4a5;
          font-weight: bolder;
        }
        p {
          margin: 10px 0;
          text-align: center;
        }
      }
      .bj600{
           padding: 15px 20px;
           text-align: center;
           p {
          margin: 2px 0;
          text-align: center;
          font-size: 12px;
        }
      }
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
