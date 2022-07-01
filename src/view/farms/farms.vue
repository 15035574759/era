<template>
  <div :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']">
    <div class="caintner">
      <div class="topimg">
        <img
          src="@/assets/img/farmBj.png"
          v-if="this.screenWidth >= 600"
          alt
          class="banner"
        />
        <img
          src="@/assets/img/farm600.png"
          v-if="this.screenWidth < 600"
          alt
          class="banner"
        />

        <div class="topmain">
          <img src="@/assets/img/logo.png" alt />
          <div class="headertext">
            <p>{{ $t('farms-title-01') }}</p>
            <span>{{ $t('farms-title-02') }}</span>
          </div>
        </div>
      </div>

      <div class="btnabox">
        <img
          src="@/assets/img/NFTbtn.png"
          v-if="activeItem == 1"
          alt
          @click="active(1)"
        />
        <img
          src="@/assets/img/NFTbtnno.png"
          v-if="activeItem == 2"
          alt
          @click="active(1)"
        />
        <img
          src="@/assets/img/LPbtn.png"
          alt
          v-if="activeItem == 2"
          @click="active(2)"
        />
        <img
          src="@/assets/img/LPbtnno.png"
          alt
          v-if="activeItem == 1"
          @click="active(2)"
        />
      </div>
      <div v-show="activeItem == 1">
        <arrowheads></arrowheads>
      </div>
      <div v-show="activeItem == 2">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="boxfarms left" v-loading="lpToken.infoLoad">
              <div class="boxfarmstop">
                <div class="count">{{toFixed(lpToken.totalDeposit , 2)}}</div>
                <p class="intra">{{ $t('farms-RemainingTokens') }}（ANS） ≈ $ 736,259</p>
              </div>
              <div class="boxfarmsmain">
                <div class="peapol">
                  <div class="headeImg">
                    <img
                      v-for="(item, index) in listImg"
                      :key="index"
                      :style="`left:${index * 30 - index * 40}px`"
                      :src="item.img"
                      alt
                    />
                  </div>
                  <div class="name">ANS/BNB</div>
                </div>
                <div class="info">
                  <div class="item">
                    <p>233.12%</p>
                    <span>APR</span>
                  </div>
                  <div class="item">
                    <p>ANS</p>
                    <span>Earn</span>
                  </div>
                </div>
                <div class="change margin0">
                  <p>Harvest (ANS) ≈ $0</p>
                  <div class="mars" >
                    <span>{{toFixed(lpToken.harvest , 2)}}</span>
                    <div :class="['LPcolor',{ 'common_btn_disabled':isNaN(lpToken.harvest) || !Number(lpToken.harvest) }]">
                      <img src="@/assets/img/harvest.png" alt  @click="harvest"/>
                    </div>
                  </div>
                </div>
                <div class="change">
                  <p>
                    {{ $t('farms-Staked') }} (ANS/BNB)
                    <span class="Unstake"
                          v-if="Number(lpToken.userDeposit)"
                          @click="userUnstake"
                          >{{ $t('farms-Unstake') }}</span>
                  </p>
                  <div class="mars">
                    <span>{{toFixed(lpToken.userDeposit , 2)}}</span>
                    <img src="@/assets/img/stake.png" alt @click="goLpstake" />
                  </div>
                </div>
              </div>
            </div>
          </el-col>

          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="boxfarms right">
              <img src="@/assets/img/tip.png" class="tip" alt="" />
              <div class="boxfarmstop">
                <div class="count">253,571</div>
                <p class="intra">Remaining tokens in pool（ANS） ≈ $ 736,259</p>
              </div>
              <div class="boxfarmsmain">
                <div class="peapol">
                  <div class="headeImg">
                    <img
                      v-for="(item, index) in listImg"
                      :key="index"
                      :style="`left:${index * 30 - index * 40}px`"
                      :src="item.img"
                      alt
                    />
                  </div>
                  <div class="name">ANS/Pancake</div>
                </div>
                <div class="info">
                  <div class="item">
                    <p>233.12%</p>
                    <span>APR</span>
                  </div>
                  <div class="item">
                    <p>ANS</p>
                    <span>Earn</span>
                  </div>
                </div>
                <div class="change margin0">
                  <p>Harvest (ANS) ≈ $0</p>
                  <div class="mars">
                    <span>0.00</span>
                  </div>
                </div>
                <div class="change">
                  <p>Staked (ANS/Pancake)</p>
                  <div class="mars">
                    <span>0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col> -->
        </el-row>
      </div>
    </div>

    <farmLpModule
      @getCancel="showarrowUp = false"
      :showarrowUp.sync="showarrowUp"
      :type="LPstakeType"
    ></farmLpModule>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import arrowheads from "../arrowheads/arrowheads";
