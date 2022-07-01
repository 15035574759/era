<template>
  <div :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']">
    <div class="caintner">
      <div class="headerMarket">
        <div class="nav">
          {{ souse == "my" ? "My Nft" : "Auction >" }}
          <span class="color">NFT name（ID:002101）</span>
        </div>
        <div class="goback" @click="goback">
          <img src="@/assets/img/goback.png" alt />
        </div>
      </div>
      <div class="info" style="padding-top: 30px">
        <el-row>
          <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
            <div class="marketImg">
              <span>100X</span>
              <img src="../../assets/img/xunzhaung1.png" alt />
            </div>
          </el-col>
          <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
            <div class="count">
              <div class="name">NFT name (ID:002101)</div>
              <div class="box">
                <div class="item">
                  <span>Auction countdown</span>
                  <p class="color">14 : 32 : 45</p>
                  <!-- <P>Deal done</P> -->
                </div>
                <div class="item">
                  <span>Transaction price（ERA)≈ $ 812</span>
                  <p>238,647,324</p>
                </div>
              </div>
              <div v-if="souse == 'my'">
                <div class="mystaus" @click="auction">Cancel auction</div>
                <!-- 多按钮状态 -->
                <!-- <div class="link">NFT has been auctioned</div>
                 <div class="bug">Repost the auction</div> -->
              </div>
              <div v-else>
                <div class="link">NFT has been claimed</div>
                <!-- 多按钮状态 -->
                <!-- <div class="bug" @click="submitBuy">Bid now (price increase 10%)</div>
                <div class="bug" >NFT Not collected</div>
                <div class="staus">Connect wallet</div> -->
              </div>
              <div class="tips">Rebate from last bid 21,780,000 ERA</div>

              <div class="btn">
                <img src="../../assets/img/lsdata.png" alt />
              </div>

              <div class="dataInfo">
                <div class="infoBox">
                  <p class="money">
                    <span>Owner</span>
                    <span class="line">undefined</span>
                  </p>
                  <p class="money">
                    <span>Contract address</span>
                    <span class="line">0x534…3cd45</span>
                  </p>
                  <p class="money">
                    <span>Token ID</span>
                    <span>11</span>
                  </p>
                </div>
                <div class="infoBox">
                  <p class="money">
                    <span>Asset Protocol</span>
                    <span>ERC721</span>
                  </p>
                  <p class="money">
                    <span>Asset public chain</span>
                    <span>BSC</span>
                  </p>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="info">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="table">
              <div class="tbHeader">
                <span>Bid history</span>
                <span>
                  My total rebate:
                  <i>0 ERA</i>
                </span>
              </div>
              <div class="dataTB">
                <div class="tbHeaderTB">
                  <span class="wid1" v-if="this.screenWidth >= 600"
                    >Wallet address</span
                  >
                  <span class="wid2">Hash</span>
                  <span class="wid3">Auction Price (AVS)</span>
                  <span class="wid4" v-if="this.screenWidth >= 600"
                    >Auction time</span
                  >
                  <span class="wid5">Rebate (?)</span>
                  <span class="wid6" v-if="this.screenWidth >= 600">state</span>
                </div>
                <div class="tbody">
                  <div class="dataNo">
                    <img src="../../assets/img/nodata.png" alt />
                    <p class="textNO">No data</p>
                  </div>
                  <div class="item">
                    <span class="wid1" v-if="this.screenWidth >= 600"
                      >1112313213123123121</span
                    >
                    <span class="wid2">13jh…783123sa</span>
                    <span class="colo2 wid3 tittleFont">10,000</span>
                    <span class="wid4">20121.10.02 16:23:43</span>
                    <span
                      class="colo2 wid5 tittleFont"
                      v-if="this.screenWidth >= 600"
                      >238,646,124</span
                    >
                    <span class="wid6 color" v-if="this.screenWidth >= 600"
                      >Deal done</span
                    >
                    <!-- 多状态 -->
                    <!-- <span class="wid6" v-if="this.screenWidth >= 600"
                      >In auction</span
                    > -->
                    <!--<span class="wid6" v-if="this.screenWidth >= 600"
                      >Missed</span
                    > -->
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="rule">
        <h6>Auction Rules</h6>
        <ul>
          <li>
            1. When the countdown is less than 1 hour, each bid will increase by
            10 minutes, and the maximum increase can be 1 hour;
          </li>
          <li>
            2. A fixed price increase of 10% for each auction, after the
            countdown ends, the auction item will be obtained by the last
            bidder;
          </li>
          <li>
            3. 20% of the premium is obtained by the previous bidder, and 80% is
            the income of the auction publisher.
          </li>
          <li>
            4. After the auction is successful, the platform will charge 5% of
            the publisher's revenue as a service fee. Among them, 40% enter the
            NFT mining pool, 50% Swap into ANS tokens enter the repurchase
            wallet, and 10% of the developer's income.
          </li>
          <li>
            5. After the auction is over, the auction publisher can go to the
            finished lot page to receive the proceeds from the auction NFT or
            receive the NFT if the auction is unsuccessful. Note: After the
            bidder receives the NFT, the auction publisher automatically
            receives the proceeds.
          </li>
        </ul>
      </div>
    </div>
    <buymarket
      @getConfirmear="getConfirmear"
      @getCancel="showBuy = false"
      :showBuy.sync="showBuy"
    ></buymarket>

    <marketPMList
      @getConfirmInfo="getConfirmInfo"
      @getCancel="show = false"
      :show.sync="show"
    ></marketPMList>
    <auction
      @getCancelNFT="getCancelNFT"
      @getConfirmshowauction="getConfirmshowauction"
      @getCancel="showauction = false"
      :showauction.sync="showauction"
    ></auction>
  </div>
