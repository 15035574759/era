<template>
  <div :class="['pcmain',this.screenWidth >= 600 ?'':'main']">
    <div class="caintner">
      <el-row>
        <div class="headerMarket">
          <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
            <div class="nav">
              <img v-if="activeNav==1" src="@/assets/img/paimai.png" alt @click="activeNavmeth(1)" />
              <img
                v-if="activeNav==2"
                src="@/assets/img/paimaino.png"
                alt
                @click="activeNavmeth(1)"
              />

              <img
                v-if="activeNav==2"
                src="@/assets/img/shichang.png"
                alt
                @click="activeNavmeth(2)"
              />
              <img
                v-if="activeNav==1"
                src="@/assets/img/shichangno.png"
                alt
                @click="activeNavmeth(2)"
              />
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="navRight" v-if="activeNav==1">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  In auction
                  <!-- <img src="" alt=""> -->
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>In auction</el-dropdown-item>
                  <el-dropdown-item>Over</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  Newest Bid
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Latest Bid</el-dropdown-item>
                  <el-dropdown-item>Latest Release</el-dropdown-item>
                  <el-dropdown-item>End Time</el-dropdown-item>
                  <el-dropdown-item>Lowest Price</el-dropdown-item>
                  <el-dropdown-item>Highest Price</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="history" @click="history">
                <img src="@/assets/img/pmls.png" alt />
              </div>
            </div>
            <div class="navRight wids" v-if="activeNav==2">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  Latest Bid
                  <!-- <img src="" alt=""> -->
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Latest Bid</el-dropdown-item>
                  <el-dropdown-item>Lowest Price</el-dropdown-item>
                  <el-dropdown-item>Highest Price</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <div class="history" @click="historyscls">
                <img src="@/assets/img/scls.png" alt />
              </div>
            </div>
          </el-col>
        </div>
      </el-row>

      <div class="main600">
        <el-row>
        
          <el-col 
              :xs="12" :sm="6" :md="6" :lg="6" :xl="6"
              v-for="(item , index)  in market.list"
              :key="item.tokenId">
            <div class="item" @click="clkItem">
              <div class="imgItem">
                 <div>
                  <span>100X</span>
                </div>
                <img :src="item.src" class="xz" alt />
                <p>{{item.name}} </p>
                <p>(ID:{{item.tokenId}})</p>
              </div>
              <div class="infoItme">
                <div class="info">
                  <span>Newest Bid</span>
                  <span class="weight">
                    <img src="@/assets/img/iconMoney.png" alt class="iconMoney" />
                    <span class="weight">333,234,567,676</span> 
                  </span>
                </div>
                <div class="info" v-if="activeNav==1">
                  <span>Time left</span>
                  <span class="weight">12:12:12</span>
                </div>
              </div>
            </div>
          </el-col>
          <!-- <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="item" @click="clkItem">
              <div class="imgItem">
                 <div>
                  <span>100X</span>
                </div>
                <img src="@/assets/img/xunzhaung1.png" class="xz" alt />
                <p>Power Badge </p>
                <p>(ID:002101)</p>
              </div>
              <div class="infoItme">
                <div class="info">
                  <span>Newest Bid</span>
                  <span class="weight">
                    <img src="@/assets/img/iconMoney.png" alt class="iconMoney" />
                    333,234,567,676
                  </span>
                </div>
                <div class="info" v-if="activeNav==1">
                  <span>Time left</span>
                  <span class="weight">12:12:12</span>
                </div>
              </div>
            </div>
          </el-col> -->
         
        </el-row>
      </div>
    </div>
    <marketHpList
      @getConfirmInfoList="getConfirmInfoList"
      @getCancellist="showList = false"
      :showList.sync="showList"
    ></marketHpList>

    <marketPMList @getConfirmInfo="getConfirmInfo" @getCancel="show = false" :show.sync="show"></marketPMList>
  </div>
