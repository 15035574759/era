<template>
  <div :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']">
    <div class="caintners">
      <!-- <div class="topimg" v-if="this.screenWidth >= 600" >
        <img src="@/assets/img/bannerarrbig.png" alt class="banner"   />
        <img src="@/assets/img/logo.png" alt class="logo" />
      </div>-->

      <el-row>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="left">
            <!-- :class="['pool', this.screenWidth >= 600?'':'toppoll']" -->
            <div class="pool">
              <div class="title">{{ $t('farms-AngelMiningPool') }}</div>
              <div class="count tittleFont">{{farmsNtfs.angelValleyMining}}</div>
              <!-- <p class="yu">Remaining prize pool(ANS) ≈ $6,170,505</p> -->

            </div>

            <div class="rule">
              <div class="poolLeft">
                <div>
                  <span class="tittleFont">{{farmsNtfs.totalMining}}</span>
                  <p>{{ $t('farms-TotalMiningPower') }}</p>
                </div>
                <!-- <div>
                  <span class="tittleFont">13,253,571</span>
                  <p>Total Staked Amount</p>
                </div> -->
                <!-- <div>
                  <span class="tittleFont">13,253,571</span>
                  <p>Total Staked Tokens(ANS) ≈ $9,201,761</p>
                </div> -->
                <div>
                  <span class="tittleFont">{{farmsNtfs.ans}}</span>
                  <p>(ANS)≈$0</p>
                </div>
              </div>
              <div class="poolRight">
                <div>
                  <span class="tittleFont">{{farmsNtfs.userPower.userPower}}</span>
                  <p>{{ $t('farms-MyMiningPower') }}</p>
                </div>
                <!-- <div>
                  <span class="tittleFont">{{farmsNtfs.list.length}}</span>
                  <p>My Staked Amount</p>
                </div> -->
                <!-- <div>
                  <span class="tittleFont">13,253,571</span>
                  <p>My Staked Tokens(ANS)≈ $0</p>
                </div> -->
                <div :class="['LPcolor',{ 'common_btn_disabled':isNaN(farmsNtfs.ans) || !Number(farmsNtfs.ans) }]">
                  <img src="@/assets/img/harvest.png" alt @click="harvest"/>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <div class="right">
            <el-row v-loading="farmsNtfs.loading">

              <el-col
                :xs="12"
                :sm="6"
                :md="6"
                :lg="6"
                :xl="6"
                :key="key"
                v-for="(item, key) in list"
              >
                <div class="contentbox">
                  <div :class="['boxtop']">
                    <div class="lefts">{{ $t('farms-PositionHashRate') }}：{{ key + 1 }}</div>
                  </div>
                  <!-- 两个状态图 -->
                  <div class="imhgs">
                    <img v-if="item.src" :src="item.src" alt class="yuansu active" />
                    <img v-else :src="item.iconsamll" alt class="yuansu" />
                  </div>

                  <!-- 三个状态 -->
                  <span v-if="item.status===0">{{ $t('farms-unlocked') }}</span>
                  <span v-else-if="item.status===1">{{ $t('farms-Confirming') }}</span>
                  <span v-else class="color">{{ $t('farms-HasUnlocked') }} +{{item.power}} {{ $t('farms-power') }}</span>

                  <div class="info">
                    <!-- 对应三种状态的按钮状态 -->
                    <img v-if="item.status === 0" src="@/assets/img/arrowbtn1.png" alt  @click="openshowNFT(key)" />
                    <img v-else-if="item.status === 1" src="@/assets/img/arrowbtn1ing.png" alt   />
                    <img v-else src="@/assets/img/arrowbtn1no.png" alt class="nocurp" />
                    <img src="@/assets/img/arrowbtn2.png" alt @click="qxslz(item)" />

                    <!-- <img src="@/assets/img/arrowbtn2.png" alt @click="qxslz" />

                    <img src="@/assets/img/arrowbtn2.png" alt @click="qxslz" /> -->
                  </div>
                </div>
              </el-col>

            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <arrowItem
      @getConfirmInfo="getConfirmInfo"
      @getCancel="showarrowItem = false"
      :showarrowItem.sync="showarrowItem"
      :itemData="cancalItem"
    ></arrowItem> -->
    <UnStake
      @getConfirmInfo="getConfirmInfo"
      @getCancel="showarrowItem = false"
      :showarrowItem.sync="showarrowItem"
      :itemData="cancalItem"
    ></UnStake>
    <!-- <arrowUpItem
      @getConfirmUp="getConfirmUp"
      @getCancel="showarrowUp = false"
      :showarrowUp.sync="showarrowUp"
    ></arrowUpItem>-->
    <NFTmedule
      @getConfirmNFT="getConfirmNFT"
      @getCancelNFT="initNRTmodule"
      :showNFT.sync="showNFTs"
      fatherType="FARMS"
      :routeQury="2"
      :tardeIndex="activeStake"
    ></NFTmedule>
  </div>
