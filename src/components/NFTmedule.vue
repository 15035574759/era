<template>
  <div class="mask">
    <el-dialog
      :show-close="false"
      :visible.sync="centerDialogVisible"
      :width="dialogWidth"
      @closed="initModule"
      center

    >
      <div :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']" v-loading="userNtfs.loading">
        <div class="headerTop tittleFont">
          <div class="goback" @click="goback" v-if="avtiveHeader">
            <i class="el-icon-arrow-left"></i>
            My NFT
          </div>
          {{ fatherType === 'FARMS' ? 'Staking NFT' :  (avtiveHeader ? avtiveText : "My NFT") }}
          <img
            src="../assets/img/close.png"
            alt
            class="close"
            @click="closemodule"
          />
        </div>
        <div>
          <div v-if="!avtiveHeader">
            <div class="taboption" v-if="fatherType !== 'FARMS'">
              <div
                :class="activeOption == 1 ? 'activeTab' : ''"
                @click="activeTab(1)"
              >
                ALL<span>{{userNtfs.list.length}}</span>
              </div>
<!--              <div-->
<!--                :class="activeOption == 2 ? 'activeTab' : ''"-->
<!--                @click="activeTab(2)"-->
<!--              >-->
<!--                Auction<span>11</span>-->
<!--              </div>-->
<!--              <div-->
<!--                :class="activeOption == 3 ? 'activeTab' : ''"-->
<!--                @click="activeTab(3)"-->
<!--              >-->
<!--                Sell<span>11</span>-->
<!--              </div>-->
              <div
                :class="activeOption == 4 ? 'activeTab' : ''"
                @click="activeTab(4)"
              >
                Stake<span>{{this.farmsNtfs.list.length}}</span>
              </div>
            </div>
            <p class="ntfNumber" v-if="fatherType === 'FARMS'">
              NTF:
              <span> {{userNtfs.list.length}}</span>
            </p>
            <div class="list">
              <div class="tbHeader">
                <span>name</span>
                <span>ID</span>
               <span>Opeartion</span>
              </div>
              <div class="tbody">
                <div class="dataNo" v-if="!showList.loading&&!showList.list.length">
                  <img src="../assets/img/nodata.png" alt />
                  <p class="textNO">No data</p>
                </div>
                <div
                  v-for="(item , index) in showList.list"
                  :key="index"
                  class="item" >
                  <div
                    :class="[
                      'width1',
                      dialogWidth == '90%' ? 'width1active' : '',
                    ]"
                  >
                    <img :src="item.src" alt />
                    <p>{{item.name}}</p>
                  </div>
                  <div class="width2">{{item.id}}</div>
                  <div :class="['width3', dialogWidth == '90%' ? 'width3active' : '']" v-if="fatherType === 'FARMS'">
                    <img v-if="!item.approve" src="../assets/img/ya_approve.png" alt @click="LPStakeNtfApprove(item)" /> 
                    <img v-else src="../assets/img/ya.png" alt @click="LPStakeNtf(item)" />
                    <!-- <img src="../assets/img/ya.png" alt @click="checkDetail(3 , index)" /> -->
                 </div>
                 <!-- <div :class="['width3', dialogWidth == '90%' ? 'width3active' : '',]" v-else> -->
