<template>
  <div :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']">
    <div class="caintner">
      <div
        class="banner"
        :style="`background-image: url(${bannerbjIMg});background-size: cover;`"
      >
        <div style="font-size:28px;position: relative;top: 20px;">{{ $t('ido-Countdown') }}</div>
        <div class="countdown">
          <div>{{ day + "d" }}</div>
          <div>{{ hr + "h" }}</div>
          <div>{{ min + "m" }}</div>
          <div>{{ sec + "s" }}</div>
        </div>
      </div>
      <el-row :gutter="20" class="buy-box">
        <el-col :span="screenWidth >= 600 ? 12 : 24">
          <div class="left approved">
            <div style="text-align: center">100 USDT {{ $t('ido-get') }} 1000 ANS</div>
            <div class="approved-pay" v-if="approve">
              <img src="@/assets/img/ido/approved-yes.png" alt width="100" />
              <span>{{$t('ido-Approved')}}</span>&nbsp;&nbsp;
              <div v-loading="payLoading" v-if="!isPay" :class="['pay-yes', payLoading ? 'events-none' : '']" @click="payUsdtOrANS()">{{ $t('ido-Pay') }}</div>
              <div v-else class="pay-no">{{ $t('ido-Pay') }}</div>
            </div>
            <div class="approved-pay" v-if="!approve">
              <img src="@/assets/img/ido/approved-no.png" alt width="100" />
              <span style="color: #ffffff">{{ $t('ido-Unapproved') }}</span>&nbsp;&nbsp;
              <div v-loading="approvedLoading" :class="['pay-yes', approvedLoading ? 'events-none' : '']" @click="startApprove()">{{ $t('ido-Approved') }}</div>
            </div>
            <div class="approved-pay-steps">
              <div class="steps">
                <!-- <img v-if="approve" src="@/assets/img/ido/success-01.png" alt width="30" /> -->
                <img :src="require(`@/assets/img/ido/${approve ? `success-01` : `step-01`}.png`)" alt width="25" />
                <div :class="[isPay ? 'wire-success' : 'wire']"></div>
                <!-- wire-success -->
                <!-- <img src="@/assets/img/ido/step-02.png" alt width="20" /> -->
                <img :src="require(`@/assets/img/ido/${isPay ? `success-01` : `step-02`}.png`)" alt width="25" />
              </div>
              <!-- <el-steps
                :align-center="true"
                :space="200"
                :active="0"
                finish-status="success"
              >
                <el-step title=""></el-step>
                <el-step title=""></el-step>
              </el-steps> -->
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
              <el-input v-model="ansObtainedAmount" placeholder="0.00" :readonly="true">
                <div slot="prefix" class="ans-obtained">ANS {{ $t('ido-obtained') }}</div>
                <div slot="suffix" v-if="isStartExtract" @click="IDOExtractClick()" class="extract">{{ $t('ido-Extract') }}</div>
                <!-- &nbsp;&nbsp; -->
                <!-- <div slot="suffix" class="details" @click="IDODetailsClick()">{{ $t('ido-Details') }}</div> -->
              </el-input>
            </div>
            <div class="input" style="width: 100%">
              <el-input v-model="ansReleasedAmount" placeholder="0.00" :readonly="true">
                <div slot="prefix" class="ans-obtained">ANS {{ $t('ido-to-be-released') }}</div>
                <!-- <div slot="suffix" class="details" @click="IDOReleaseDetailsClick()">{{ $t('ido-Details') }}</div> -->
              </el-input>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="rewards">
        <el-col :span="24">
          <div class="rewards-box">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('ido-Rewards') }}</div>
          <!-- <img src="@/assets/img/ido/rewards.png" alt width="300" />
          <span style="position:absolute;bottom:0;font-size:28px;right:43%;line-height:83px;">{{ $t('ido-Rewards') }}</span> -->
        </el-col>
      </el-row>
      <el-row :gutter="20" class="buy-box">
        <el-col :span="screenWidth >= 600 ? 12 : 24">
          <div class="left">
            <div style="text-align: center">ANS</div>
            <div class="input">
              <el-input v-model="ansRewardAmount" placeholder="0.00" :readonly="true">
                <div slot="prefix" class="ans-obtained">ANS</div>
                <!-- <div slot="suffix" class="details" @click="ANSRewardDetailsClick()">{{ $t('ido-Details') }}</div> -->
              </el-input>
            </div>
            <div class="" v-if="isStartExtract">
              <div class="extract-max" @click="ANSExtractClick()">{{ $t('ido-Extract') }}</div>
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
              <el-input v-model="usdtRewardAmount" placeholder="0.00" :readonly="true">
                <div slot="prefix" class="ans-obtained">USDT</div>
                <!-- <div slot="suffix" class="details" @click="USDTRewardDetailsClick()">{{ $t('ido-Details') }}</div> -->
              </el-input>
            </div>
            <div class="">
              <div class="extract-max" @click="USDTExtractClick()">{{ $t('ido-Extract') }}</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="promote-box">
        <el-row>
          <el-col :span="screenWidth >= 600 ? 10 : 24" align="center">
            <!-- <div class="qrcode">
              <img src="@/assets/img/ido/qrcode.png" alt width="407" />
              <div class="qrCodeurl" ref="qrCodeUrl"></div>
              <span
                >https://ANS.net/dsdefdewfew'?utm=0x7DCBFF9995AC72222C6d46A45e82aA90B627f36D</span
              >
            </div> -->
            <div class="qrcode">
                <div class="qrCodeurl" ref="qrCodeUrl"></div>
                <div class="address">{{utmAddress}}</div>
            </div>
            <div class="CopyBtn">
              <div v-clipboard:copy="utmAddress" v-clipboard:success="copySuccess">{{ $t('ido-CopyLink') }}</div>
              <div @click="showBind()">{{ $t('ido-BindSuperior') }}</div>
            </div>
          </el-col>
          <el-col :span="screenWidth >= 600 ? 14 : 24" style="padding-top: 80px">
            <div class="save-code">
              <!-- <div style="padding-bottom: 20px">
                Save QR code &nbsp;&nbsp;<img
                  src="@/assets/img/ido/dow.png"
                  alt
                  width="20"
                />
              </div> -->
              <div style="padding-bottom: 20px">IDO {{ $t('ido-pushed') }}</div>
              <div style="color:#70F4A5;font-weight: 800;font-size:24px"> {{ countNFTReward }} </div>
            </div>
            <div class="details-button">
              <div class="details" @click="showDirect()">{{ $t('ido-DirectPushDetails') }}</div>
            </div>
            <div class="slider">
              <el-slider
                v-model="countNFTRewardSlider"
                :step="1"
                :max="30"
                :min="5"
                :marks="marks"
                disabled
              >
              </el-slider>
            </div>
            <div class="badge">
              <div class="img-05" :style="{opacity: (countNFTReward >= 5 ? 1 : 0.5)}">
                <img
                  class="img-05-1"
                  src="@/assets/img/ido/ForceBadge0.png"
                  alt=""
                  width="70"
                  
                />
                {{ $t('ido-badge-05') }}
              </div>

              <div class="img-10" :style="{opacity: (countNFTReward >= 10? 1:0.5)}">
                <img
                  class="img-05-1"
                  src="@/assets/img/ido/ForceBadge1.png"
                  alt=""
                  width="70"
                  
                />
                {{ $t('ido-badge-10') }}
              </div>
              <div class="img-15" :style="{opacity: (countNFTReward >= 15? 1:0.5)}">
                <img
                  class="img-05-1"
                  src="@/assets/img/ido/ForceBadge2.png"
                  alt=""
                  width="70"
                  
                />
                {{ $t('ido-badge-15') }}
              </div>
              <div class="img-20" :style="{opacity: (countNFTReward >= 20? 1:0.5)}">
                <img
                  class="img-05-1"
                  src="@/assets/img/ido/ForceBadge3.png"
                  alt=""
                  width="70"
                  
                />
                {{ $t('ido-badge-20') }}
              </div>
              <div class="img-25" :style="{opacity: (countNFTReward >= 25? 1:0.5)}">
                <img
                  class="img-05-1"
                  src="@/assets/img/ido/ForceBadge4.png"
                  alt=""
                  width="70"
                />
                {{ $t('ido-badge-25') }}
              </div>
              <div class="img-30" :style="{opacity: (countNFTReward >= 30? 1:0.5)}">
                <img
                  class="img-05-1"
                  src="@/assets/img/ido/ForceBadge5.png"
                  alt=""
                  width="70"
                />
                {{ $t('ido-badge-30') }}
              </div>
            </div>
            <div class="receive">
              <div id="selected" v-if="getNftPushedState()" @click="getIDORemainNft()" :class="['extract-dialog-max', claimNftLoading ? 'events-none' : '']" v-loading="claimNftLoading">{{ $t('ido-ReceiveNFT') }}</div>
              <div v-else>{{ $t('ido-NONFT') }}</div>
              <!-- <div v-if="screenWidth >= 600">{{ $t('ido-NFTReceived') }}</div> -->
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="screenWidth >= 600 ? 12 : 24">
            <div class="bottom-box">
              <div class="left">
                IDO {{ $t('ido-Rule') }}
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
                <div class="textb">
                  {{ $t('ido-Rule-01') }} <br>
                  {{ $t('ido-Rule-02') }}<br> 
                  {{ $t('ido-Rule-03') }}<br> 
                  {{ $t('ido-Rule-04') }}<br> 
                  {{ $t('ido-Rule-05') }}<br> 
                </div>

              </div>
            </div>
          </el-col>
          <el-col :span="screenWidth >= 600 ? 12 : 24">
            <div class="bottom-box">
              <div class="right">
                {{ $t('ido-MedalFreedom') }}
                <div class="botimg">
                  <div>
                    <img src="@/assets/img/ido/angle.png" alt="" srcset="">
                  </div>
                </div>
                <div class="textb">{{ $t('ido-MedalFreedom-title') }}<br>
                {{ $t('ido-MedalFreedom-01') }}<br>
                {{ $t('ido-MedalFreedom-02') }}<br>
                {{ $t('ido-MedalFreedom-03') }}<br>
                {{ $t('ido-MedalFreedom-04') }}<br>
                {{ $t('ido-MedalFreedom-05') }}<br>
                {{ $t('ido-MedalFreedom-06') }}<br>
                {{ $t('ido-MedalFreedom-07') }}<br>
                {{ $t('ido-MedalFreedom-08') }}<br>

              </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 提取输入数值弹框 -->
      <el-dialog
        :title="$t('ido-Extract')"
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
              <el-col :span="12" align="left">{{extractDetailsName}} {{ $t('ido-obtained') }}</el-col>
              <el-col :span="12" align="right">{{ $t('ido-balance') }}: {{ extractBalance }}</el-col>
              <el-col :span="24" align="right" class="number">
                <el-input v-model="extractAmountValue" placeholder="0.00">
                  <el-button slot="suffix" @click="extractAmountValue = extractBalance">MAX</el-button>
                  <span slot="suffix" class="unit">{{extractDetailsName}}</span>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" @click="extractShow = false">确 定</el-button> -->
            <div style="margin: 0 auto" @click="extractStart()" :class="['extract-dialog-max', extractLoading ? 'events-none' : '']" v-loading="extractLoading">{{ $t('ido-Extract') }}</div>
          </span>
        </div>
      </el-dialog>

      <!-- IDO Details -->
      <el-dialog
        :title="$t('ido-IdoDetails')"
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
                <div :class="IDODetailsType == 1 ? 'get' : 'get-no'" style="margin: 0 auto" @click="getIDODetailsButton(1)">Get</div>
              </el-col>
              <el-col :span="12" align="right">
                <div :class="IDODetailsType == 2 ? 'get' : 'get-no'" style="margin: 0 auto" @click="getIDODetailsButton(2)">{{ $t('ido-Extract') }}</div>
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
        :title="$t('ido-IdoReleaseDetails')"
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
        :title="'ANS ' + $t('ido-RewardDetails')"
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
        :title="'USDT ' + $t('ido-RewardDetails')"
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

      <!-- 自动获取邀请地址弹框 -->
      <el-dialog
        :title="$t('ido-BindSuperior')"
        :visible.sync="showBindState"
        :width="screenWidth >= 600 ? '30%' : '80%'"
        center
        :show-close="false"
        class="elDialogBind"
      >
        <div class="headerTop">
          <img
            src="../../assets/img/close.png"
            alt
            class="close"
            @click="showBindState = false"
          />
        </div>
          <div class="input">
            <el-row>
              <!-- <el-col v-if="buildHrefAddressValue && buildHrefAddressValue !== ''" :span="24" align="right" class="number">
                <el-input  v-model="buildHrefAddressValue" placeholder="0.00"></el-input>
              </el-col> -->
              <el-col :span="24" align="right" class="number">
                <el-input  v-model="inviteAddress" placeholder="" :readonly="true"></el-input>
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <div class="pay-yes" @click="startApprove()">{{ $t('ido-Approved') }}</div> -->
            <!-- <div v-if="!approve" class="extract-dialog-max" style="margin: 0 auto" @click="startApprove()">{{ $t('ido-Approved') }}</div> -->
            <div style="margin: 0 auto" @click="buildInviteAddress()" :class="['extract-dialog-max', buildInviteLoading ? 'events-none' : '']" v-loading="buildInviteLoading">{{ $t('ido-confirm') }}</div>
          </span>
      </el-dialog>

      <!-- 点击bind 手动绑定 按钮显示内容-->
      <el-dialog
        :title="$t('ido-BindSuperior')"
        :visible.sync="showBindAddressShow"
        :width="screenWidth >= 600 ? '30%' : '90%'"
        center
        :show-close="false"
        class="elDialogBind"
      >
        <div class="headerTop">
          <img
            src="../../assets/img/close.png"
            alt
            class="close"
            @click="showBindAddressShow = false"
          />
        </div>
          <div class="input">
            <el-row>
              <el-col :span="24" align="right" class="number">
                <el-input style="font-size:16px;" v-model="inviteAddress" :placeholder="$t('ido-please-inviter-address')">
                </el-input>
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <div class="extract-dialog-max" style="margin: 0 auto" @click="BindAddressClick()">{{ $t('ido-confirm') }}</div> -->
            <div style="margin: 0 auto" @click="buildInviteAddress()" :class="['extract-dialog-max', buildInviteLoading ? 'events-none' : '']" v-loading="buildInviteLoading">{{ $t('ido-confirm') }}</div>
          </span>
      </el-dialog>

      <!-- 直推详情弹框 -->
       <el-dialog
        :title="$t('ido-DirectPushDetails')"
        :visible.sync="showDirectState"
        :width="screenWidth >= 600 ? '30%' : '90%'"
        center
        :show-close="false"
        class="elDialog elDialogDirect"
      >
        <div class="headerTop">
          <img
            src="@/assets/img/close.png"
            alt
            class="close"
            @click="showDirectState = false"
          />
        </div>
        <div class="main">
          <el-row>
              <el-col :span="24" align="center">
                <!-- <div :class="[changeDirectpushState==0?'get':'get-no']" style="margin: 0 auto" @click="changeDirectpush(0)">Direct push</div> -->
                <div style="color:#fff;"> {{ $t('ido-total-quote') }} </div> 
                <div class="seeANS">
                  <div>0.00 ANS</div>
                </div>
              </el-col>
              <!-- <el-col :span="24" align="center">
                <div :class="[changeDirectpushState==1?'get':'get-no']" style="margin: 0 auto" @click="changeDirectpush(1)">NFT Rewards</div>
              </el-col> -->
          </el-row>
          <div class="tableList">
            <div class="listui">
              <div class="listli" v-for="item in LevelLists" :key="item" >
                <!-- <div class="li">
                  <div>2022-06-09 11:20:14</div>
                  <div>Direct push succeeds +1</div>
                </div> -->
                <div class="abs">{{ item }}</div>
              </div>
              <!-- <div style="text-align:center;margin-top:30px;">Total team IDO quota</div>
              <div class="seeANS">
                <div>14509 ANS</div>
                <div class="details" @click="showDirectList()">{{ $t('ido-Details') }}</div>
              </div> -->

            </div>
          </div>
         
        </div>
      </el-dialog>

      <!-- 点击direct 弹窗 中最下面按钮 改 -->
       <el-dialog
        :title="$t('ido-DirectPushList')"
        :visible.sync="showDirectListState"
        :width="screenWidth >= 600 ? '30%' : '80%'"
        center
        :show-close="false"
        class="elDialog elDialogDirectList"
      >
        <div class="headerTop">
          <img
            src="@/assets/img/close.png"
            alt
            class="close"
            @click="showDirectListState = false"
          />
        </div>
        <div class="main">
          <div class="directList">
            <div class="listui">
              <div class="listli" v-for="item in LevelLists"  :key="item">
                <div class="abs">0x2592…51C</div>
                <div class="li">
                  <div><img src="@/assets/img/ido/ans.png" alt="" srcset=""></div>
                  
                  <div>200ANS</div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </el-dialog>


    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import { mapState } from "vuex";
