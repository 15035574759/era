<template>
  <div :class="['pcmain',this.screenWidth >= 600 ?'':'main']">
    <div class="caintner">
      <div class="headerMarket">
        <div class="nav" v-if="souse=='my'">
          Market >
          <span class="color">NFT name（ID:002101）</span>
        </div>
        <div class="nav" v-else>
          <img v-if="activeNav==1" src="@/assets/img/paimai.png" alt />
        </div>
        <div class="goback" @click="goback">
          <img src="@/assets/img/goback.png" alt />
        </div>
      </div>
      <div class="info" style="padding-top:30px">
        <el-row>
          <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
            <div class="marketImg">
              <span>100</span>
              <img src="../../assets/img/xunzhaung1.png" alt />
            </div>
          </el-col>
          <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
            <div class="count">
              <div class="name">NFT name (ID:002101)</div>
              <div class="boxs">
                
                <div class="item">
                  <span>銷售價格（ERA)≈ 816美元</span>
                  <p class="tittleFont">238,647,324</p>
                </div>
              </div>
              <div v-if="souse=='my'">
                 <div class="mystaus" @click="auction">Cancel sale</div>
                 <!-- 多按钮状态 -->
                 <!-- <div class="link">NFT has been sold</div>
                 <div class="bug">Repost the auction</div> -->
              </div>
               <div v-else>
                <div v-if="!connected" class="staus">Connect wallet</div>
                 <!-- 多按钮状态 -->
                <div v-else class="bug" >NFT Not collected</div> 
               </div>
              
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
    <buymarket @getConfirmear="getConfirmear" @getCancel="showBuy = false" :showBuy.sync="showBuy"></buymarket>
   <auctionsell @getCancelNFT="getCancelNFT" @getConfirmshowauction="getConfirmshowauction" @getCancel="showauction = false" :showauction.sync="showauction"></auctionsell>

  </div>
</template>
<script>
import buymarket from "./buymarket.vue";

import auctionsell from "./auctionsell.vue";
import { mapState } from 'vuex';
export default {
  components: {
    buymarket,
    auctionsell
  },
  data() {
    return {
      screenWidth: this.GLOBAL.clientWidth, 
      activeNav: 1,
      showBuy: false,
       actives:null,//当前的id
      souse:"",//来源，区分我的，市场
      showauction:false
    };
  },
  computed:{
    ...mapState({
      connected:state=>state.base.connected
    })
  },
  mounted() {
    this.setDialogWidth();
    this.actives =  this.$route.query.actives
    this.souse = this.$route.query.souse
    console.log(this.screenWidth);
  },
  methods: {
    setDialogWidth() {
    },
   
    //sell
    auction(){
      this.showauction = true
    },
     getConfirmshowauction(){

    },
     getCancelNFT(){
      this.showauction = false
    },
    //era
    getConfirmear(v) {
      console.log(v);
    },
    getConfirmbnb(v) {
      console.log(v);
    },
    //余额不足
    getConfirmlittle(v) {
      console.log(v);
    },
    submitBuy() {
      this.showBuy = true;
    },
    goback() {
      this.$router.go(-1);
    }
  }
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

      .nav {
        margin-top: 10px;
        img {
          max-width: 82px;
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
        padding-left: 20px;
        margin-bottom: 40px;
        .name {
          font-size: 22px;
        }
        .boxs { 
          margin: 24px 0;
          .item {
            .color {
              color: rgba(112, 244, 165, 1);
            }
            p {
              font-size: 22px;
              text-align: left;
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
        .tips {
          margin: 10px;
          text-align: center;
        }
        .btn {
          width: 20%;
          max-width: 88px;
          margin: 20px 0;
          margin-top: 40px;
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
}
.main {
  .caintner {
    width: 90%;
    .info {
      width: 100%;
      .count {
        padding-left: 0;
      }
    }
    .rule {
      width: 100%;
    }
  }
  .caintner .info .marketImg {
    margin: 0 auto;
    width: 90%;
    margin-bottom: 20px;
    height: 300px;
  }
}
</style>