<!--                    &lt;!&ndash; <img src="../assets/img/paimai.png" alt @click="check(1)" /> &ndash;&gt;-->
<!--                    &lt;!&ndash; <img src="../assets/img/sell.png" alt  @click="checksell(2)"/> &ndash;&gt;-->
<!--                    <img src="../assets/img/paimai.png" alt @click="checkDetail(1 , index)" />-->
<!--                    <img src="../assets/img/sell.png" alt  @click="checkDetail(2 , index)"/>-->
<!--&lt;!&ndash;-->
<!--                    <img src="../assets/img/shichang.png" alt @click="checkDetail(1)" v-if="routeQuryDetail==2" />-->
<!--                    <img src="../assets/img/sellD.png" alt @click="checkDetail(2)" v-if="routeQuryDetail==2" /> &ndash;&gt;-->
                 <!-- </div> -->
                 <!-- </div> -->
                </div>
                <!-- <div class="item">
                  <div
                    :class="[
                      'width1',
                      dialogWidth == '90%' ? 'width1active' : '',
                    ]"
                  >
                    <img src="../assets/img/xunzhaung1.png" alt />
                    <p>泉水琉璃勛章</p>
                  </div>
                  <div class="width2">200</div>
                  <div
                    :class="[
                      'width3',
                      dialogWidth == '90%' ? 'width3active' : '',
                    ]"
                  >
                    <img
                      src="../assets/img/sellD.png"
                      alt
                      @click="checkDetail(2)"
                      v-if="routeQuryDetail == 2"
                    />
                  </div>
                </div> -->
              </div>
            </div>
          </div>
          <!-- 出售 -->
          <div class="yabao paimai" v-if="avtiveHeader == 2">
            <div class="iconMain">
              <img
                :src="userNtfs.list[stakingIndex].src"
                alt
                class="iconxunzhang"
              />
              <div class="boxname">
                <div class="name">{{userNtfs.list[stakingIndex].name}}</div>
                <span>ID：{{userNtfs.list[stakingIndex].id}}</span>
              </div>
            </div>
            <div class="margin0">
              <div class="textname">Starting price</div>
              <div class="exchange">
                <input
                type="text"
                v-model="sellNum"
                minLength="1"
                maxLength="79"
                placeholder="0.00"
                @input="changeSellNum"/>
                <!-- <span class="color">372136129361</span> -->
                <span class="tittleFont">≈ $ 2812</span>
              </div>
            </div>

            <div class="ntfQR" v-loading="sellAuctionLoading">
              <img v-if="sellAuctionaApprove" src="../assets/img/ntfQRsell.png" alt @click="sellNtf"/>
              <img v-else src="../assets/img/lpmodulebtn_approve.png" alt   @click="sellNtfApprove" />
            </div>
            <div class="rule">
              <h6>Note</h6>
              <ul>
                <li>
                  1、注意事項說明注意事項說明注意事項說明，注意事項說明注意事項說明注意事項說明注意事項說明，注意事項說明注意事項說明注意事項說明
                </li>

                <li>
                  1、注意事項說明注意事項說明注意事項說明，注意事項說明注意事項說明注意事項說明注意事項說明，注意事項說明注意事項說明注意事項說明
                </li>
              </ul>
            </div>
          </div>
          <!-- 拍卖 -->
          <div class="yabao paimai" v-if="avtiveHeader == 1">
            <div class="iconMain">
              <img
                src="../assets/img/xunzhaung1.png"
                alt
                class="iconxunzhang"
              />
              <div class="boxname">
                <div class="name">{{userNtfs.list[stakingIndex].name}}</div>
                <span>ID：{{userNtfs.list[stakingIndex].id}}</span>
              </div>
            </div>
            <div class="margin0">
              <div class="textname">Starting price</div>
              <div class="exchange">
                <input
                type="text"
                v-model="exchangeNum"
                minLength="1"
                maxLength="79"
                placeholder="0.00"
                @input="changeExchangeNum"/>
                <!-- <span class="color">372136129361</span> -->
                <span class="tittleFont">≈ $ 2812</span>
              </div>
            </div>
            <div class="margin0">
              <div class="textname">Initial countdown</div>
              <div class="slcount">
                <span @click="time = 1" :class="time === 1 ? 'bjtime' : ''">12小时</span>
                <span @click="time = 2" :class="time === 2 ? 'bjtime' : ''">24小时</span>
              </div>
            </div>
            <div class="margin0">
              <div class="textname">
                Bid range:：
                <span class="color">10% fixed price increase</span>
              </div>
            </div>
            <div class="ntfQR" v-loading="sellAuctionLoading">
              <img v-if="sellAuctionaApprove" src="../assets/img/ntfQR.png" alt @click="auctionNtf"/>
              <img v-else src="../assets/img/lpmodulebtn_approve.png" alt   @click="auctionNtfApprove" />
            </div>
            <div class="rule">
              <h6>Note</h6>
              <ul>
                <li>
                  1、注意事項說明注意事項說明注意事項說明，注意事項說明注意事項說明注意事項說明注意事項說明，注意事項說明注意事項說明注意事項說明
                </li>

                <li>
                  1、注意事項說明注意事項說明注意事項說明，注意事項說明注意事項說明注意事項說明注意事項說明，注意事項說明注意事項說明注意事項說明
                </li>
              </ul>
            </div>
          </div>
          <!-- 质押 -->
          <div class="yabao paimai" v-if="avtiveHeader == 3">
            <div class="iconMain">
              <img
                :src="userNtfs.list[stakingIndex].src"
                alt
                class="iconxunzhang"
              />
              <div class="boxname">
                <div class="name">{{userNtfs.list[stakingIndex].name}}</div>
                <span>ID：{{userNtfs.list[stakingIndex].id}}</span>
              </div>
            </div>
            <div class="stake">
              <p>Mining power</p>
              <p class="number">+ {{userNtfs.list[stakingIndex].power}}</p>
            </div>
            <div class="ntfQR" v-loading="userNtfs.list[stakingIndex].loading">
              <img
                  v-if="!userNtfs.list[stakingIndex].approve"
                  src="../assets/img/lpmodulebtn_approve.png"
                  @click="LPStakeNtfApprove(userNtfs.list[stakingIndex])" />
              <img
                  v-else
                  src="../assets/img/arrowUp.png" alt
                  @click="LPStakeNtf(userNtfs.list[stakingIndex])" />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { userFarmsStake , userNtfSellApprove , userNtfSell} from "@/wallet/trade"