import { approve, IDOPayDeposit, IDOHarvest, IDOAnsRewardHarvest, IDOUsdtRewardHarvest, IDOClaimNftReward, IDOBindInvite } from "@/wallet/trade";
import {isApproved, getIDOUserInfo, getIDOANSRewardAmount, getIDOUSDTRewardAmount, getIDOOneLevelLists, getIDORemainNft} from "@/wallet/inquire";
import CONFIG from '@/wallet/address.js'
import {addressCheck} from "../../utils/tool";
export default {
  components: {},
  computed: {
    ...mapState({
      lpToken: (state) => state.base.lpToken,
      address:state=>state.base.address,
      isConnected:state=>state.base.connected,
      userNtfs:state=>state.base.userNtfs,
      rewardToken:state=>state.base.rewardToken,
      usToken:state=>state.base.usToken,
      IDOToken:state=>state.base.IDOToken,
    }),
    utmAddress(){
        // return window.origin + `/#/ido?utm=${this.address}`
        return window.location.host + window.location.pathname + `/#/ido?utm=${this.address}`
    }
  },
  data() {
    return {
      screenWidth: this.GLOBAL.clientWidth,
      countDate: "2022-07-02 16:36:00",
      isStartExtract: false, //是否开始领取
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
      value2: 11,
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
      approve: false,
      isPay: false,
      extractShow: false,
      detailsShow: false,
      IDODetailsShow: false,
      IDOReleaseDetailsShow: false,
      ANSRewardDetailsShow: false,
      USDTRewardDetailsShow: false,
      extractDetailsName: '',
      IDODetailsType: 1,
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
      }],
      changeGetState:0,  //弹框按钮切换
      showBindState:false, //点击bind按钮
      showBindAddressShow: false, //点击手动绑定钱包地址弹框
      showDirectState: false,//点击Direct 改
      changeDirectpushState: 0,//状态   改
      LevelLists:[],//我的下级直推列表
      showDirectListState: false,//改
      utmAddressValue: '', //邀请人地址 url
      buildHrefAddressValue: '',
      inviteAddress: '', //邀请地址
      payUsdtOrAnsAmount: 100, //usdt or ans 最低 100
      ansObtainedAmount: 0, //IDO 可领取的数量 
      ansReleasedAmount: 0, //待释放数量 
      ansRewardAmount: 0, //ANS奖励数量 
      usdtRewardAmount: 0, //USDT奖励数量 
      extractBalance: 0, //输入弹框余额
      extractAmountValue: 0, //输入弹框输入数量
      remainingNFTReward: 0, //剩余NFT奖励
      countNFTReward: 0, //总的NFT奖励
      countNFTRewardSlider: 0,
      trading: false,
      payLoading: false,
      approvedLoading: false,
      extractLoading: false,
      buildInviteLoading: false,
      claimNftLoading: false,
    };
  },
  created() {
    let inviter_address = this.$route.query.utm;
    if(inviter_address && inviter_address !== '') {
      if(!addressCheck(inviter_address)) {
        this.$notify({
          message: "Invite address is invalid",
          type: "error",
        });
        return false;
      }
      if(inviter_address && inviter_address !== '') {
        console.log("邀请地址：" + inviter_address);
        this.inviteAddress = inviter_address;
        this.utmAddressValue = this.utmAddressHref();
        this.showBindState = true;
      }
    }
  },
  mounted() {
    this.countTime();
    this.creatQrCode();
  },
  watch:{
    isConnected:{
      immediate:true,
      async handler(val){
          if(val){
            this.getIsApprove();
            this.getIdoAmount();
          }
      }
    },
    value2: function (newData,oldData){
      this.value2 = newData;
    }
  },
  methods: {
    utmAddressHref() {
      return window.location.host + window.location.pathname + "#/ido?utm=" + this.inviteAddress;
    },
    extractStart() { //开始提取
      this.extractLoading = true;
      let _contractName = '';
      if(this.extractAmountValue <= 0) {
        // this.$notify({
        //   message: "请输入数量",
        //   type: "warning",
        // });
        return false;
      }
      if(this.extractDetailsName === 'IDO') {
        _contractName = IDOHarvest;
      }
      if(this.extractDetailsName === 'ANS') {
        _contractName = IDOAnsRewardHarvest;
      }
      if(this.extractDetailsName === 'USDT') {
        _contractName = IDOUsdtRewardHarvest;
      }
      _contractName(this.extractAmountValue).then(async(hash) => {
        if(hash) {
          this.extractLoading = false;
          this.extractShow = false;
          await this.getIdoAmount();
        }
      }).finally(() => {
        this.extractLoading = false;
      });
    },
    IDOExtractClick() { //点击IDO提取
      this.extractDetailsName = "IDO";
      this.extractBalance = this.ansObtainedAmount;
      this.extractShow = true;
      this.extractAmountValue = 0;
    },
    ANSExtractClick() { //点击ANS提取
      this.extractDetailsName = "ANS";
      this.extractBalance = this.ansRewardAmount;
      this.extractShow = true;
      this.extractAmountValue = 0;
    },
    USDTExtractClick() { //点击USDT提取
      this.extractDetailsName = "USDT";
      this.extractBalance = this.usdtRewardAmount;
      this.extractShow = true;
      this.extractAmountValue = 0;
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
    getIDODetailsButton(num) {
      this.IDODetailsType = num;
    },
    // buildSuperiorClick() { //Build superior
    //   // console.log(this.buildAddressValue);
    //   if(this.buildHrefAddressValue && this.buildHrefAddressValue !== '') {
    //     this.showBindState = false;
    //   } else {
    //     if(this.buildAddressValue && this.buildAddressValue !== '') {
    //       this.buildHrefAddressValue = window.location.origin + "?utm=" + this.buildAddressValue;
    //     }
    //   }
    // },
    async getIsApprove() { //获取余额 查看是否授权
      isApproved(CONFIG.IDOUsToken, 18, 0, CONFIG.IDOToken).then((bool) => {
        // console.log("isApprove", bool);
        this.approve = bool ? true : false;
      });
    },
    startApprove() { //批准USDT
      this.approvedLoading = true;
      approve(CONFIG.IDOUsToken, CONFIG.IDOToken).then((hash) => {
        // console.log(result);
        if(hash) {
          this.approve = true;
          this.approvedLoading = false;
        }
      }).finally(() => {
        this.approvedLoading = false;
      });
    },
    payUsdtOrANS() { //100 USDT get 1000 ANS 绑定推荐关系
      this.payLoading = true;
      IDOPayDeposit(this.payUsdtOrAnsAmount, this.inviteAddress).then((hash) => {
        console.log(hash);
        if(hash) {
          this.payLoading = false;
          // this.showBindState = false;
          this.getIdoAmount();
        }
      }).finally(() => {
        this.payLoading = false;
      });
    },
    buildInviteAddress() { //单独绑定推荐关系
      if(this.inviteAddress && this.inviteAddress !== '') {
        if(this.inviteAddress.toLowerCase() === this.address.toLowerCase()) {
          this.$notify({
            message: "Invite address is invalid",
            type: "error",
          });
          return fasle;
        }
        this.buildInviteLoading = true;
        IDOBindInvite(this.inviteAddress).then((hash) => {
          this.buildInviteLoading = false;
          this.showBindState = false;
          // this.getIdoAmount();
        }).finally(() => {
          this.buildInviteLoading = false;
        });
      }
    },
    getIDORemainNft() { //领取NFT奖励
      if(this.getNftPushedState()) {
        this.claimNftLoading = true;
        IDOClaimNftReward(this.remainingNFTReward).then((hash) => {
          if(hash) {
            this.claimNftLoading = false;
            this.getIdoAmount();
          }
        }).finally(() => {
          this.claimNftLoading = false;
        });
      }
    },
    copySuccess() {
      this.$notify({
        title: "success",
        message: "已复制到剪切板",
        type: "success",
      });
    },
    async getIdoAmount() { //获取IDO数量
      let ANSObtained = await getIDOUserInfo();
      if(ANSObtained.amount > 0) {
        this.ansObtainedAmount = ANSObtained.amount;
        this.isPay = true;
      }
      if(ANSObtained.total > 0) {
        this.ansReleasedAmount = ANSObtained.total;
      }
      let ANSRewardAmount = await getIDOANSRewardAmount();
      if(ANSRewardAmount > 0) {
        this.ansRewardAmount = ANSRewardAmount;
      }
      let USDTRewardAmount = await getIDOUSDTRewardAmount();
      if(USDTRewardAmount > 0) {
        this.usdtRewardAmount = USDTRewardAmount;
      }
      let iDORemainNft = await getIDORemainNft();
      console.log(iDORemainNft);
      // console.log(ANSRewardAmount, USDTRewardAmount);
      // let ANSReleasedAmount = await getIDOReleasedAmount();
      if(iDORemainNft && iDORemainNft.balance) {
        this.remainingNFTReward = Number(iDORemainNft.balance);
      }
      if(iDORemainNft && iDORemainNft.countBalance) {
        this.countNFTReward = Number(iDORemainNft.countBalance) * 5;
        this.countNFTRewardSlider = Number(iDORemainNft.countBalance) >= 1 ? Number(iDORemainNft.countBalance) * 5 : 0;
      }
      // console.log(ANSObtainedAmount);
    },
    getNftPushedState() { //判断是否可以领取
      if(this.countNFTReward > 0) {
        if(this.countNFTReward == 5 || this.countNFTReward == 10 || this.countNFTReward == 15 || this.countNFTReward == 20 || this.countNFTReward == 25 || this.countNFTReward == 30) {
          console.log(this.countNFTReward);
          return true;
        } else {
          console.log(this.countNFTReward);
          return false;
        }
      }
      return false;
    },
    // 倒计时事件
    countTime() {
      this._interval = setInterval(() => {
        let date = new Date();
        let now = date.getTime();

        //设置截止时间
        var endDate = new Date(this.countDate.replace(/-/g,'/'));
        var endTime = endDate.getTime();
        //时间差
        let countTime = endTime - now;
        if (countTime <= 0) {
          // 计时结束，清除缓存
          clearInterval(this._interval);
          this.isStartExtract = true;
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
    creatQrCode() {
      let a = new QRCode(this.$refs.qrCodeUrl, {
        text: window.location.host + window.location.pathname + `#/ido?utm=${this.address}`,
        width: this.screenWidth >= 600 ? 180 : 150,
        height: this.screenWidth >= 600 ? 180 : 150,
        colorDark: "black", //#000000为黑色
        colorLight: "white",
      });
      console.log("二维码:", a);
    },
    changeGet(value){
       this.changeGetState = value;
    },
    showBind(){ //点击Bind 手动绑定推荐关系
       this.showBindAddressShow = true;
       this.inviteAddress = "";
    },
    BindAddressClick() { //点击手动绑定推荐关系确认按钮事假
      if(this.inviteAddress && this.inviteAddress !== '') {
        if(!addressCheck(this.inviteAddress)) {
          this.$notify({
            message: "邀请地址无效",
            type: "error",
          });
          return false;
        }
        this.showBindAddressShow = false;
        this.showBindState = true;
        this.utmAddressValue = this.utmAddressHref();
      }
    },
    showDirect(){ //显示直推下级列表弹框
      this.showDirectState = true;
      setTimeout(async()=>{
        let list = await getIDOOneLevelLists();
        if(list && list.length > 0) {
          this.LevelLists = list;
        }
        // console.log(list);
      }, 300)
    },
    changeDirectpush(value){ //改
       this.changeDirectpushState = value;
    },
    showDirectList(){
      //改
       this.showDirectListState = true;
    }
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
    .el-loading-mask {
        background-color: rgba(19, 29, 23, 0.8);
    }
    background: rgba(19, 29, 23, 1);
    font-size: 12px;

    .caintner {
      padding: 100px 0;
      //   max-width: 1970px;
      width: 90%;
      margin: 0 auto 0;
      color: #fff;
      .events-none {
        pointer-events: none;
      }
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
          width: 350px;
          height: 124px;
          // padding-top: 22px;
          color: #333;
          text-align: center;
          display: table;
          // margin-top: -16px;
          div {
            position: relative;
            top:24px;
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
        .approved {
          justify-content:center !important;
        }
        .left {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-direction: column;
          padding: 20px;
          height: 250px;
          background-color: #26352c;
          border-radius: 20px;
          // text-align: center;
          // border: 1px solid red;
          .approved-pay {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            .pay-yes {
              background: url(../../assets/img/ido/pay-yes.png) no-repeat center;
              background-size: contain;
              width: 180px;
              line-height: 80px;
              height: 80px;
              color: #333;
              text-align: center;
              cursor: pointer;
            }
            .pay-no {
              background: url(../../assets/img/ido/pay-no.png) no-repeat center;
              background-size: contain;
              width: 200px;
              line-height: 80px;
              height: 80px;
              color: #333;
              text-align: center;
              cursor: pointer;
            }
          }
          .approved-pay-steps {
            .steps {
              display: flex;
              align-items: center;
              .wire {
                width: 200px;
                height: 0;
                border: 1px dashed #335741;
              }
              .wire-success {
                width: 200px;
                height: 0;
                border: 1px dashed #70f4a5;
              }
            }
            .el-steps {
              width: 100px !important;
              margin: 0 auto !important;
            }
            margin-top: 10px;
          }
          .input {
            width: 70%;
            .el-input__inner {
              background-color: #161d18;
              height: 90px;
              color: #82d197;
              font-weight: 800;
              //   width: 80%;
              border: unset;
              line-height: 90px;
              border-radius: 100px;
              padding-top: 20px;
              .ans-obtained {

              }
            }
            .el-input__prefix {
              left: 30px;
              top: 20px;
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
          height: 250px;
          // border: 1px solid red;
          background-color: #26352c;
          border-radius: 20px;
          text-align: center;
          .input {
            width: 70%;
            .el-input__inner {
              background-color: #161d18;
              height: 90px;
              color: #82d197;
              font-weight: 800;
              //   width: 80%;
              border: unset;
              line-height: 90px;
              border-radius: 100px;
              display: flex;
              margin-right: 10px;
              padding-top: 20px;
            }
            .el-input__prefix {
              left: 30px;
              top: 20px;
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
        text-align: center;
        .rewards-box {
          //rewards
          background: url(../../assets/img/ido/rewards.png) no-repeat center;
          background-size: contain;
          width: 330px;
          line-height: 120px;
          height: 100px;
          color: #333;
          text-align: center;
          display: inline-grid;
          color: #fff;
          font-size: 25px;
        }
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
        padding: 0 100px 30px 100px;
        .save-code {
          float: left;
          padding-left: 20px;
        }
        .details-button {
          float: right;
          // 改s
          .details{
            width:151px;
            height:49px;
            background-size: 100% 100%;
          }
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
          .el-slider__runway.disabled .el-slider__bar {
            background-color:rgb(112, 244, 165);
          }
        }
        .badge {
          width: 100%;
          // height: 6px;
          // margin: 16px 0;
          // background-color: #E4E7ED;
          // border-radius: 3px;
          position: relative;
          font-size: 12px;
          text-align: center;
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
          margin-right:-70px;
          div{
            background: url(../../assets/img/ido/receive.png) no-repeat center;
            background-size: contain;
            width: 189px;
            line-height: 81px;
            height:81px;
            color: #131D17;
            text-align: center;
            cursor: pointer;
          }
          div#selected{
            background: url(../../assets/img/ido/received.png) no-repeat center;
            color: #502914;
          }
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
            top: 120px;
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
          .qrCodeurl {
            position: relative;
            top: 85px;
            left: 110px;
            // padding: 50px;
          }
        }
        .CopyBtn{
          display: flex;
          width:417px;
          justify-content: center;
          div {
            cursor: pointer;
          }
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
          width: 100%;
          height: 350px;
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          text-align: center;
          .left{
            // width:48%;
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
        .el-dialog__body {
          padding-top: 0;
        }
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
          .seeANS{
            background:#000;
            border-radius: 28px;
            width: 151px;
            margin:auto;
            margin-top: 10px;
            display: flex;
            padding:10px 10px;
            color:#70F4A5;
            font-size: 18px;
            font-weight: 900;
            justify-content: center;
            align-items: center;
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

      .tableList{  //改
          color:#fff;
          margin-top: 10px;
          height: 200px;
          overflow: auto;
          .listli{
            display: flex;
            width:100%;
            .abs{
              // width:30px;overflow: hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              line-height: 30px;
              margin: 0 auto;
              font-size: 16px;
            }
            .li{
              flex: 1;
              margin-top:15px;
              :last-child{
                color:#70F4A5;
              }
            }
          }
          .seeANS{
            background:#000;
            border-radius: 28px;
            width: 151px;
            margin:auto;
            margin-top: 20px;
            display: flex;
            padding:10px 10px;
            color:#70F4A5;
            font-size: 12px;
            justify-content: center;
            align-items: center;
            .details{
              width:45px;
              height:20px;
              margin-left:10px;
              line-height: 20px;
            }
          }
      }
      .directList{  //改
          color:#fff;
        .listli{
          display: flex;
          justify-content: space-between;
          width:100%;
          align-items: center;
          .abs{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            line-height: 30px;
          }
          .li{
            margin-top:15px;
            display: flex;
            align-items: center;
            div:last-child{
              color:#70F4A5;
              margin-left:10px;

            }
            div:first-child{
              background:#000;
              border-radius: 50%;
              width:36px;
              height:36px;
              img{
                width:100%;
              }
              
            }
          }
        }
        
      }

      .elDialogBind {
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
        .input {
          height: 34px;
          padding: 5px;
          background-color: #131D17;
          border-radius: 26px;
          color: #fff;
          .el-dialog__title {
            color: #fff;
          }
          .number {
            margin-top: -3px;
            .el-input__inner {
              border-radius: 26px;
              background-color: #131D17;
              font-size: 12px;
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
        .extract-dialog-max{
          width:194px;
          height:90px;
          height:auto;
          background: url(../../assets/img/ido/bindBtn.png) no-repeat center;
        }
        
      }
    }
  }
}
.main {
  .caintner {
    .promote-box{
      padding-right:0px;
      padding-left:0px;
      .qrcode {
        width: 320px;
        margin-top: -100px;
        .address {
          top: 180px;
          width: 300px;
          padding: 0;
        }
        .qrCodeurl {
            position: relative;
            top: 110px;
            left: 86px;
            padding: 0;
            width: 100px;
            img {
              width: 100px !important;
            }
        }
      }
      .CopyBtn{
        width:100%;
        padding:0 30px;
        box-sizing: border-box;
        margin-top: -40px;
      }
      .details-button{
        margin-right: 20px;
      }
      .badge{
        margin-left:10px;
        width:94%;
        margin-right:10px;
        .img-05,.img-10,.img-15,.img-20,.img-25,.img-30{
          width:10%;
          font-size: 15px;
          img{
            width:100%;
          }
        }
      }
      .receive{
        justify-content: center;
        margin-right:0;
      }
      .bottom-box{
        height: 373px;
        // display: block;
        // position: absolute;
        .left,.right{
          margin-top: 20px;
          width:100%;
          border:1px solid #335741;
   
        }
      }
    }
    
    .buy-box {
      .left {
        .input {
          padding: 10px;
          width: 100%;
        }
        .approved-pay{
          width:98%;
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
  }
}
</style>