</template>
<script>
import marketPMList from "./marketPMList.vue";
import buymarket from "./buymarket.vue";

import auction from "./auction.vue";
import { mapState } from 'vuex';

export default {
  components: {
    marketPMList,
    buymarket,
    auction,
  },
  data() {
    return {
      screenWidth: this.GLOBAL.clientWidth,
      activeNav: 1,
      show: false,
      showBuy: false,
      actives: null, //当前的id
      souse: "", //来源，区分我的，市场
      showauction: false,
    };
  },
  computed:{
    ...mapState({
      connected:state=>state.base.connected
    })
  },
  mounted() {
    console.log(this.screenWidth);
    this.actives = this.$route.query.actives;
    this.souse = this.$route.query.souse;
  },
  methods: {
    getConfirmear() {},
    getConfirmInfo(v) {
      console.log(v);
    },
    submitBuy() {
      this.showBuy = true;
    },
    goback() {
      this.$router.go(-1);
    },
    //Cancel auction
    auction() {
      this.showauction = true;
    },
    getConfirmshowauction() {},
    getCancelNFT() {
      this.showauction = false;
    },
  },
};
</script>
<style scoped  lang="less">
img {
  width: 100px;
}
.pcmain {
  background: rgba(19, 29, 23, 1);
  font-size: 12px;
  padding: 110px 0 70px;
  .caintner {
    max-width: 1970px;
    width: 80%;
    margin: 0 auto;
    .headerMarket {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .staus {
        width: 100%;
        max-width: 600px;
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translate(-50%, 0);
        background: url(../../assets/img/maketStatusbj.png) no-repeat center;
        background-size: 50%;
        line-height: 43px;
        height: 43px;
        color: #fff;
        text-align: center;
      }
      .nav {
        margin-top: 10px;
        .color {
          color: rgba(112, 244, 165, 1);
        }
      }
      .goback {
        img {
          width: 100%;
          max-width: 40px;
        }
      }
    }
    .info {
      width: 78%;
      margin: 0 auto;
      .marketImg {
        background: #26352c;
        border-radius: 16px;
        height: 385px;
        position: relative;
        padding: 0 10px;
        margin-bottom: 40px;
        margin-right: 20px;
        span {
          background: rgba(102, 230, 129, 0.33);
          font-size: 20px;
          padding: 5px 10px;
          font-weight: 900;
          border-radius: 30px;
          position: absolute;
          top: 20px;
          left: 20px;
        }
        img {
          display: block;
          position: absolute;
          width: 76%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .count {
        padding: 0 20px;
        margin-bottom: 40px;
        .name {
          font-size: 22px;
        }
        .box {
          display: flex;
          justify-content: space-between;
          margin: 24px 0;
          .item {
            .color {
              color: rgba(112, 244, 165, 1);
            }
            p {
              font-size: 22px;
            }
          }
        }
        .bug {
          background: url(../../assets/img/marketbtnBj.png) no-repeat center;
          background-size: contain;
          line-height: 43px;
          height: 43px;
          color: #333;
          text-align: center;
        }
        .staus {
          background: url(../../assets/img/markeyStatus.png) no-repeat center;
          background-size: contain;
          line-height: 43px;
          height: 43px;
          color: #fff;
          text-align: center;
        }
        .link {
          background: url(../../assets/img/maketStatusbj.png) no-repeat center;
          background-size: contain;
          line-height: 43px;
          height: 43px;
          color: #fff;
          text-align: center;
        }
        .mystaus {
          background: url(../../assets/img/marketmybj.png) no-repeat center;
          background-size: contain;
          line-height: 43px;
          height: 43px;
          color: #fff;
          text-align: center;
        }
        .tips {
          margin: 10px;
          text-align: center;
        }
        .btn {
          width: 20%;
          max-width: 88px;
          margin: 20px 0;
        }
        .dataInfo {
          display: flex;
          justify-content: space-between;
          .infoBox {
            background: #26352c;
            border-radius: 5px;
            width: 42%;
            padding: 2%;
            p {
              line-height: 26px;
              display: flex;
              justify-content: space-between;
              .line {
                text-decoration: underline;
              }
            }
          }
        }
      }

      .table {
        margin-bottom: 40px;
        background: #26352c;
        border-radius: 16px;
        height: 385px;
        padding: 0 10px;
        .tbHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 50px;

          span {
            i {
              font-style: normal;
              color: rgba(112, 244, 165, 1);
            }
          }
        }
        .dataTB {
          .tbHeaderTB {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 50px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.4);
            border-top: 1px solid rgba(0, 0, 0, 0.4);
            span {
            }
          }
          .tbody {
            .dataNo {
              text-align: center;
              padding: 30px;
              img {
                margin: 20px auto;
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
              padding: 10px 0;
              span {
                display: block;
                word-break: break-all;
                white-space: normal;
              }
            }
          }
          .wid3 {
            width: 140px;
          }
        }
      }
    }
    .rule {
      background: #26352c;
      border-radius: 16px;
      padding: 10px 0 30px;
      width: 78%;
      margin: 0 auto;
      h6 {
        margin: 20px 0;
        padding: 0 30px;
      }
      ul {
        padding: 0 30px;
      }
      li {
        line-height: 24px;
      }
    }
  }
  .info .table .dataTB .colo2 {
    color: rgba(112, 244, 165, 1);
  }
}
.main {
  .caintner .info {
    width: 100%;
  }
  .caintner {
    width: 90%;
    .info .count {
      padding: 0;
    }
    .headerMarket .staus {
      width: 80%;
      top: -42px;
    }
    .rule {
      width: 100%;
    }
  }
  .info .table .dataTB .wid3 {
    text-align: center;
  }
  .info .table .dataTB .colo2 {
    color: rgba(112, 244, 165, 1);
  }
  .info .table .dataTB .wid4 {
    color: rgba(112, 244, 165, 1);
  }
  .caintner .info .marketImg {
    margin: 0 auto;
    width: 90%;
    margin-bottom: 20px;
    height: 300px;
  }
}
.wid1 {
  width: 100px;
}
.wid2 {
  width: 71px;
}
.wid3 {
  width: 147px;
}
.wid4 {
  width: 82px;
}
.wid5 {
  width: 77px;
}
.wid6 {
  width: 57px;
}
.wid6.color {
  color: rgba(112, 244, 165, 1);
}
</style>