import { mapState } from 'vuex'
import CONFIG from '@/wallet/address.js'
export default {
  props: {
    showNFT: {
      type: Boolean,
      default: false,
    },
    routeQury: {
      type: Number,
      default: 1, //默认传1 我的   2是farms
    },
    fatherType:{
      type:String,
      default:'APP'
    },
    tardeIndex:{
      type:[String,Number]
    },
    // itemData:{
    //   type:Object,
    //   default:()=>{return {}}
    // }
  },
  data() {
    return {
      centerDialogVisible: this.showNFT,
      screenWidth: this.GLOBAL.clientWidth,
      dialogWidth: "0",
      avtiveHeader: "", //1是押宝 2 是拍卖
      avtiveText: "",
      time: 1,
      routeQurydata: this.routeQury,
      activeOption: 1,
      routeQuryDetail: 2, //详情
      exchangeNum:'',
      sellNum:'',


      stakingIndex:0,
      sellAuctionaApprove:false,
      sellAuctionLoading:false
    };
  },
  watch: {
    showNFT(val) {
      this.centerDialogVisible = val;
      if(val){
        this.setDialogWidth();
      }
    },
    routeQury(val) {
      this.routeQurydata = val;
    },
  },
  computed:{
    ...mapState({
      userNtfs:state=>state.base.userNtfs,
      farmsNtfs:state=>state.base.farmsNtfs,

    }),
    showList(){
      switch(this.activeOption){
        case 4:
          return this.farmsNtfs
          break;
        default :
          return this.userNtfs
          break;
      }
    }
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
    sellNtf(){
      console.log(this.sellNum);
      if(this.sellAuctionLoading || this.sellNum === '' || !Number(this.sellNum)) return
      this.sellAuctionLoading = true
      let now = Math.floor(new Date().getTime() / 1000)
      userNtfSell(
          this.userNtfs.list[this.stakingIndex].id ,
          '999999999',
          this.sellNum ,
          now,
          86400,
          CONFIG.DsgNft,
          CONFIG.DSGToken
      )
      .then(()=>{
        this.$store.dispatch('getUserNtfs' )
        this.initModule()
      })
      .finally(()=>{
        this.sellAuctionLoading = false
      })
    },
    auctionNtf(){
      console.log(this.exchangeNum);
      if(this.sellAuctionLoading || this.exchangeNum === '' || !Number(this.exchangeNum)) return
      this.sellAuctionLoading = true
      let now = Math.floor(new Date().getTime() / 1000)
      userNtfSell(
          this.userNtfs.list[this.stakingIndex].id ,
          '999999999',
          this.exchangeNum ,
          now,
          this.time === 1 ? 43200  : 86400,
          CONFIG.DsgNft,
          CONFIG.DSGToken
      )
      .then(()=>{
        this.$store.dispatch('getUserNtfs' )
        this.initModule()
      })
      .finally(()=>{
        this.sellAuctionLoading = false
      })
    },
    auctionNtfApprove(){
      if(this.sellAuctionLoading) return
      this.sellAuctionLoading = true
      userNtfSellApprove(this.userNtfs.list[this.stakingIndex].id , CONFIG.nftMarket)
      .then(()=>{
        this.sellAuctionaApprove = true
      })
      .finally(()=>{
        this.sellAuctionLoading = false
      })
    },
    sellNtfApprove(){
      if(this.sellAuctionLoading) return
      this.sellAuctionLoading = true
      userNtfSellApprove(this.userNtfs.list[this.stakingIndex].id , CONFIG.nftMarket)
      .then(()=>{
        this.sellAuctionaApprove = true
      })
      .finally(()=>{
        this.sellAuctionLoading = false
      })
    },
    changeSellNum(e){
      this.sellNum = this.$inputLimit(e , 6 , true)
    },
    changeExchangeNum(e){
      this.exchangeNum = this.$inputLimit(e , 6 , true)
    },
    initModule(){
      this.avtiveText = "";
      this.avtiveHeader = null;
      this.$store.commit('setFarmsNtfsIndex' , '--')
      this.$emit('getCancelNFT')
    },
    LPStakeNtfApprove(item){
      if(item.approve || item.loading) return
      item.loading = true
      userNtfSellApprove(item.id , CONFIG.nftEarnErc20Pool)
      .then(()=>{
        this.$store.commit('setUserNtfApprove' , item.id)
        this.$store.commit('setFarmsNtfsIndex' , this.tardeIndex)
      })
      .finally(()=>{
        this.$store.commit('setUserNtfLoading' , {id:item.id, val:false})
      })
    },
    LPStakeNtf(item){
      if(item.loading) return
      item.loading = true
      userFarmsStake(item.id)
      .then(()=>{
        this.$store.dispatch('getFarmsNTFStake' , true)
        this.$store.dispatch('getUserNtfs')
        this.initModule();

      })
      .finally(()=>{
        this.$store.commit('setUserNtfLoading' ,  {id:item.id, val:false})
      })
    },
    setDialogWidth() {
      if (this.screenWidth < 600) {
        this.dialogWidth = "90%";
      } else {
        this.dialogWidth = 600 + "px";
      }
    },
    goback() {
      this.avtiveText = "";
      this.avtiveHeader = null;
    },
    check(item) {
      console.log(item);
      //选择按钮 押宝 拍卖
      this.$emit("getConfirmNFT", item);
    },
    checksell(index) {
      this.$emit("getConfirmNFTsell", index);
    },
    //checkDetail
    checkDetail(v , index) {
      this.sellAuctionaApprove = false
      this.avtiveHeader = v
      this.stakingIndex = index

      if(v === 3){ // 质押Ntf
        this.$store.dispatch('checkUserNtfApprove' ,this.userNtfs.list[this.stakingIndex].id )
      }
    },

    // 点击弹框下的关闭
    closemodule(v) {
      this.$emit("getCancelNFT", v);
    },
    activeTab(v) {
      this.activeOption = v;
    },
  },
};
</script>
<style scoped lang="less">