import farmLpModule from "./farmLpModule";
import {userHarvest} from "../../wallet/trade";
import {toFixed} from "../../utils/tool";
export default {
  components: {
    arrowheads,
    farmLpModule,
  },
  computed:{
    ...mapState({
      lpToken:state=>state.base.lpToken,
    })
  },
  data() {
    return {
      screenWidth: this.GLOBAL.clientWidth,
      listImg: [
        {
          img: require("@/assets/img/heaser11.png"),
        },
        {
          img: require("@/assets/img/header1.png"),
        },
      ],
      activeItem: 1,
      showarrowUp: false,
      LPstakeType:'stake'
    };
  },
  mounted() {

    this.setDialogWidth();
    console.log(this.screenWidth);
  },
  methods: {
    userUnstake(){
      this.LPstakeType = 'Unstake'
      this.showarrowUp = true;
    },
    setDialogWidth() {},
    active(v) {
      this.activeItem = v;
    },
    goLpstake() {
      this.LPstakeType = 'stake'
      this.showarrowUp = true;
    },
    harvest(){
      const harvestAmount = toFixed(this.lpToken.harvest , 2)
      this.trading = true
      userHarvest(harvestAmount)
          .then(()=>{
            this.$store.dispatch('getFarmsLPPoolInfo' )
            this.closemodule()
          })
          .finally(()=>{
            this.trading = false
          })
    }
  },
};
</script>
<style scoped  lang="less">
.pcmain {
  background: rgba(19, 29, 23, 1);
  font-size: 12px;

  .banner {
    max-width: 1600px;
    width: 100%;
    // height: 144px;
    margin: 0 auto;
    display: block;
  }
  .caintner {
    padding: 140px 0;
    max-width: 1970px;
    width: 90%;
    margin: 0 auto 0;
    .topimg {
      position: relative;
      .topmain {
        position: absolute;
        top: 50%;
        height: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        img {
          width: 130px;
        }
        .headertext {
          margin-left: 10px;
          text-align: center;
          p {
            font-size: 30px;
          }
          span {
            font-size: 16px;
          }
        }
      }
    }
    .btnabox {
      margin: 20px;
      img {
        width: 80px;
        cursor: pointer;
      }
    }
    .boxfarms {
      ::v-deep{
        .el-loading-mask{
          background-color: rgba(38, 53, 44 , 0.8);
          border-radius: 16px;
        }
      }
      .boxfarmstop {
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        .count {
          text-align: center;
          font-size: 32px;
          color: rgba(112, 244, 165, 1);
        }
        .intra {
          text-align: center;
        }
      }
      .boxfarmsmain {
        width: 65%;
        margin: 0 auto;
        .peapol {
          display: flex;
          height: 80px;
          align-items: center;
          justify-content: space-between;
          .headeImg {
            img {
              width: 40px;
              position: relative;
            }
          }
          .name {
          }
        }
        .info {
          background: #335741;
          border-radius: 8px;
          display: flex;
          height: 80px;
          align-items: center;

          .item {
            width: 50%;
            text-align: center;
            p {
              font-size: 24px;
              color: rgba(112, 244, 165, 1);
              // margin-bottom: 10px;
            }
          }
        }
        .change {
          margin-top: 20px;
          padding-bottom: 20px;
          .Unstake{
            font-size: .2rem;
            display: inline-block;
            margin-left: 10px;
            color: #70f4a5;
            cursor: pointer;
          }
          p {
          }
          .mars {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            span {
              font-size: 24px;
            }
            img {
              width: 100px;
              cursor: pointer;
            }
          }
        }
        .margin0 {
          padding: 0;
        }
      }
    }
    .left {
      background: #26352c;
      border-radius: 16px;
      margin-right: 10px;
      border: 2px solid #26352c;
    }
    .right {
      border: 2px solid #335741;
      border-radius: 16px;
      margin-left: 10px;
      position: relative;
      .tip {
        position: absolute;
        top: 30px;
        left: 0;
        width: 100px;
        width: 20%;
      }
    }
  }
}
.main {
  padding: 40px 0;
  .caintner {
    width: 95%;
    padding: 40px 0;
    .topimg .topmain {
      width: 100%;
      img {
        width: 100px;
      }
      .headertext p {
        font-size: 20px;
      }
      .headertext span {
        font-size: 12px;
      }
    }

    .logos {
      width: 90px;
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translate(0, -50%);
    }
    .btnabox {
      text-align: center;
      img {
        margin: 0 20px;
      }
    }
    .boxfarms .boxfarmsmain {
      width: 80%;
    }
    .left {
      margin: 0 10px 10px;
    }
    .right {
      margin: 0 10px 10px;
    }
  }
}
</style>