</template>
<script>
import marketPMList from "./marketPMList.vue";
import marketHpList from "./marketHpList.vue";
import { mapState } from 'vuex';
export default {
  components: {
    marketPMList,
    marketHpList
  },
  data() {
    return {
      screenWidth: this.GLOBAL.clientWidth, 
      activeNav: 1,
      show: false,
      showList: false,
      carouselArr: ["1", "1", "1", "1", "1", "1"]
    };
  },
  mounted() {
    this.setDialogWidth();
    console.log(this.screenWidth);
  },
  computed:{
    ...mapState({
      market:state=>state.base.market
    })
  },
  methods: {
    setDialogWidth() { 
    },
    getConfirmInfoList() {},
    getConfirmInfo(v) {
      console.log(v);
    },
    //选择提升
    clkItem(index, realIndex) {
      this.actives = realIndex;
      if (this.activeNav == 1) {
        this.$router.push({
          path: "/marketInfo",
          query: {
            actives: this.actives
          }
        });
      } else {
        this.$router.push({
          path: "/marketBuyInfo",
          query: {
            actives: this.actives
          }
        });
      }
    },
    activeNavmeth(v) {
      this.activeNav = v;
    },
    history() {
      this.show = true;
    },
    historyscls() {
      this.showList = true;
    }
  }
};
</script>
<style scoped  lang="less">
.pcmain {
  background: rgba(19, 29, 23, 1);
  font-size: 12px;

  .caintner {
    padding: 110px 0 130px;
    max-width: 1970px;
    width: 80%;
    margin: 0 auto;
    .headerMarket {
      .nav {
        margin-top: 10px;
        img {
          width: 50%;
          max-width: 82px;
          cursor: pointer;
        }
      }
      .navRight {
        color: #ffffff;
        background: #26352c;
        border-radius: 16px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: right;
        height: 60px;
        .history {
          width: 100px;
          cursor: pointer;
          img {
            width: 100%;
          }
        }
        .el-dropdown-link {
          color: #fff;
        }
      }
      .wids {
        width: 71%;
        float: right;
      }
    }

    .main600 {
      margin: 30px auto;

      .item {
        margin: 0 10px;
        margin-bottom: 30px;
        .imgItem {
          background: rgba(38, 53, 44, 1);
          border-radius: 20px;
          padding: 20px 15px;
          display: flex;
          flex-flow: column;
          div {
            span {
              float: left;
              background: rgba(102, 230, 129, 0.33);
              padding: 10px 20px;
              border-radius: 50px;
              text-align: center;
              display: inline-block;
            }
          }
          .xz {
            width: 100%;
            display: block;
            margin: 10px auto ;
          }
          p {
            text-align: center;
            line-height: 20px;
          }
        }
        .infoItme {
          background: rgba(38, 53, 44, 1);
          border-radius: 20px;
          padding: 10px;
          margin-top: 20px;
          .info {
            display: flex;
            // flex-flow: column;
            text-align: center;
            justify-content: space-between;
            line-height: 28px;
            img {
              width: 14px;
              vertical-align: middle;
              margin-right: 3px;
            }
            .weight {
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}
.main {
  .caintner {
    width: 100%;
    .headerMarket .nav {
      text-align: center;
      margin-top: 0;
      margin-bottom: 30px;
      img {
        width: 40%;
      }
    }
    .headerMarket .navRight {
      width: 94%;
      margin: 0 auto;
    }
    .main600 .item .imgItem{
      margin-bottom: 10px;
    }
    .main600 .item .imgItem .xz{
      margin: 0 auto ;
    }
    .main600 .item .infoItme {
      margin-top: 10px;
    }
   .main600 .item .infoItme .info{
          flex-direction: column;
          line-height: 20px;
          margin-bottom: 5px;
    }
  }
}
.el-dropdown-menu__item:hover {
  background: none !important;
  font-weight: 500 !important;
  color: rgba(19, 29, 23, 0.8) !important;
}
</style>