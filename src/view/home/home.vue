<template>
  <div :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']">
    <!-- <img :src="bannerbjIMg" alt class="banner" /> -->
    <div
      class="banner"
      :style="`background-image: url(${bannerbjIMg});background-size: cover;`"
    >
      <div class="bannerm" v-if="this.screenWidth >= 600">
        <div class="inner">
          <div class="img">
            <img src="@/assets/img/bannerlogo.png" alt="" class="bannerlogo" />
          </div>
          <div class="text">
            <img :src="tilebanner" alt="" class="bannertitle" />
            <div class="navss">
              <div>
                <img src="@/assets/img/inconbanner.png" alt="" /><span>{{ $t('home-Battle') }}</span>
              </div>
              <div>
                <img src="@/assets/img/inconbanner.png" alt="" /><span
                  >{{ $t('home-EXPLORATION') }}</span
                >
              </div>
              <div>
                <img src="@/assets/img/inconbanner.png" alt="" /><span
                  >{{ $t('home-FARMING') }}</span
                >
              </div>
              <div>
                <img src="@/assets/img/inconbanner.png" alt="" /><span
                  >{{ $t('home-FOSTERING') }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="btnBox">
          <div class="bannerbtn1" @click="toWhitPaper">IDO</div>
          <div class="bannerbtn2" @click="goNFT">Mint</div>
          <!-- <img src="@/assets/img/bannerbtn1.png" alt="" @click="toWhitPaper" /> -->
          <!-- <img src="@/assets/img/bannerbtn2.png" alt="" @click="goNFT" /> -->
        </div>
      </div>
      <div class="bannerm" v-else>
        <img src="@/assets/img/bannerlogo.png" alt="" class="bannerlogo" />
        <img :src="tilebanner" alt="" class="bannertitle" />
        <div class="navss">
          <div>
            <img src="@/assets/img/inconbanner.png" alt="" /><span>{{ $t('home-Battle') }}</span>
          </div>
          <div>
            <img src="@/assets/img/inconbanner.png" alt="" /><span
              >{{ $t('home-EXPLORATION') }}</span
            >
          </div>
          <div>
            <img src="@/assets/img/inconbanner.png" alt="" /><span
              >{{ $t('home-FARMING') }}</span
            >
          </div>
          <div>
            <img src="@/assets/img/inconbanner.png" alt="" /><span
              >{{ $t('home-FOSTERING') }}</span
            >
          </div>
        </div>
        <div class="btnBox">
          <div class="bannerbtn1" @click="toWhitPaper">IDO</div>
          <div class="bannerbtn2" @click="goNFT">Mint</div>
          <!-- <img src="@/assets/img/bannerbtn1.png" alt="" @click="toWhitPaper" />
          <img src="@/assets/img/bannerbtn2.png" alt="" @click="goNFT" /> -->
        </div>
      </div>
    </div>
    <div class="caintner">
      <div class="part2">
        <img src="@/assets/img/tittle1.png" alt="" class="tittle" />
        <div class="partmain">
          <el-row class="boxflex">
            <el-col :xs="24" :md="14" :lg="14" :xl="14">
              <div class="left">
                <img src="@/assets/img/vido.png" alt="" />
                <video controls poster="@/assets/img/vidoimg.png" class="video"  controls="controls">
                  <source src="@/assets/video/AngelValley.mp4" type="video/mp4">
                  {{ $t('home-video-no-tag') }}
                </video>
                <img src="@/assets/img/topleft.png" alt="" class="topleft" />
<!--                <img src="@/assets/img/play.png" alt="" class="play" @click="gohttp">-->
              </div>
            </el-col>
            <el-col :xs="24" :md="10" :lg="10" :xl="10">
              <div class="right">
<!--                <div class="color">-->
<!--                  <img src="@/assets/img/vidoicon.png" alt="" /><span-->
<!--                    @click="gohttp"-->
<!--                    >https://youtube/AngelValley</span-->
<!--                  >-->
<!--                </div>-->
                <p>
                  {{ $t('home-nftPlayDesc') }}
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div
      class="part3"
      :style="`background-image: url(${part3bjIMg}) ;background-size: cover;`"
    >
      <div class="shubox">
        <img src="@/assets/img/shu.png" alt="" class="shu1" />
        <img
          src="@/assets/img/shu.png"
          alt=""
          class="shu2"
          v-if="this.screenWidth >= 600"
        />
      </div>
      <img src="@/assets/img/tittle2.png" alt="" class="tittle" />
      <div class="testp">
        <p>{{ $t('home-yourFirstAngel-01') }}</p>
        <p>{{ $t('home-yourFirstAngel-02') }}</p>
        <p>{{ $t('home-yourFirstAngel-03') }}</p>
      </div>
      <div class="imgpart3">
        <div class="scroll">
          <img src="@/assets/img/c1.png" alt="" class="iconimg" />
          <img src="@/assets/img/c2.png" alt="" class="iconimg" />
          <img src="@/assets/img/c3.png" alt="" class="iconimg" />
          <img src="@/assets/img/c4.png" alt="" class="iconimg" />
          <img src="@/assets/img/c5.png" alt="" class="iconimg" />
        </div>
      </div>
    </div>

    <!-- <div class="part4" :style="`background-image: url(${part4bjIMg}) ;   `">
      <img src="@/assets/img/tittle4.png" alt="" class="tittle" />
      <div class="mianbox">
        <el-row>
          <el-col :xs="24" :md="8" :lg="8" :xl="8">
            <div class="items bj1">
              <p>
                Battle against wild cursed Angel and other trainers to increase
                your Angel’s level. A angel with a higher level can defeat
                stronger foes receive better rewards.
              </p>
            </div>
          </el-col>
          <el-col :xs="24" :md="8" :lg="8" :xl="8">
            <div class="items bj2">
              <p>
                Send your Angel to the Angel Sage to learn spells. Increasing
                your Angel’s spell level will allow it to gather valuable
                in-game tokenized resources
              </p>
            </div>
          </el-col>
          <el-col :xs="24" :md="8" :lg="8" :xl="8">
            <div class="items bj3">
              <p>
                Feed your Angel its favourite food to increase its happiness
                level. A higher happiness level unlocks higher staking reward
                APY when a Angel is assigned to the Shrine of Giving.
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div> -->

    <div class="part5" id="topscroll">
      <img src="@/assets/img/tittle5.png" alt="" class="tittle" />
      <div class="mianpart5">
        <div class="top">
          <img src="@/assets/img/money.png" alt="" />
          <span>{{ $t('home-TotalSupply') }}: 100,000,000</span>
        </div>
        <img src="@/assets/img/data4.png" class="datas" alt="" />
        <!-- <p>
          <span>Contract Address：</span>

          <i
            >{{contractAddress}}
            <img src="@/assets/img/copy.png" alt="" @click="copyCode()"
          /></i>
        </p> -->
      </div>
    </div>

    <div class="part6" :style="`background-image: url(${part6bjIMg}) ;   `">
      <img src="@/assets/img/tittle6.png" alt="" class="tittle" />
      <el-row class="boxflex">
        <el-col :xs="24" :md="14" :lg="14" :xl="14">
          <div class="right">
            <p>{{ $t('home-ExcitingFuture-01') }}</p>
            <p>{{ $t('home-ExcitingFuture-02') }}</p>
            <p>{{ $t('home-ExcitingFuture-03') }}</p>
          </div>
        </el-col>
        <el-col :xs="24" :md="10" :lg="10" :xl="10">
          <div class="left">
            <img src="@/assets/img/right5.png" alt="" @click="bigimg" class="mainmap" />
            <img src="@/assets/img/maptip.png" alt="" class="tip">
          </div>
        </el-col>
      </el-row>
      <div class="textmain">
        <img src="@/assets/img/part6icon.png" alt="" />
        <p>{{ $t('home-AngelNFTs-01') }}</p>
        <p>{{ $t('home-AngelNFTs-02') }}</p>
      </div>
      <div class="xunzhang">
        <div :class="this.screenWidth < 600 ? '' : 'swipers'">
          <el-row>
            <el-col :xs="24" :md="10" :lg="10" :xl="10">
              <div class="left">
                <swiper :options="swiperOption" ref="myswiper">
                  <swiper-slide
                    class="swiper-slide"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    <div class="itemMain">
                      <img :src="item.bjimh" class="itemMainbj" alt />
                      <img :src="item.icon" class="xz" alt />
                      <p>{{ item.name }}</p>
                    </div>
                  </swiper-slide>
                  <img
                    src="@/assets/img/swiperLeft.png"
                    slot="button-prev"
                    class="swiper-button-prev swiperLeft"
                  />
                  <img
                    src="@/assets/img/swiperRight.png"
                    slot="button-next"
                    class="swiper-button-next swiperRight"
                  />
                </swiper>
              </div>
            </el-col>
            <el-col :xs="24" :md="14" :lg="14" :xl="14">
              <div class="titl">{{ $t('home-Introduction') }}</div>

              <p class="instars">
                {{ desr }}
              </p>
              <img
                src="@/assets/img/btnn.png"
                alt
                class="btnn"
                @click="goNFT"
              />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="part7">
      <img src="@/assets/img/tittle6.png" alt="" class="tittle" />
      <div class="mainpart7">
        <el-row>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in1.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in2.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in3.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in4.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in5.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in6.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in7.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in8.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in9.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in10.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in11.png" alt="" />
          </el-col>
          <el-col :xs="8" :md="4" :lg="4" :xl="4">
            <img src="@/assets/img/in12.png" alt="" />
          </el-col>
        </el-row>
      </div>
      <img src="@/assets/img/bottonlogo.png" class="bottonlogo" alt="" />
      <div class="boxflex">
        <div
          class="item"
          v-for="(item, key) in navImgbottom"
          :key="key"
          @mouseenter="enterbottom(key)"
        >
          <img :src="item.img" alt="" v-if="item.mouse" />
          <img
            :src="item.imgHover"
            v-if="!item.mouse"
            alt=""
            @mouseout="outbottom(key)"
            @click="toSocial(item.href)"
          />
          <span>{{ $i18n.locale === 'en' ? item.span : item.span_ts }}</span>
        </div>
      </div>
    </div>

    <!-- <div class="btnhome" @click="goNFT">
      <img :src="btn" alt :class="this.screenWidth < 600 ? 'btns' : 'btnns'" />
    </div> -->

    <div class="foot">
      <el-row :class="[this.screenWidth >= 600 ? 'flex' : '']">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="footLogo" @click="gotop">
            <img src="../../assets/img/logo.png" alt="logo" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
<!--          <div class="footList">-->
<!--            <span @click="goNFT">NFT</span>-->
<!--            <span @click="Homepage">Road Map </span>-->
<!--          </div>-->
          <p class="ptip" v-if="this.screenWidth >= 600">
            {{ $t('home-Copyright') }}
          </p>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="footImg">
            <div
              v-for="(item, key) in navImg"
              :key="key"
              @mouseenter="enter(key)"
            >
              <img :src="item.img" alt v-if="item.mouse" />
              <img
                :src="item.imgHover"
                alt
                v-if="!item.mouse"
                @mouseout="out(key)"
                @click="toSocial(item.link)"
              />
            </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="8"
          :md="8"
          :lg="8"
          :xl="8"
          v-if="this.screenWidth < 600"
        >
          <p class="intsra">{{ $t('home-Copyright') }}</p>
        </el-col>
      </el-row>
    </div>
    <bigImg v-if="shows" :show="shows" @getCancel="shows = false"></bigImg>
  </div>
</template>
<script>
import bigImg from "./bigImg.vue";
export default {
  components: {
    bigImg,
  },
  data() {
    return {
      contractAddress:"0x15b0eE096Ea786160390d5cD7816801E5fed871d",
      screenWidth: this.GLOBAL.clientWidth,
      shows: false, //大图
      bannerbjIMg: "",
      part3bjIMg: "",
      part4bjIMg: "",
      tilebanner: "",
      part6bjIMg: "",
      btn: require("@/assets/img/btnn.png"),
      list: this.GLOBAL.list,
      navImg: [
        {
          img: require(`@/assets/img/navRight1.png`),
          imgHover: require(`@/assets/img/navRight1h.png`),
          mouse: true,
          link: "https://youtube.com/channel/UCDrnEsm1VzqFWwBN5ojuvUQ",
        },
        {
          img: require(`@/assets/img/navRight2.png`),
          imgHover: require(`@/assets/img/navRight2h.png`),
          link: "https://t.me/AngelValleyMetaverse",
          mouse: true,
        },
        {
          img: require(`@/assets/img/navRight3.png`),
          imgHover: require(`@/assets/img/navRight3h.png`),
          link: "https://discord.gg/mDqG2T4Erq",
          mouse: true,
        },
        {
          img: require(`@/assets/img/navRight4.png`),
          imgHover: require(`@/assets/img/navRight4h.png`),
          link: "https://twitter.com/AngelValleyTeam",
          mouse: true,
        },
      ],
      navImgbottom: [
        {
          img: require(`@/assets/img/iconbotton1.png`),
          imgHover: require(`@/assets/img/iconbotton1h.png`),
          span: "Twitter",
          span_ts: "推特",
          href:'https://twitter.com/AngelValleyTeam',
          mouse: true,
        },
        {
          img: require(`@/assets/img/iconbotton2.png`),
          imgHover: require(`@/assets/img/iconbotton2h.png`),
          span: "Telegram",
          span_ts: "電報",
          href:'https://t.me/AngelValleyMetaverse',
          mouse: true,
        },
        {
          img: require(`@/assets/img/iconbotton3.png`),
          imgHover: require(`@/assets/img/iconbotton3h.png`),
          span: "discord",
          span_ts: "不和諧",
          href:'https://discord.gg/mDqG2T4Erq',
          mouse: true,
        },
      ],
      swiperOption: {
        //显示分页
        pagination: {
          el: ".swiper-pagination",
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        //自动轮播
        //开启循环模式
        loop: true,
      },
      test: "0c57822fdsgfdbcv 435axcxd64767vsfgdfgvfd3455567qQ",
      indexActiveswiper: 1,
      desr: "Buried in the depths of the ancient volcanic mountains in the Alps, with the appearance of angels, some stones began to show strange elemental reactions. When the elves passed by these rocks with turquoise light, the inside of the stones would burst into explosions. Sound. Function: It can incubate a powerful offensive angel.",
    };
  },
  watch: {
    $route(to, from) {
      this.activeNav();
    },
  },

  computed: {
    // 获取swiper实例
    swiper() {
      return this.$refs.myswiper.$swiper;
    },
  },
  mounted() {
    this.setDialogWidth();
    this.activeNav();

    let that = this;
    // console.log(222);
    that.goDetail(0);
    this.swiper.on("click", function () {
      const clickedIndex = this.activeIndex;
      // console.log(clickedIndex);
      // 这里的that是Vue的实例
      that.goDetail(clickedIndex);
    });
  },
  methods: {
    toSocial(href){
      window.open(href,'_blank')
    },
    toWhitPaper(){
      this.$router.push({
        path: "/ido",
      });
      // window.open('http://www.angelvalleymetaverse.com/AngelValley.pdf' ,'_blank')
    },
    activeNav() {
      if (this.screenWidth < 600) {
        if (this.$route.query.id) {
          document.body.scrollTop = document.documentElement.scrollTop = "3250";
        } else {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      } else {
        if (this.$route.query.id) {
          document.body.scrollTop = document.documentElement.scrollTop = "2900";
        } else {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      }
    },
    setDialogWidth() {
      if (this.screenWidth < 600) {
        this.bannerbjIMg = require("@/assets/img/bannerbj600New.png");
        this.part3bjIMg = require("@/assets/img/vbj600.png");
        this.part4bjIMg = require("@/assets/img/part4bj600.jpg");
        this.tilebanner = require("@/assets/img/bannertitle600.png");
        this.part6bjIMg = require("@/assets/img/part6bjIMg600.png");
      } else {
        this.bannerbjIMg = require("@/assets/img/bannerbjnew.png");
        this.part3bjIMg = require("@/assets/img/vbj.png");
        this.part4bjIMg = require("@/assets/img/part4bj.png");
        this.tilebanner = require("@/assets/img/bannertitle.png");
        this.part6bjIMg = require("@/assets/img/part6bjIMg.png");
      }
    },
    goNFT() {
      this.$router.push({
        path: "/blindbox",
      });
    },
    //第七部分的滑动
    enterbottom(i) {
      for (let index = 0; index < this.navImgbottom.length; index++) {
        if (i == index) {
          this.navImgbottom[index].mouse = false;
        } else {
          this.navImgbottom[index].mouse = true;
        }
      }
    },
    outbottom() {
      for (let index = 0; index < this.navImgbottom.length; index++) {
        this.navImgbottom[index].mouse = true;
      }
    },
    //底部的部分的滑动
    enter(i) {
      for (let index = 0; index < this.navImg.length; index++) {
        if (i == index) {
          this.navImg[index].mouse = false;
        } else {
          this.navImg[index].mouse = true;
        }
      }
    },
    out() {
      for (let index = 0; index < this.navImg.length; index++) {
        this.navImg[index].mouse = true;
      }
    },
    copyCode(data) {
      //创建一个input元素
      let input = document.createElement("input");
      //给input的内容复制
      input.value = this.contractAddress;
      // 在body里面插入这个元素
      document.body.appendChild(input);
      // 选中input里面内容
      input.select();
      //执行document里面的复制方法
      document.execCommand("Copy");
      // 复制之后移除这个元素
      document.body.removeChild(input);

      this.$notify({
        title: "success",
        message: "已复制到剪切板",
        type: "success",
      });
    },
    gohttp() {
      window.open('https://youtube/AngelValley' ,'_blank')
    },
    gotop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    Homepage() {
      this.$router.push({
        path: "/homepage",
      });
    },
    //获取勋章详情
    goDetail(v) {
      let locale = this.$i18n.locale;
      // console.log(locale,this.list);
      let index = v;
      if (v == 6) {
        index = 1;
        if(locale === 'en') {
          this.desr = this.list[index].info_en;
        } else {
          this.desr = this.list[index].info_ts;
        }
      } else if (v == 7) {
        if(locale === 'en') {
          this.desr = this.list[2].info_en;
        } else {
          this.desr = this.list[2].info_ts;
        }
      } else {
        index = v * 1 + 1;
        if(locale === 'en') {
          this.desr = this.list[index].info_en;
        } else {
          this.desr = this.list[index].info_ts;
        }
      }
    },
    bigimg() {
      console.log("2");
      this.shows = true;
    },
    getContractAddr(){
      return 444
    }
  },
};
</script>
<style scoped  lang="less" >
.pcmain {
  background: rgba(19, 29, 23, 1);
  font-size: 12px;
  font-family: "Share-Tech.woff";
  .caintner {
    max-width: 1970px;
    width: 80%;
    margin: 0 auto;
  }
  .banner {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
    min-height: 660px;
    position: relative;
    // background-size: auto calc(100% + 40px);
    background-repeat: no-repeat;
    background-position: center ;
    .bannerm {
      position: absolute;
      transform: translate(-50%, 0);
      top: .8rem;
      left: 50%;
      text-align: center;
      .inner {
        display: block;
        .text {
          padding-top: 40px;
          padding-left: 20px;
        }
      }
      .bannerlogo {
        width: 3.15rem;
        height: auto;
        margin: 0 auto;
        margin-bottom: 5px;
      }
      .bannertitle {
        // width: 870px;
        height: 60px;
        margin: 0 auto;
        margin-bottom: 3px;
      }
      .navss {
        display: flex;
        // width: 700px;
        padding: 0 50px;
        justify-content: space-between;
        // margin: 0 auto;
        margin-bottom: 30px;
          font-size: 20px;
          text-shadow: 0px 6px 6px rgba(0, 0, 0, 0.5);
        img {
          width: 26px;
          height: 26px;
          vertical-align: middle;
        }
      }
      .btnBox {
        margin: 0 auto;
        display: flex;
        width: 640px;
        justify-content: space-between;
        .bannerbtn1 {
          background: url(../../assets/img/bannerbtn1.png) no-repeat center;
          background-size: contain;
          width: 330px;
          line-height: 100px;
          height: 100px;
          color: #fff;
          text-align: center;
          font-size: 20px;
          font-weight: 900;
          cursor: pointer;
        }
        .bannerbtn2 {
          background: url(../../assets/img/bannerbtn2.png) no-repeat center;
          background-size: contain;
          width: 330px;
          line-height: 100px;
          height: 100px;
          color: #fff;
          text-align: center;
          font-size: 20px;
          font-weight: 900;
          cursor: pointer;
        }
        img {
          width: 210px;
          cursor: pointer;
        }
      }
    }
  }
  .part2 {
    padding: 100px 0;
    .tittle {
      width: 673px;
      // height: 80px;
      margin: 0 auto 30px;
      display: block;
    }
    .partmain {
      .boxflex {
        align-items: center;
        display: flex;
      }

      margin: 0 auto;
      .left {
        position: relative;
        img {
          width: 100%;
        }
        .vidoimg {
          position: absolute;
          width: 84%;
          left: 50%;
          transform: translate(-50%, 0);
          top: 9%;
        }
        .topleft {
          position: absolute;
          width: 40%;
          left: -20px;
          top: -40px;
        }
        .play{
           position: absolute;
          width: 40px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .right {
        margin-left: 30px;
        img {
          width: 107px;
          height: 32px;
          vertical-align: middle;
          margin-right: 10px;
        }
        .color {
          color: rgba(112, 244, 165, 1);
          text-decoration: underline;
          span {
            cursor: pointer;
          }
        }
        p {
          margin-top: 20px;
          font-size: 14px;
        }
      }
    }
  }
  .part3 {
    padding: 60px 0;
    .shubox {
      width: 80%;
      height: 1px;
      position: relative;
      margin: auto;
      .shu1 {
        position: absolute;
        left: 0;
        top: -116px;
        width: 118px;
        height: 129px;
      }
      .shu2 {
        position: absolute;
        right: 0;
        top: -116px;
        width: 118px;
        height: 129px;
      }
    }
    .tittle {
      width: 633px;
      display: block;
      margin: 0 auto;
    }
    .testp {
      margin: 50px auto 0;
      p {
        text-align: center;
        margin: 20px;
      }
    }
    .imgpart3 {
      margin: 64px auto 0;
      max-width: 1280px;
      width: 80%;
      img {
        width: 20%;
        // margin-right: 20px;
        margin-bottom: 40px;
      }
      img:last-child {
        margin-right: 0;
      }
    }
  }
  .part4 {
    padding: .8rem 0;
    background-size: cover;
    .tittle {
      width: 633px;
      display: block;
      margin: auto;
      margin: 30px auto 50px;
    }
    .mianbox {
      width: 1300px;
      margin: 30px auto;
    }
    .items {
      width: 227px;
      height: 250px;
      margin: 0 auto;
      p {
        padding: 20px 20px 30px 40px;
        line-height: 14px;
        font-size: 12px;
      }
    }
    .bj3 {
      background: url("../../assets/img/v1.png") no-repeat center;
      background-size: contain;
    }
    .bj2 {
      background: url("../../assets/img/v2.png") no-repeat center;
      background-size: contain;
    }
    .bj1 {
      background: url("../../assets/img/v3.png") no-repeat center;
      background-size: contain;
    }
  }

  .part5 {
    .tittle {
      width: 633px;
      display: block;

      margin: 30px auto 50px;
    }
    .mianpart5 {
      max-width: 1200px;
      // height: 626px;
      padding: 75px 0;
      margin: 0 auto;
      text-align: center;
      background-size: contain;
      background-image: url("../../assets/img/databj4.png");
      background-repeat: no-repeat;
      background-position: center;
      .top {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 125px;
          margin-right: 20px;
        }
        span {
          font-size: 20px;
          font-weight: 900;
          color: #70f4a5;
        }
      }
      .datas {
        width: 60%;
        margin: 0 auto;
      }
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          color: rgba(112, 244, 165, 1);
        }
        img {
          margin-left: 10px;
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }
  }
  .part6 {
    padding: 0 10%;
    background-size: cover;
    .tittle {
      width: 633px;
      display: block;
      padding-top: 30px;
      margin: 0 auto 50px;
    }
    .right {
      p {
        margin-bottom: 20px;
      }
    }
    .boxflex {
      display: flex;
      align-items: center;
      .left {
        width: 100%;
        position: relative;
        .mainmap {
          width: 100%;
          cursor: pointer;
        }
        .tip{
          position: absolute;
          width: 175px;
          left: 50%;
          transform: translate(-50%, 0);
          top: 30px;
        }
      }
    }
    .textmain {
      img {
        width: 120px;
        margin-bottom: 20px;
      }
      p {
        margin-bottom: 20px;
      }
    }
  }

  .xunzhang {
    position: relative;
    padding-bottom: 70px;
    .home2 {
      width: 100%;
    }
    .swipers {
    }
    .left {
      text-align: center;
      padding: 20px;
      position: relative;

      .itemMain {
        position: relative;
        width: 70%;
        height: 300px;
        margin: 0 auto;
        p {
          position: absolute;
          bottom: 10%;
          font-size: 18px;
          width: 100%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #70f4a5;
        }
        .itemMainbj {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .xz {
          width: 70%;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);

          max-width: 227px;
        }
      }
      .swiperLeft {
        width: 33px;
        height: 30px;
      }
      .swiperRight {
        width: 33px;
        height: 30px;
      }
    }
    p {
      .btnns {
        width: 40%;
        margin: 0 auto;
        position: absolute;
        bottom: -10%;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    .titl {
      font-size: 18px;
      font-weight: normal;
      color: #70f4a5;
      font-weight: 900;
      margin: 20px 0;
    }
    .instars {
      min-height: 80px;
      background: #131d17;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .btnn {
      // width: 300px;
      width: 6rem;
      margin: 0 auto;
      display: block;
      cursor: pointer;
    }
    // .right {
    //   margin-left: 30px;
    //   .info {
    //     margin-bottom: 10px;
    //     p {
    //       font-weight: 800;
    //       color: #ffffff;
    //       line-height: 24px;
    //     }
    //   }
    //   h6 {
    //     margin: 0;
    //     margin-bottom: 10px;
    //     color: #70f4a5;
    //     font-size: 16px;
    //   }

    //   .count {
    //     .bj {
    //       display: flex;
    //       justify-content: space-between;
    //       position: relative;
    //       padding: 35px 44px;
    //       .bj600s {
    //         width: 100%;
    //         height: 130px;
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         z-index: 0;
    //       }
    //       .item {
    //         z-index: 9;
    //         img {
    //           width: 20px;

    //           vertical-align: middle;
    //         }
    //       }
    //       span {
    //         color: #70f4a5;
    //       }
    //       p {
    //         margin: 10px 0;
    //         text-align: center;
    //       }
    //     }
    //     .bj600 {
    //       padding: 15px 20px;
    //       p {
    //         margin: 2px 0;
    //         text-align: center;
    //       }
    //     }
    //   }
    // }
  }
  .part7 {
    padding: 40px;
    .tittle {
      width: 633px;
      display: block;
      padding: 30px 0;
      margin: 0 auto;
    }
    .mainpart7 {
      padding: 0 10%;
      img {
        display: block;
        width: calc(100% - 24px);
        margin: 0 auto ;
        margin-bottom: 24px;
      }
    }
    .bottonlogo {
      width: 200px;
      margin: 0 auto 30px;
      display: block;
    }
    .boxflex {
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        cursor: pointer;
        img {
          width: 40px;
          margin-right: 5px;
        }
        span {
          display: block;
        }
      }
    }
  }

  .btnhome {
    img {
      width: 40%;
      margin: 10px auto;
      display: block;
    }
  }
}
.foot {
  background: #1b2c22;
  padding: 20px;
  .flex {
    display: flex;
    align-items: center;
  }
  .footLogo {
    img {
      width: 30%;
    }
  }
  .footList {
    text-align: center;
    span {
      padding: 10px;
      cursor: pointer;
    }
  }
  .ptip {
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
  }
  .footImg {
    text-align: right;
    div {
      display: inline-block;
    }
    img {
      margin-right: 10px;
      width: 30px;
      cursor: pointer;
    }
  }
}
.main {
  img {
    display: block;
  }
  .caintner {
    width: 100%;
  }
  .pcmain .xunzhang .swipers {
    position: relative;
  }
  .xunzhang .left .swiperLeft {
    left: 0px;
  }
  .xunzhang .left .swiperRight {
    right: 0;
  }
  .btnxzs {
    width: 100%;
  }
  .btnhome {
    img {
      width: 90%;
      margin: 10px auto;
      display: block;
    }
  }
  .foot {
    background: #1b2c22;
    padding: 20px;

    .footLogo {
      margin-bottom: 10px;
      img {
        margin: 0 auto;
        display: block;
      }
    }
    .footList {
      text-align: center;
      margin-bottom: 20px;
      margin-top: 20px;
    }

    .footImg {
      text-align: center;
      display: flex;
      width: 60%;
      margin: 0 auto;
      justify-content: space-between;
      img {
        margin-right: 10px;
        width: 30px;
      }
    }
    .intsra {
      margin-top: 20px;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  }
  .banner {
    min-height: 100vh;
    .bannerm {
      .bannerlogo {
        width: 3.15rem;
        height: auto;
      }
      .bannertitle {
        // width: 70%;
        height: 1.4rem;
      }
      .navss {
        width: 80%;
        margin: 0 auto;
        margin-bottom: 50px;
        // margin-bottom: 50rem;
        font-size: 12px;
        padding: 0;
        div {
          display: flex;
          margin-right: 10px;
        }
        img {
          width: 15px;
          height: 15px;
        }
      }
      .btnBox {
        width: 85%;
        .bannerbtn1 {
          background: url(../../assets/img/bannerbtn1.png) no-repeat center;
          background-size: contain;
          width: 200px;
          line-height: 80px;
          height: 80px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-weight: 900;
          cursor: pointer;
        }
        .bannerbtn2 {
          background: url(../../assets/img/bannerbtn2.png) no-repeat center;
          background-size: contain;
          width: 200px;
          line-height: 80px;
          height: 80px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-weight: 900;
          cursor: pointer;
        }
        img {
          width: 150px;
          height: 77px;
        }
      }
    }
  }
  .caintner {
    .part2 {
      width: 100%;
      padding: 60px 0;
      .tittle {
        width: 80%;
      }
      .partmain {
        width: 90%;
        .boxflex {
          display: flex;
          flex-direction: column;
        }
        .left {
          .topleft {
            top: -23px;
          }
        }
        .right {
          margin-left: 0;
          .color {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  .part3 {
    width: 100%;
    padding: 100px 0 100px;
    .tittle {
      width: 80%;
    }

    .shubox {
      width: 100%;
      .shu1 {
        position: absolute;
        transform: translate(-50%, 0);
        top: -145px;
        left: 50%;
      }
    }
    .testp {
      p {
        text-align: left;
      }
    }
    .imgpart3 {
      margin: 0 auto 0;
      width: 100%;
      overflow: scroll;
      float: left;

      .scroll {
        width: 17rem;
      }
      img {
        width: 3.36rem;
        display: inline-block;
      }
    }
  }
  .part4 {
    background-size: contain;
    background-position: bottom;
    background-repeat: no-repeat;
    .tittle {
      width: 80%;
      display: block;
      margin: 0 auto;
    }
    .mianbox {
      width: 100%;
      margin: 30px auto;
    }
    .items {
      // height: 360px;
      // width: 326px;
      height: 7.3rem;
      width: 6.53rem;
      margin-left: 0;
      margin-bottom: 30px;
      p {
        padding: 20px 20px 30px 58px;
        line-height: 19px;
        font-size: 18px;
      }
    }
  }
  .part5 {
    position: relative;
    padding-bottom: 80px;
    .tittle {
      width: 80%;
      display: block;
      margin: 10px auto 20px;
    }
    .mianpart5 {
      width: 90%;
      padding: 22px 0;
      .top {
        img {
          width: 25px;
          margin-right: 20px;
        }
        span {
          font-size: 12px;
          font-weight: 900;
          color: #70f4a5;
        }
      }
      .datas {
        width: 80%;
        margin: 11px auto 0;
      }
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        /* margin-top: 30px; */
        position: absolute;
        width: 100%;
        left: 50%;
        bottom: 0px;
        font-size: 12px;
        transform: translate(-50%, 0);
        span {
          display: block;
        }
        i {
          font-style: normal;
          font-size: 12px;
          img {
            display: inline-block;
            vertical-align: middle;
            margin-left: 2px;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }

  .part6 {
    position: relative;
    margin-top: 20px;
    background-size: contain;
    >div{
      position: relative;
      z-index: 2;
    }
    .tittle {
      width: 100%;
    }
    .boxflex {
      display: block;
    }
    .xunzhang .left .itemMain {
      height: 210px;
    }
      .boxflex .left {
        width: 100%;
        position: relative;
        .mainmap {
          width: 100%;
        }
        .tip{
          position: absolute;
          width: 175px;
          left: 50%;
          transform: translate(-50%, 0);
          top: 25px;
        }
      }
  }
   .part6::after {
    content: '';
    display: block;
    width: 100%;
    height: 15rem;
    background-image: linear-gradient(180deg, rgba(29, 66, 53 , 0) 0% , rgba(29, 66, 53 , 1) 50% , rgba(29, 66, 53 , 1) 100% );
    position: absolute;
    bottom: 0%;
    left: 0;
    z-index: 1;
  }
  .part7 {
    padding: 40px 10px;
    .tittle {
      width: 90%;
    }
    .mainpart7 {
      padding: 0;
      img {
        width: calc(100% - .12rem);
        margin: 0 auto .12rem;
      }
    }
    .boxflex {
      padding:0 .2rem;
      img {
        width: 20px;
      }
      .item {
        width: 33.3%;
      }
      .item:nth-of-type(1){
        justify-content: flex-start;
      }
      .item:nth-of-type(2){
        justify-content: center;
      }
      .item:nth-of-type(3){
        justify-content: flex-end;
      }
    }
  }
}
.pcmain.main{
  .part4{
    .mianbox{
      padding-left: .2rem;
    }
  }
}

.iconimg{
  animation: loading 3s ease infinite;
}
@keyframes loading {
  0%{ transform:translateY(0) scale(1,1);}
  /* 中间状态图片位移并且拉伸 */
  50%{transform:translateY(-20px) scale(0.97,1.03);}
  100%{transform:translateY(0) scale(1,1);}
}

.video{
  width: calc(100% - 80px);
  height: calc(100% - 90px);
  position: absolute;
  left: 45px;
  top: 40px;
}
</style>
