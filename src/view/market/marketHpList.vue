<template>
  <div class="mask">
    <el-dialog :show-close="false" :visible.sync="centerDialogVisible" :width="dialogWidth" center>
      <div :class="['pcmain',this.screenWidth >= 600 ?'':'main']">
        <div class="headerTop">
          Market history
          <img src="../../assets/img/close.png" alt class="close" @click="closemodule" />
        </div>

        <div class="navHearder">
          <el-row>
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="btnBox">
                <!-- 全部 -->
                <img v-if="activeNavtable==1" src="@/assets/img/all.png" alt @click="navtable(1)"/>
                <img v-if="activeNavtable!=1" src="@/assets/img/allno.png" alt @click="navtable(1)"/>

                <img v-if="activeNavtable==2" src="@/assets/img/release.png" alt @click="navtable(2)"/>
                <img v-if="activeNavtable!=2" src="@/assets/img/releaseno.png" alt @click="navtable(2)"/>

                <img v-if="activeNavtable==3" src="@/assets/img/partic.png" alt @click="navtable(3)"/>
                <img v-if="activeNavtable!=3" src="@/assets/img/particno.png" alt @click="navtable(3)"/>
              </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="navRight">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    Bid history
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>n Auction</el-dropdown-item>
                    <el-dropdown-item>Ended</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="list" v-if="this.screenWidth >= 600">
          <div class="tbHeader">
            <span class="windthFixd">NFT</span>
            <span>Price(ERA)</span>
            <span>time</span>
            <span>Status</span>
            <span class="windthFixd3">Operate</span>
          </div>
          <div class="tbody">
            <div class="dataNo" v-if="list.length=0">
              <img src="../../assets/img/nodata.png" alt />
              <p class="textNO">No data</p>
            </div>
            <div class="item">
              <div class="width1">
                <img src="../../assets/img/xunzhaung1.png" alt />
                <p>
                  <span>Power Badge</span>
                  <span>（#002102）</span>
                </p>
              </div>
              <div class="width2 color tittleFont">200</div> 
              <div class="width2 color tittleFont">200</div>
              <div class="width2">Auction</div>
              <div class="width3">
                <img src="../../assets/img/detail.png" alt />
              </div>
            </div>
          </div>
        </div>
        <div class="list2" v-if="this.screenWidth < 600">
          <div class="tbHeader">
            <span class="windthFixd">NFT</span>
            <span>Latest Bid (AVS)</span>
            <span class="windthFixd3">operate</span>
          </div>
          <div class="tbody">
            <div class="dataNo" v-if="list.length=0">
              <img src="../../assets/img/nodata.png" alt />
              <p class="textNO">No datas</p>
            </div>
            <div class="item">
              <div class="width1">
                <img src="../../assets/img/xunzhaung1.png" alt />
                <p>
                  <span>Medal of Spring…</span>
                  <span>（#002102）</span>
                </p>
              </div>
              <div class="wid2">
                <span style="margin-bottom:17px">3,234,237,676</span>
                <span>In auction</span> 
              </div>
              <div class="wid3">
                <img src="../../assets/img/detail.png" style="margin-bottom:17px" alt />
                <!-- <span>NFT Not collected</span> -->
              </div>
            </div>
            <div class="item">
              <div class="width1">
                <img src="../../assets/img/xunzhaung1.png" alt />
                <p>
                  <span>Medal of Spring…</span>
                  <span>（#002102）</span>
                </p>
              </div>
              <div class="wid2">
                <span style="margin-bottom:17px">3,234,237,676</span>
              
                <span class="color">Deal done</span>
              </div>
              <div class="wid3">
                <img src="../../assets/img/detail.png" style="margin-bottom:17px" alt />
                <!-- <span>NFT Not collected</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      centerDialogVisible: this.showList,
      dialogWidth: "0",
      screenWidth: this.GLOBAL.clientWidth,
      bjIMg: require("@/assets/img/shuxbj1.png"),
      list: ["1"],
      activeNavtable: 1,
      
    };
  },
  watch: {
    showList(val) {
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
        this.dialogWidth = 800 + "px";
        this.bjIMg = require("@/assets/img/shuxbj1.png");
      }
    },
    // 点击弹框下的关闭
    closemodule(v) {
      this.$emit("getCancellist", v);
    },
    check(inde) {
      //查看详情
      this.$emit("getConfirmInfoList", inde);
    },
    navtable(v){
      this.activeNavtable = v
    }
  }
};
</script>
<style scoped lang="less">
.pcmain {
  color: #fff;

  .navHearder {
    width: 100%;
    margin: 28px 0;
    .btnBox {
      img {
        width: 80px;
        max-width: 20%;
      }
    }
    .navRight {
      text-align: right;
      color: #fff;
      background: rgba(38, 53, 44, 1);
      border-radius: 16px;
      .el-dropdown-link {
        color: #fff;
      }
    }
  }
  .list {
    max-height: 400px;
height: 400px;
    .tbHeader {
      display: flex;
      justify-content: space-between;
      span {
        width: 18%;
        text-align: center;
      }
      .windthFixd {
        width: 26%;
        text-align: left;
        // max-width: 200px;
      }
      .windthFixd3 {
        width: 20%;
        max-width: 200px;
        text-align: right;
      }
    }
    .color {
      color: rgba(112, 244, 165, 1);
    }
    .tbody {
      .dataNo {
        text-align: center;
        padding: 30px;
        img {
          margin: 0 auto;
          width: 90px;
          height: 56px;
        }
        .textNO {
          line-height: 20px;
          font-size: 16px;
          padding: 0;
          margin: 0;
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        .width1 {
          width: 26%;
          max-width: 200px;
          text-align: left;
          display: flex;
          align-items: center;
          p {
            margin: 0;
            margin-left: 10px;
            span {
              display: block;
            }
          }
          img {
            width: 50%;
            max-width: 46px;
            margin: 0;
            padding: 0;
            vertical-align: middle;
          }
        }
        .width1active {
          display: flex;
          align-items: center;
          p {
            width: 50%;
            margin-left: 3%;
          }
        }
        .width2 {
          width: 18%;
          text-align: center;
        }
        .width3 {
          width: 20%;
          text-align: right;
          img {
            width: 50%;
            margin-left: 2%;
            padding: 0;
            vertical-align: middle;
          }
        }
        .width3active {
          width: 20%;
          text-align: right;
          img {
            width: 60%;
            margin-bottom: 2%;
            padding: 0;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
.el-dialog--center .el-dialog__body {
  padding: 0;
}
 
.count {
  text-align: right;
  margin: 20px 0;
}

 
.main {

  .navHearder {
    margin-bottom: 0;
    span{
      flex: 1;
    }
  }
  .navHearder .btnBox {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    img {
      width: 30%;
      max-width: 30%;
    }
  }
  .navHearder .navRight {
    text-align: left;
    margin: 20px 0;
    border-radius: 16px;
    background: rgba(38, 53, 44, 1);
    padding: 10px 20px;
  }

  // .list .tbody .item .width1 {
  //   flex-direction: column; //修改主轴方向
  //   flex-wrap: wrap; //开启自动换行
  //   text-align: left;
  //   p {
  //     margin-left: 0;
  //   }
  // }
  .list2 {
    max-height: 400px;
    height: 400px;
    .tbHeader {
      display: flex;
      justify-content: space-between;
    }
    .tbody {
      .dataNo {
        text-align: center;
        padding: 30px;
        img {
          margin: 0 auto;
          width: 90px;
          height: 56px;
        }
        .textNO {
          line-height: 20px;
          font-size: 16px;
          padding: 0;
          margin: 0;
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 10px;
        font-family: "Futura-Book-2" !important;
        .width1 {
          display: flex;
          text-align: left;
          flex: 1;
          img {
             
            height: 30px;
            max-width: 46px;
            margin: 0;
            padding: 0;
            vertical-align: middle;
            margin-right: 3%;
          }
          p {
            display: flex;
            flex-direction: column;
          }
        }
        .wid2 {
          text-align: center;
          display: flex;
          flex-direction: column;
          flex: 1;
          .color{
           color: rgba(112, 244, 165, 1)
          }
        }
        .wid3 {
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          flex: 1;
          img {
            width: 50%;
          }
        }
      }
    }
  }
}
.headerTop {
  text-align: center;
  color: #fff;
  position: relative;
  line-height: 40px;
  font-weight: 900;
}
.close {
  width: 25px;
  height: 25px;
  position: absolute;
 right: 20px;
  top: 50%;
  transform: translate(0,-50%);
}
</style>