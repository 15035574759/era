<template>
  <div :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']">
    <div class="caintner">
      <div
        class="banner"
        :style="`background-image: url(${bannerbjIMg});background-size: cover;`"
      >
        <div class="countdown">
          <div>{{ day + "d" }}</div>
          <div>{{ hr + "h" }}</div>
          <div>{{ min + "m" }}</div>
          <div>{{ sec + "s" }}</div>
        </div>
      </div>
      <el-row :gutter="20" class="buy-box">
        <el-col :span="screenWidth >= 600 ? 12 : 24">
          <div class="left">
            <div style="text-align: center">100 USDT get 1000 ANS</div>
            <div class="approved-pay" v-if="isApproved">
              <img src="@/assets/img/ido/approved-yes.png" alt :width="screenWidth >= 600 ? 100 : 80" />
              <span>Approved</span>&nbsp;&nbsp;
              <div class="pay-yes">Pay</div>
            </div>
            <div class="approved-pay" v-if="!isApproved">
              <img src="@/assets/img/ido/approved-no.png" alt :width="screenWidth >= 600 ? 100 : 80" />
              <span style="color: #ffffff">Unapproved</span>&nbsp;&nbsp;
              <div class="pay-no" style="width:150px;">Pay</div>
            </div>
            <div class="approved-pay-steps">
              <el-steps
                :align-center="true"
                :space="100"
                :active="1"
                finish-status="success"
              >
                <el-step title=""></el-step>
                <el-step title=""></el-step>
              </el-steps>
            </div>
          </div>
        </el-col>
        <el-col
          :span="24"
          v-if="screenWidth < 600"
          style="height: 30px; width: 100%"
        ></el-col>
        <el-col :span="screenWidth >= 600 ? 12 : 24">
          <div class="right">
            <div style="text-align: center">IDO</div>
            <div class="input" style="width: 100%">
              <el-input v-model="idoObtainedValue" placeholder="请输入内容">
                <div slot="suffix" @click="IDOExtractClick()" class="extract">Extract</div>
                &nbsp;&nbsp;
                <div slot="suffix" class="details" @click="IDODetailsClick()">Details</div>
              </el-input>
            </div>
            <div class="input" style="width: 100%">
              <el-input v-model="idoReleasedValue" placeholder="请输入内容">
                <div slot="suffix" class="details" @click="IDOReleaseDetailsClick()">Details</div>
              </el-input>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="rewards">
        <el-col :span="24">
          <img src="@/assets/img/ido/rewards.png" alt width="300" />
        </el-col>
      </el-row>
      <el-row :gutter="20" class="buy-box">
        <el-col :span="screenWidth >= 600 ? 12 : 24">
          <div class="left">
            <div style="text-align: center">ANS</div>
            <div class="input">
              <el-input v-model="ansRewardValue" placeholder="请输入内容">
                <div slot="suffix" class="details" @click="ANSRewardDetailsClick()">Details</div>
              </el-input>
            </div>
            <div class="">
              <div class="extract-max" @click="ANSExtractClick()">Extract</div>
            </div>
          </div>
        </el-col>
        <el-col
          :span="24"
          v-if="screenWidth < 600"
          style="height: 30px; width: 100%"
        ></el-col>
        <el-col :span="screenWidth >= 600 ? 12 : 24">
          <div class="right">
            <div style="text-align: center">USDT</div>
            <div class="input">
              <el-input v-model="usdtRewardValue" placeholder="请输入内容">
                <div slot="suffix" class="details" @click="USDTRewardDetailsClick()">Details</div>
              </el-input>
            </div>
            <div class="">
              <div class="extract-max" @click="USDTExtractClick()">Extract</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="promote-box">
        <el-col :span="screenWidth >= 600 ? 10 : 24" align="center">
          <div class="qrcode">
              <div class="address">https://ANS.net/dsdefdewfew'?utm=0x7DCBFF9995AC72222C6d46A45e82aA90B627f36D</div>
            <!-- <img src="@/assets/img/ido/qrcode.png" alt width="407" /> -->
          </div>
          <div class="CopyBtn">
            <div>Copy Link</div>
            <div>Bind superior</div>
          </div>
        </el-col>
        <el-col :span="screenWidth >= 600 ? 14 : 24" style="padding-top: 50px;padding-right:50px;">
          <div class="save-code">
            <div style="padding-bottom: 20px">
              Save QR code &nbsp;&nbsp;<img
                src="@/assets/img/ido/dow.png"
                alt
                width="20"
              />
            </div>
            <div style="padding-bottom: 20px">{{ value2 }} pushed</div>
          </div>
          <div class="details-button">
            <div class="details">Details</div>
          </div>
          <div class="slider">
            <el-slider
              v-model="value2"
              :step="5"
              :max="30"
              :min="5"
              show-stops
              :marks="marks"
            >
            </el-slider>
          </div>
          <div class="badge">
            <div class="img-05" :style="{opacity: (value2 == 5? 1:0.5)}">
              <img
                class="img-05-1"
                src="@/assets/img/ido/ForceBadge0.png"
                alt=""
                width="70"
                
              />
              Force Badge
            </div>

            <div class="img-10" :style="{opacity: (value2 == 10? 1:0.5)}">
              <img
                class="img-05-1"
                src="@/assets/img/ido/ForceBadge1.png"
                alt=""
                width="70"
                
              />
              Magic Badge
            </div>
            <div class="img-15" :style="{opacity: (value2 == 15? 1:0.5)}">
              <img
                class="img-05-1"
                src="@/assets/img/ido/ForceBadge2.png"
                alt=""
                width="70"
                
              />
              Spirit Badge
            </div>
            <div class="img-20" :style="{opacity: (value2 == 20? 1:0.5)}">
              <img
                class="img-05-1"
                src="@/assets/img/ido/ForceBadge3.png"
                alt=""
                width="70"
                
              />
              Time Badge
            </div>
            <div class="img-25" :style="{opacity: (value2 == 25? 1:0.5)}">
              <img
                class="img-05-1"
                src="@/assets/img/ido/ForceBadge4.png"
                alt=""
                width="70"
              />
              Heart Badge
            </div>
            <div class="img-30" :style="{opacity: (value2 == 30? 1:0.5)}">
              <img
                class="img-05-1"
                src="@/assets/img/ido/ForceBadge5.png"
                alt=""
                width="70"
              />
              Soul Badge
            </div>
          </div>
          <div class="receive">
            <div class="received-nft" id="selected">Receive NFT</div>
            <div class="receive-nft">NO NFT</div>
            <div class="receive-nft">NFT received</div>
          </div>
        </el-col>

        <el-row :gutter="20" class="bottom-box">
          <el-col style="clear: both;" :span="screenWidth >= 600 ? 12 : 24" align="right">
              <div class="left">
                IDO Rule:
                <div class="botimg">
                  <div>
                    <img src="@/assets/img/ido/ans.png" alt="" srcset="">
                    ANS
                  </div>
                  <div>
                    <img src="@/assets/img/ido/USDT.png" alt="" srcset="">
                    USDT
                  </div>
                </div>
                <div class="textb">1. Bind the invitation relationship <br>2. Each address participates in 100U to get 1000 ANS<br> 3. Get 5% USDT and 5% ANS rewards for direct push <br>4. Get 3% USDT and 3% ANS rewards for interim referrals<br> 5. IDOs such as ANS and promotion rewards will be available for collection within 48 hours after the countdown ends</div>

              </div>
          </el-col>
          <el-col :span="screenWidth >= 600 ? 12 : 24" align="left">
              <div class="right">
                Angel Valley Medal of Freedom:
                <div class="botimg">
                  <div>
                    <img src="@/assets/img/ido/angle.png" alt="" srcset="">
                  </div>
                </div>
                <div class="textb">Free access to Angel Valley Medal of Freedom NFT rules:<br>
                1. Directly push 5 IDOs to get a Level 1 Angel Valley Medal of Freedom<br>
                2. Directly push 10 IDOs to get a Level 2 Angel Valley Medal of Freedom<br> 
                3. Directly push 15 IDOs to get a Level 3 Angel Valley Medal of Freedom <br>
                4. Directly push 20 IDOs to get a Level 4 Angel Valley Medal of Freedom<br> 
                5. Directly push 25 IDOs to get a Level 5 Angel Valley Medal of Freedom<br>
                6. Directly push 30 IDOs to get a Level 6 Angel Valley Medal of Freedom<br>
                7. All Angel Valley Medals of Freedom can participate in NFT mining<br>
                8. The Angel Valley Medal of Freedom NFT is limited to 3,000 pieces on the entire network. Holders of the Angel Valley Freedom Medal can also get exclusive Angel Village land.</div>

              </div>
          </el-col>
        </el-row>
      </el-row>

      <!-- 提取输入数值弹框 -->
      <el-dialog
        title="Extract"
        :visible.sync="extractShow"
        :width="screenWidth >= 600 ? '30%' : '80%'"
        center
        :show-close="false"
        class="elDialog"
      >
        <div class="headerTop">
          <img
            src="../../assets/img/close.png"
            alt
            class="close"
            @click="extractShow = false"
          />
        </div>
        <div class="main">
          <div class="input">
            <el-row>
              <el-col :span="12" align="left">111</el-col>
              <el-col :span="12" align="right">222</el-col>
              <el-col :span="24" align="right" class="number">
                <el-input v-model="input" placeholder="请输入内容">
                  <el-button slot="suffix">MAX</el-button>
                  <span slot="suffix" class="unit"> {{extractDetailsName}} </span>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" @click="extractShow = false">确 定</el-button> -->
            <div class="extract-dialog-max" style="margin: 0 auto">Extract</div>
          </span>
        </div>
      </el-dialog>

      <!-- IDO Details -->
      <el-dialog
        title="IDO Details"
        :visible.sync="IDODetailsShow"
        :width="screenWidth >= 600 ? '30%' : '80%'"
        center
        :show-close="false"
        class="elDialog"
      >
        <div class="headerTop">
          <img
            src="@/assets/img/close.png"
            alt
            class="close"
            @click="IDODetailsShow = false"
          />
        </div>
        <div class="main">
          <el-row>
              <el-col :span="12" align="center">
                <div class="get" style="margin: 0 auto">Get</div>
              </el-col>
              <el-col :span="12" align="right">
                <div class="get-no" style="margin: 0 auto">Extract</div>
              </el-col>
          </el-row>
          <div class="table">
            <el-table
              :data="tableData"
              style="width: 100%"
              max-height="300"
              :show-header="false">
              <el-table-column
                prop="date"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
          <!-- <span slot="footer" class="dialog-footer">
            <div class="extract-dialog-max" style="margin: 0 auto">Extract</div>
          </span> -->
        </div>
      </el-dialog>

      <!-- IDO release details -->
      <el-dialog
        title="IDO release details"
        :visible.sync="IDOReleaseDetailsShow"
        :width="screenWidth >= 600 ? '30%' : '80%'"
        center
        :show-close="false"
        class="elDialog"
      >
        <div class="headerTop">
          <img
            src="@/assets/img/close.png"
            alt
            class="close"
            @click="IDOReleaseDetailsShow = false"
          />
        </div>
        <div class="main">
          <!-- <el-row>
              <el-col :span="12" align="center">
                <div class="get" style="margin: 0 auto">Get</div>
              </el-col>
              <el-col :span="12" align="right">
                <div class="get-no" style="margin: 0 auto">Extract</div>
              </el-col>
          </el-row> -->
          <div class="table">
            <el-table
              :data="tableData"
              style="width: 100%"
              max-height="300"
              :show-header="false">
              <el-table-column
                prop="date"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>

      <!-- ANS Reward details -->
      <el-dialog
        title="ANS Reward details"
        :visible.sync="ANSRewardDetailsShow"
        :width="screenWidth >= 600 ? '30%' : '80%'"
        center
        :show-close="false"
        class="elDialog"
      >
        <div class="headerTop">
          <img
            src="@/assets/img/close.png"
            alt
            class="close"
            @click="ANSRewardDetailsShow = false"
          />
        </div>
        <div class="main">
          <!-- <el-row>
              <el-col :span="12" align="center">
                <div class="get" style="margin: 0 auto">Get</div>
              </el-col>
              <el-col :span="12" align="right">
                <div class="get-no" style="margin: 0 auto">Extract</div>
              </el-col>
          </el-row> -->
          <div class="table">
            <el-table
              :data="tableData"
              style="width: 100%"
              max-height="300"
              :show-header="false">
              <el-table-column
                prop="date"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>

      <!-- USDT Reward details -->
      <el-dialog
        title="USDT Reward details"
        :visible.sync="USDTRewardDetailsShow"
        :width="screenWidth >= 600 ? '30%' : '80%'"
        center
        :show-close="false"
        class="elDialog"
      >
        <div class="headerTop">
          <img
            src="@/assets/img/close.png"
            alt
            class="close"
            @click="USDTRewardDetailsShow = false"
          />
        </div>
        <div class="main">
          <!-- <el-row>
              <el-col :span="12" align="center">
                <div class="get" style="margin: 0 auto">Get</div>
              </el-col>
              <el-col :span="12" align="right">
                <div class="get-no" style="margin: 0 auto">Extract</div>
              </el-col>
          </el-row> -->
          <div class="table">
            <el-table
              :data="tableData"
              style="width: 100%"
              max-height="300"
              :show-header="false">
              <el-table-column
                prop="date"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState({
      lpToken: (state) => state.base.lpToken,
    }),
  },
  data() {
    return {
      screenWidth: this.GLOBAL.clientWidth,
      countDate: "2022-06-26 24:00:00",
      bannerbjIMg:
        this.GLOBAL.clientWidth >= 600
          ? require(`@/assets/img/ido/header-pc.png`)
          : require(`@/assets/img/ido/header-h5.png`),
      _interval: "",
      day: 0,
      hr: 0,
      min: 0,
      sec: 0,
      input: "",
      value2: 0,
      idoObtainedValue: 14509,
      idoReleasedValue: 3000,
      ansRewardValue: 3000,
      usdtRewardValue: 3000,
      marks: {
        5: "5",
        10: "10",
        15: "15",
        20: "20",
        25: "25",
        30: "30",
      },
      isApproved: false,
      extractShow: false,
      IDODetailsShow: false,
      IDOReleaseDetailsShow: false,
      ANSRewardDetailsShow: false,
      USDTRewardDetailsShow: false,
      extractDetailsName: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '0x295920EFC1261BC51604ad9F2a46F05F4F4F68FD'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '0x295920EFC1261BC51604ad9F2a46F05F4F4F68FD'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '0x295920EFC1261BC51604ad9F2a46F05F4F4F68FD'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '0x295920EFC1261BC51604ad9F2a46F05F4F4F68FD'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '0x295920EFC1261BC51604ad9F2a46F05F4F4F68FD'
      }]
    };
  },
  mounted() {
    this.countTime();
  },
  watch:{
     value2: function (newData,oldData){
        console.log(newData);
        this.value2 = newData;
     }
  },
  methods: {
    IDOExtractClick() { //点击IDO提取
      this.extractDetailsName = "IDO";
      this.extractShow = true;
    },
    ANSExtractClick() { //点击ANS提取
      this.extractDetailsName = "ANS";
      this.extractShow = true;
    },
    USDTExtractClick() { //点击USDT提取
      this.extractDetailsName = "USDT";
      this.extractShow = true;
    },
    IDODetailsClick() { //点击IDO明细
      this.IDODetailsShow = true;
    },
    IDOReleaseDetailsClick() { //点击IDO明细
      this.IDOReleaseDetailsShow = true;
    },
    ANSRewardDetailsClick() { //ANS奖励明细
      this.ANSRewardDetailsShow = true;
    },
    USDTRewardDetailsClick() { //USDT奖励明细
      this.USDTRewardDetailsShow = true;
    },
    // 倒计时事件
    countTime() {
      this._interval = setInterval(() => {
        let date = new Date();
        let now = date.getTime();

        //设置截止时间
        var endDate = new Date(this.countDate);
        var endTime = endDate.getTime();
        //时间差
        let countTime = endTime - now;
        if (this.countTime == 0) {
          // 计时结束，清除缓存
          clearInterval(this._interval);
        } else {
          countTime--;
          let day = parseInt(countTime / 1000 / 60 / 60 / 24);
          let hr = parseInt((countTime / 1000 / 60 / 60) % 24);
          let min = parseInt((countTime / 1000 / 60) % 60);
          let sec = parseInt((countTime / 1000) % 60);

          this.day = day > 9 ? day : "0" + day;
          this.hr = hr > 9 ? hr : "0" + hr;
          this.min = min > 9 ? min : "0" + min;
          this.sec = sec > 9 ? sec : "0" + sec;
        }
      }, 1000);
    },
  },
  //当离开页面时，清除倒计时
  beforeDestroy() {
    clearInterval(this._interval);
  },
};
</script>
<style scoped lang="less">
.pcmain {
  ::v-deep {
    .el-dialog__header {
      display: show;
    }
    background: rgba(19, 29, 23, 1);
    font-size: 12px;

    .caintner {
      padding: 100px 0;
      //   max-width: 1970px;
      width: 90%;
      margin: 0 auto 0;
      color: #fff;
      .banner {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 150px;
        min-height: 150px;
        // position: relative;
        // background-size: auto calc(100% + 40px);
        background-repeat: no-repeat;
        background-position: center;
        background-color: #26352c;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        font-size: 16px;
        .countdown {
          background: url(../../assets/img/ido/countdown.png) no-repeat center;
          background-size: contain;
          width: 400px;
          line-height: 150px;
          height: 150px;
          color: #333;
          text-align: center;
          display: table;
          div {
            background: url(../../assets/img/ido/countdown-span.png) no-repeat
              center;
            background-size: contain;
            width: 40px;
            line-height: 45px;
            height: 45px;
            color: #333;
            text-align: center;
            display: inline-grid;
            color: #fff;
          }
        }
      }
      .buy-box {
        margin-top: 30px;
        font-size: 18px;
        .left {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-direction: column;
          padding: 20px;
          height: 200px;
          background-color: #26352c;
          border-radius: 20px;
          // text-align: center;
          // border: 1px solid red;
          .approved-pay {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            .pay-yes {
              background: url(../../assets/img/ido/pay-yes.png) no-repeat center;
              background-size: contain;
              width: 200px;
              line-height: 80px;
              height: 80px;
              color: #333;
              text-align: center;
            }
            .pay-no {
              background: url(../../assets/img/ido/pay-no.png) no-repeat center;
              background-size: contain;
              width: 200px;
              line-height: 80px;
              height: 80px;
              color: #333;
              text-align: center;
            }
          }
          .approved-pay-steps {
            .el-steps {
              width: 100px !important;
              margin: 0 auto !important;
            }
            margin-top: 20px;
          }
          .input {
            width: 70%;
            .el-input__inner {
              background-color: #161d18;
              height: 70px;
              color: #82d197;
              font-weight: 800;
              //   width: 80%;
              border: unset;
              line-height: 70px;
              border-radius: 100px;
            }
            .el-input__suffix {
              display: flex;
              align-items: center;
              justify-content: space-around;
              flex-direction: column;
            }
            .el-input__suffix-inner {
              display: flex;
              margin-right: 20px;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-direction: column;
          padding: 20px;
          height: 200px;
          // border: 1px solid red;
          background-color: #26352c;
          border-radius: 20px;
          text-align: center;
          .input {
            width: 70%;
            .el-input__inner {
              background-color: #161d18;
              height: 70px;
              color: #82d197;
              font-weight: 800;
              //   width: 80%;
              border: unset;
              line-height: 70px;
              border-radius: 100px;
              display: flex;
              margin-right: 10px;
            }
            .el-input__suffix {
              display: flex;
              align-items: center;
              justify-content: space-around;
              flex-direction: column;
            }
            .el-input__suffix-inner {
              display: flex;
              margin-right: 20px;
            }
          }
        }
      }
      .rewards {
        margin-top: 50px;
        padding-right: 70px;
        text-align: center;
      }
      .promote-box {
        font-size: 18px;
        margin-top: 70px;
        background-color: #26352c;
        // height: 500px;
        border-radius: 20px;
        // padding-left: 100px;
        // padding-right: 100px;
        // padding-right: 100px;
        // padding: 0 100px 30px 100px;
        .save-code {
          float: left;
          padding-left: 20px;
          padding-top: 20px;
        }
        .details-button {
          float: right;
        }
        .slider {
          padding: 30px;
          clear: both;
          .el-slider__marks-text {
            margin-top: -30px;
            color: #fff;
            font-size: 18px;
          }
          .el-slider {
            float: left;
            width: 100%;
          }
          .button {
            float: left;
            margin-left: 20px;
          }
        }
        .badge {
          width: 100%;
          // height: 6px;
          // margin: 16px 0;
          // background-color: #E4E7ED;
          // border-radius: 3px;
          position: relative;
          // font-size: 12px;
          // text-align: center;
          // cursor: pointer;
          // vertical-align: middle;
          // img {
          //   position: absolute;
          //   // left: -35px;
          //   top: 10px;
          // }
          .img-05 {
            position: absolute;
            left: 0%;
          }
          .img-05-1{
            display: block;
          }
          .img-10 {
            left: 18%;
            position: absolute;
          }
          .img-15 {
            left: 36%;
            position: absolute;
          }
          .img-20 {
            left: 54%;
            position: absolute;
          }
          .img-25 {
            left: 72%;
            position: absolute;
          }
          .img-30 {
            left: 90%;
            position: absolute;
          }
        }
        .receive{
          display: flex;
          justify-content: right;
          margin-top: 150px;
          // margin-right:-70px;
          .receive-nft {
            background: url(../../assets/img/ido/receive.png) no-repeat center;
            background-size: contain;
            width: 189px;
            line-height: 80px;
            height: 80px;
            color: #333;
            text-align: center;
          }
           .received-nft {
            background: url(../../assets/img/ido/received.png) no-repeat center;
            background-size: contain;
            width: 189px;
            line-height: 80px;
            height: 80px;
            color: #333;
            text-align: center;
          }
          // div{
          //   background: url(../../assets/img/ido/receive.png) no-repeat center;
          //   background-size: contain;
          //   width: 189px;
          //   line-height: 81px;
          //   height:81px;
          //   color: #131D17;
          //   text-align: center;
          //   cursor: pointer;
          // }
          // div#selected{
          //   background: url(../../assets/img/ido/received.png) no-repeat center;
          //   color: #502914;
          // }
        }
        .qrcode {
          margin-top: -50px;
          background: url(../../assets/img/ido/qrcode.png) no-repeat center;
          background-size: contain;
          width: 400px;
          // line-height: 440px;
          height: 440px;
          color: #fff;
          text-align: center;
          cursor: pointer;
          .address {
            position: relative;
            top: 319px;
            // left: 60px;
            overflow: auto;
            margin: 0 auto;
            width: 300px;
            padding: 50px;
            width: 317px;
            // height: 51px;
            font-size: 16px;
            font-weight: 400;
            color: #ffffff;
            word-break: break-all;
          }
        }
        .CopyBtn{
          display: flex;
          margin-top: 10px;
          // width:417px;
          justify-content: center;
          :first-child{
            background: url(../../assets/img/ido/copy1.png) no-repeat center;
            background-size: contain;
            width: 151px;
            line-height: 48px;
            height: 48px;
            color: #fff;
            text-align: center;
            margin-right:5px;
          }
          :last-child{
            background: url(../../assets/img/ido/copy2.png) no-repeat center;
            background-size: contain;
            width: 151px;
            line-height: 48px;
            height: 48px;
            color: #fff;
            text-align: center;
            margin-left:5px;
          }
        }
        .bottom-box {
          width: 80%;
          margin: 0 auto !important;
          top: 30px;
          // // display: flex;
          justify-content: space-between;
          text-align: center;
          padding-bottom: 70px;
          // clear: both;
          .left{
            // width:48%;
            height: 350px;
            margin: 0 auto;
            background-color: #161d18;
            padding:20px 60px;
            border-radius: 8px;
            box-sizing: border-box;
            .botimg{
              display: flex;
              justify-content: center;
              font-size: 16px;
              margin-top: 15px;
              margin-bottom: 62px;
              :first-child{
                display: block;
              }
            }
            .textb{
              font-size: 7px;
              text-align: left;
            }
          }
          .right{
            // width:46%;
            height: 350px;
            margin: 0 auto;
            background-color: #161d18;
            padding:20px 16px;
            border-radius: 8px;
            box-sizing: border-box;

            .botimg{
              display: flex;
              justify-content: center;
              font-size: 16px;
              margin-top: 15px;
              margin-bottom: 25px;
              :first-child{
                display: block;
              }
            }
            .textb{
              font-size: 7px;
              text-align: left;
            }
          }
        }
      }
      .extract {
        background: url(../../assets/img/ido/extract.png) no-repeat center;
        background-size: contain;
        width: 130px;
        line-height: 50px;
        height: 50px;
        color: #fff;
        text-align: center;
        cursor: pointer;
      }
      .extract-max {
        background: url(../../assets/img/ido/extract-max.png) no-repeat center;
        background-size: contain;
        width: 300px;
        line-height: 60px;
        height: 60px;
        color: #fff;
        text-align: center;
        cursor: pointer;
      }
      .extract-dialog-max {
        background: url(../../assets/img/ido/extract-dialog-max.png) no-repeat
          center;
        background-size: contain;
        width: 300px;
        line-height: 70px;
        height: 70px;
        color: #502914;
        font-weight: 800;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
      }
      .details {
        background: url(../../assets/img/ido/details.png) no-repeat center;
        background-size: contain;
        width: 130px;
        line-height: 50px;
        height: 50px;
        color: #fff;
        text-align: center;
        cursor: pointer;
      }
      .get {
        background: url(../../assets/img/ido/get.png) no-repeat center;
        background-size: contain;
        width: 90px;
        line-height: 40px;
        height: 40px;
        color: #090E0B;
        text-align: center;
        cursor: pointer;
      }
      .get-no {
        background: url(../../assets/img/ido/get-no.png) no-repeat center;
        background-size: contain;
        width: 90px;
        line-height: 40px;
        height: 40px;
        color: #090E0B;
        text-align: center;
        cursor: pointer;
      }
      .el-dialog {
        background-color: #26352c;
        border-radius: 16px;
      }

      .elDialog {
        border-radius: 30px;
        .el-dialog__header {
          display: block;
        }
        .el-dialog__title {
          color: #fff;
        }
        .close {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 20px;
          top: 20px;
          cursor: pointer;
        }
        .title {
          width: 25px;
          height: 25px;
          position: absolute;
          top: 10px;
        }
        .main {
          .input {
            height: 80px;
            padding: 20px;
            background-color: #335741;
            border-radius: 16px;
            color: #fff;
            .el-dialog__title {
              color: #fff;
            }
            .number {
              margin-top: 20px;
              .el-input__inner {
                background-color: #335741;
                // height: 70px;
                color: #fff;
                font-weight: 800;
                //   width: 80%;
                border: unset;
                // display: flex;
              }
              .el-input__suffix {
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex-direction: column;
              }
              .unit {
                margin-left: 5px;
                color: #70f4a5;
              }
              button {
                padding: 5px;
                background-color: #70f4a56b;
                border-radius: 20px;
                color: #ffffff;
                font-weight: 800;
                span {
                  font-size: 13px;
                }
              }
            }
          }
        }
        .table {
          margin-top: 10px;
          .el-table tr {
            background-color: #26352c;
            color: #fff;
          }
          .el-table__body tr:hover>td{
            background-color: #26352c;
          }
          .el-table__body tr.current-row>td {
            background-color: #26352c;
          }
          .el-table::before {
            height: 0px;
          }
          table th,
          table td {
            border-bottom: none !important;
          }
        }
      }
    }
  }
}
.main {
  .caintner {
    .buy-box {
      .left {
        .input {
          padding: 10px;
          width: 100%;
        }
      }
      .right {
        .input {
          width: 100%;
          padding: 10px;
        }
      }
    }
    .extract {
      background: url(../../assets/img/ido/extract.png) no-repeat center;
      background-size: contain;
      width: 100px;
      line-height: 50px;
      height: 50px;
      color: #fff;
      text-align: center;
    }
    .extract-max {
      background: url(../../assets/img/ido/extract-max.png) no-repeat center;
      background-size: contain;
      width: 300px;
      line-height: 60px;
      height: 60px;
      color: #fff;
      text-align: center;
    }
    .details {
      background: url(../../assets/img/ido/details.png) no-repeat center;
      background-size: contain;
      width: 100px;
      line-height: 50px;
      height: 50px;
      color: #fff;
      text-align: center;
    }
    .pay-yes {
      background: url(../../assets/img/ido/pay-yes.png) no-repeat center;
      background-size: contain;
      width: 100px;
      line-height: 50px;
      height: 80px;
      color: #333;
      text-align: center;
    }
    .pay-no {
      background: url(../../assets/img/ido/pay-no.png) no-repeat center;
      background-size: contain;
      width: 100px;
      line-height: 50px;
      height: 50px;
      color: #333;
      text-align: center;
    }

    .promote-box {
      .qrcode {
        width: 320px;
        margin-top: -100px;
        .address {
          top: 330px;
          width: 300px;
          padding: 0;
        }
      }
      .bottom-box {
        width: 100%;
        .left {
          padding: 20px;
          height: auto;
          text-align: center;
        }
        .right {
          margin-top: 30px;
          padding: 20px;
          height: auto;
          text-align: center;
        }
      }
      .receive {
        div {
          // line-height: 60px;
          width: 100px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>