</template>
<script>
import arrowItem from "./arrowItem.vue";
import UnStake from './Unstake.vue'

import NFTmedule from "../../components/NFTmedule.vue";
import { mapState } from 'vuex';
import {toFixed} from "../../utils/tool";
import {userHarvest, userHarvest1, userNftHarvest} from "../../wallet/trade";
// import arrowUpItem from "./arrowUpItem.vue";
export default {
  components: {
    arrowItem,
    NFTmedule,
    UnStake
    // arrowUpItem
  },
  data() {
    return {
      isStartExtract: false, //是否开始领取
      screenWidth: this.GLOBAL.clientWidth,
      showarrowItem: false, //arrowItem
      showarrowUp: false,
      arrowbtn1: 1,
      arrowbtn2: true,
      qxslshow: true, //取消算力的显示
      list: [
        {
          bjimh: require("@/assets/img/xzBj1.png"),
          iconsamll: require("@/assets/img/arrowIcon1.png"),
          level: null,
          countinfo: 1900,
          status:0,
        },
         {
          bjimh: require("@/assets/img/xzBj2.png"),
          iconsamll: require("@/assets/img/arrowIcon2.png"),
          level: null,
          countinfo: 1900,
          status:0,
        },
         {
          bjimh: require("@/assets/img/xzBj3.png"),
          iconsamll: require("@/assets/img/arrowIcon3.png"),
          level: null,
          countinfo: 1900,
          status:0,
        },
         {
          bjimh: require("@/assets/img/xzBj4.png"),
          iconsamll: require("@/assets/img/arrowIcon4.png"),
          level: null,
          countinfo: 1900,
          status:0,
        },
         {
          bjimh: require("@/assets/img/xzBj5.png"),
          iconsamll: require("@/assets/img/arrowIcon5.png"),
          level: null,
          countinfo: 1900,
          status:0,
        },
         {
          bjimh: require("@/assets/img/xzBj6.png"),
          iconsamll: require("@/assets/img/arrowIcon6.png"),
          level: null,
          countinfo: 1900,
          status:0,
        },
         {
          bjimh: require("@/assets/img/xzBj6.png"),
          iconsamll: require("@/assets/img/arrowIcon7.png"),
          level: null,
          countinfo: 1900,
          status:0,
        },
         {
          bjimh: require("@/assets/img/xzBj6.png"),
          iconsamll: require("@/assets/img/arrowIcon8.png"),
          level: null,
          countinfo: 1900,
          status:0,
        },
      ],
      // list:this.GLOBAL.list,//全局的list数据
      showNFTs: false,
      activeStake:'0',
      cancalItem:{}
    };
  },
  computed:{
    ...mapState({
      farmsNtfs:state=>state.base.farmsNtfs,
      userNtfs:state=>state.base.userNtfs,
    })
  },
  watch:{
    "farmsNtfs.list":{
      immediate:true,
      handler(val){
        if(val.length){
          this.list.forEach((item , index)=>{
            let origin = { ...item }
            if(val[index]){
              origin.level = val[index].level
              origin.src = val[index].src
              origin.id = val[index].id
              origin.power = val[index].power
              origin.status = 2 // 0 unlocked  1 confirming  2 stake
            }else {
              origin.level = ''
              origin.src = ''
              origin.id = ''
              origin.status = 0
            }
            this.list.splice(index , 1 , origin)
          })
        }else {
          this.list.forEach(item=>{
            item.level = ''
            item.src = ''
            item.id = ''
            item.status = 0
          })
        }
      }
    },
    "farmsNtfs.tradingIndex":{
      handler(val){
        console.log('tradingIndex',val);
        if(!isNaN(val) && this.list[val]){
          let origin = { ...this.list[val] }
          origin.status = 1
          this.list.splice(val , 1 , origin)
        }else {
          let index = this.list.findIndex(ele=>ele.status === 1)
          if(index !== -1){
            let origin = { ...this.list[index] }
            origin.status = 0
            this.list.splice(index , 1 , origin)
          }
        }
      }
    }
  },
  mounted() {
    this.setDialogWidth();
  },
  methods: {
    initNRTmodule(){
      this.showNFTs = false
    },
    setDialogWidth() {},
    getConfirmInfo() {},
    getConfirmUp() {},
    //取消算力值
    qxslz(item) {
      console.log(item)
      if(item.status !== 2) return
      this.showarrowItem = true;
      this.cancalItem = { ...item }
    },
    //up
    upslz() {
      this.showarrowUp = true;
    },
    openshowNFT(v) {
      this.activeStake = v
      this.showNFTs = true;
      this.$store.dispatch('getUserNtfs' )
    },
    getConfirmNFT() {},
    harvest() {
      if(!this.isStartExtract) {
        this.$notify({
          message: "Invite address is invalid",
          type: "error",
        });
        return false;
      }
      const harvestAmount = this.farmsNtfs.ans
      this.trading = true
      userNftHarvest(harvestAmount)
          .then(()=>{
            this.$store.dispatch('getFarmsNTFStake' , true)
          })
          .finally(()=>{
            this.trading = false
          })
    }
  },
};
</script>
<style scoped  lang="less">
.LPcolor{
  overflow: hidden;
}
.pcmain {
  background: rgba(19, 29, 23, 1);
  font-size: 12px;

  .banner {
    max-width: 1970px;
    width: 100%;
    height: 144px;
    margin: 0 auto;
    display: block;
    margin-bottom: 30px;
  }
  .caintners {
    // padding: 140px 0;
    max-width: 1970px;

    margin: 0 auto 0;
    .topimg {
      position: relative;
      .logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .left {
      //   width: 28%;
      .pool {
        text-align: center;
        padding: 10px 0;
        .title {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .count {
          font-size: 40px;
           margin-bottom: 10px;
        }
      }
      .rule {
        display: flex;
        justify-content: left;
        background: #26352c;
        border-radius: 16px;
        padding: 12px;
         margin-top: 20px;
        p {
          margin: 0;
        }
        .poolLeft {
          display: flex;
          flex-direction: column; //修改主轴方向
          flex-wrap: wrap; //开启自动换行
          width: 50%;
          span {
            font-size: 20px;
            font-weight: 800;
          }
          div {
            margin-bottom: 20px;
          }
        }

        .poolRight {
          width: 50%;
          display: flex;
          flex-direction: column; //修改主轴方向
          flex-wrap: wrap; //开启自动换行
          span {
            font-size: 24px;
            font-weight: 800;
            color: #70f4a5;
          }
          div {
            margin-bottom: 18px;
          }
          img {
            width: 60%;
            cursor: pointer;
          }
        }
      }
    }
    .right {
      //   width: 70%;

      ::v-deep{
        .el-loading-mask {
          background-color: rgba(19, 29, 23,0.8);
        }
      }
      .contentbox {
        background: #26352c;
        border-radius: 16px;
        display: flex;
        flex-direction: column; //修改主轴方向
        flex-wrap: wrap; //开启自动换行
        padding: 10px 0;
        margin: 0 0 20px 20px;
        font-size: 12px;
        .imhgs {
          width: 100%;
          height: 100px;
          position: relative;
        }
        .yuansu {
          width: 65%;
          display: block;
          /* margin: 5px auto; */
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .yuansu.active {
          width: 45%;
        }
        .info {
          display: flex;
          justify-content: space-around;
          align-items: center;
          img {
            width: 37%;
            margin: 10px 0;
            cursor: pointer;
          }
          .nocurp{
            cursor: default;
          }
        }

        .boxtop {
          display: flex;
          justify-content: center;
          padding: 0 10px;
          margin-bottom: 5px;
          .lefts {
            height: 30px;
            padding: 0 10px;
            line-height: 30px;
            text-align: center;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 21px;
          }
          .rights {
            height: 30px;
            padding: 0 10px;
            line-height: 30px;
            text-align: center;
            background: rgba(237, 41, 73, 1);
            border-radius: 21px;
          }
        }

        .boxtops2 {
          display: flex;
          justify-content: space-between;
        }

        span {
          margin: 0 auto;
          text-align: center;
        }
        .color {
          color: rgba(112, 244, 165, 1);
          font-size: 12px;
        }
      }
    }
  }
}
.tittleFont {
  font-family: "ProximaNova-Xbold.woff" !important;
}
.main {
  // padding: 140px 0;
  .caintners {
    width: 95%;

    // padding: 50px 0;
    .left .rule .poolRight span,
    .left .rule .poolLeft span {
      font-size: 18px;
    }
    .left .toppoll {
      position: fixed;
      width: 100%;
      top: 76px;
      z-index: 99;

      background: url("../../assets/img/bannerarrbj.png") no-repeat center;
      background-size: cover;
      .title {
        font-size: 12px;
      }
      .count {
        font-size: 20px;
      }
      .yu {
        font-size: 12px;
        padding: 0;
        margin: 0;
      }
    }
    .logos {
      width: 90px;
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translate(0, -50%);
    }
    .right {
      margin-top: 30px;
      .contentbox {
        margin: 5px;
      }
    }
  }
}
</style>