.pcmain {
  color: #fff;
  ::v-deep{
    .el-loading-mask{
      left: -25px;
      right: -25px;
      top: -25px;
      bottom: -30px;
      background-color: rgba(38, 53, 44, .9) ;
      // background-color: rgba(0, 0, 0, .6) ;
    }
  }
  .el-dialog--center .el-dialog__body {
    padding: 0;
  }
  .headerTop {
    text-align: center;
    color: #fff;
    position: relative;
    height: 20px;
    padding-bottom: 10px;
    font-weight: 600;
    .goback {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      cursor: pointer;
    }
  }
  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    top: 0;
    // transform: translate(0, -50%);
    cursor: pointer;
  }
  // .count {
  //   text-align: right;
  //   margin: 20px 0;
  // }
  .ntfNumber{
    text-align: right;
    padding: 10px 0;
    margin-bottom: 10px;
    span{
      display: inline-block;
      margin-left: 8px;
    }
  }
  .taboption {
    display: flex;
    //justify-content: space-between;
    justify-content: flex-start;
    div {
      width: 94px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      margin: 20px 0;
      margin-left: 10px;
      background: url(../assets/img/mytabno.png) no-repeat center;
      background-size: cover;
      cursor: pointer;
      user-select: none;
      span {
        margin-left: 3px;
      }
    }
    .activeTab {
      background: url(../assets/img/mytab.png) no-repeat center;
      background-size: cover;
    }
  }
  .list {
    max-height: 200px;
    overflow-y: auto;
    .tbHeader {
      display: flex;
      justify-content: space-between;
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
        margin-top: 10px;
        .width1 {
          width: 40%;
          text-align: left;
          p {
            display: inline-block;
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
          width: 20%;
          text-align: right;
        }
        .width3 {
          width: 40%;
          text-align: right;
          img {
            width: 35%;
            margin-left: 2%;
            padding: 0;
            vertical-align: middle;
            cursor: pointer;
          }
          ::v-deep{
            .el-loading-mask{
              height: 100%;
              width: 36%;
              top: 0;
              left: 64%;
              background-color: rgba(38, 53, 44 , .8);
              .el-loading-spinner{
                margin-top: -14px;
                .circular{
                  height: 30px;
                  width: 30px;
                }
              }
            }
          }
        }
        .width3active {
          width: 40%;
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
.yabao {
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
  .stake {
    text-align: center;
    padding-bottom: 20px;
    p {
      font-size: 16px;
    }
    .number{
      height: 50px;
      padding:0 20px;
      border-radius: 25px;
      line-height: 50px;
      text-align: center;
      display: inline-block;
      background-color: #478E63;
      margin-top: 20px;
      font-size: 24px;
    }
  }
  .textname {
    text-align: center;
  }
  .slcount {
    display: flex;
    justify-content: center;
    span {
      margin: 10px 0;
      padding: 5px 10px;
      background: rgba(102, 230, 129, 0.33);
      text-align: center;
      font-size: 16px;
      user-select: none;
      cursor: pointer;
      border-radius: 20px;
    }
  }
  .ntfQR {
    margin: 20px auto 0;
    width: 80%;
    ::v-deep{
            .el-loading-mask{
              height: 100%;
              width: 100%;
              top: 0;
              left: 0;
              background-color: rgba(38, 53, 44 , .8);
              .el-loading-spinner{
                margin-top: -26px;
                .circular{
                  height: 40px;
                  width: 40px;
                }
              }
            }
          }
    img {
      width: 100%;
      cursor: pointer;
    }
  }
}
.paimai {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100% + 10px);
  padding-right: 10px;
  .iconMain {
    margin: 20px 0;
  }

  .margin0 {
    margin-bottom: 30px;
  }
  .slcount {
    justify-content: inherit;
    span {
      margin-right: 10px;
      background: 0;
      padding: 0;
      display: block;
      width: 88px;
      height: 34px;
      line-height: 34px;
    }
    .bjtime {
      background: url(../assets/img/btnBj.png) no-repeat center;
      background-size: cover;
    }
  }
  .textname {
    text-align: left;
    margin-bottom: 10px;
  }
  .exchange {
    background: RGBA(29, 41, 34, 1);
    border-radius: 5px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 18px;
    input {
        flex-grow: 1;
        height: 60px;
        padding: 0;
        margin: 0;
        // padding-left: 10px;
        background-color: transparent;
        border: none;
        outline: none;
        color: #fff;
        font-size: 24px;
        box-sizing: border-box;
        width: calc(100% - 240px);
      }
      input::placeholder{
        color: #fff;
        font-size: 24px;
      }
  }
}
.paimai::-webkit-scrollbar {
/*滚动条整体样式*/
    width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    border-radius:   5px 0  0 5px ;
}
.paimai::-webkit-scrollbar-thumb {
/*滚动条里面小方块*/
    border-radius: 5px;
    // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #818A85;
}
.paimai::-webkit-scrollbar-track {
/*滚动条里面轨道*/
    border-radius: 5px;
    background   : #26352c;
}
.color {
  color: rgba(112, 244, 165, 1);
}
.main {
  .taboption div {
    background-size: contain;
    font-size: 12px;
  }
  .taboption .activeTab {
    background: url(../assets/img/mytab.png) no-repeat center;
    background-size: contain;
  }
}

&::-webkit-scrollbar {
  // 滚动条的背景
  width: 14px;
  //background: #191a37;
  height: 14px;
}

&::-webkit-scrollbar-track,
&::-webkit-scrollbar-thumb {
  border-radius: 999px;
  width: 20px;
  border: 5px solid transparent;
}

&::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px #191a37 inset;
}

&::-webkit-scrollbar-thumb {
  //滚动条的滑块样式修改
  width: 20px;
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px #464e4b inset;
}

&::-webkit-scrollbar-corner {
  background: #191a37;
}

</style>
