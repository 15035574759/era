<template>
  <div class="mask">
    <el-dialog :show-close="false" :visible.sync="centerDialogVisible" :width="dialogWidth" center>
      <div :class="['pcmain',this.screenWidth >= 600 ?'':'main']">
        <div class="headerTop">
          升级算力
          <img src="../../assets/img/close.png" alt class="close" @click="closemodule" />
        </div>
        <div class="Box">
          <div class="money">
            <swiper :options="swiperOption" @click-slide="clkItem">
              <swiper-slide class="swiper-slide" v-for="(item,index) in carouselArr" :key="index">
                <div :class="['item',actives==index?'activeItem':'']">
                  <div class="imgItem">
                    <span>算力1</span>
                    <img src="@/assets/img/arrowIcon.png" class="xz" alt />
                  </div>
                </div>
              </swiper-slide>
            </swiper>
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
          </div>

          <div class="tip">預計增加算力</div>
          <div class="coutes">
            <span>100</span>
          </div>
          <div class="time">需要鎖倉（ERA)≈ $ 416</div>
          <div class="list">
            <div class="item">
              <div>購買 $ ERA</div>
              <span class="name">於額：0.0000 ERA</span>
            </div>
          </div>
        </div>
        <img src="../../assets/img/arrowUp.png" alt class="submit" />
        <div class="zhu">注：未滿足鎖倉7天提前取消算力，将扣除鎖倉金額的10%，进入總矿池</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showarrowUp: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      centerDialogVisible: this.showarrowUp,
      dialogWidth: "0",
      screenWidth: this.GLOBAL.clientWidth,
      bjIMg: require("@/assets/img/shuxbj1.png"),
      carouselArr: ["1", "1", "1", "1", "1", "1"],
      actives: 1,
      swiperOption: {},

      swiperOption1: {
        //显示分页
        pagination: {
          el: ".swiper-pagination"
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        observer: true,
        slidesPerView: 4,
        //开启循环模式
        loop: true
      },
      swiperOption600: {
        //显示分页
        pagination: {
          el: ".swiper-pagination"
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        observer: true,
        slidesPerView: 2,
        //开启循环模式
        loop: true
      }
    };
  },
  watch: {
    showarrowUp(val) {
      this.centerDialogVisible = val;
    }
  },
  created() {},
  mounted() {
    this.setDialogWidth();
    // this.swiper.on('click',function(){
    //   const index = this.clickedIndex
    //   console.log(index)
    // })
  },
  methods: {
    setDialogWidth() {
      if (this.screenWidth < 600) {
        this.dialogWidth = "90%";
        this.bjIMg = require("@/assets/img/shuxbj.png");
        this.swiperOption = this.swiperOption600;
      } else {
        this.dialogWidth = 600 + "px";
        this.bjIMg = require("@/assets/img/shuxbj1.png");
        this.swiperOption = this.swiperOption1;
      }
    },
    // 点击弹框下的关闭
    closemodule(v) {
      this.$emit("getCancel", v);
    },
    getConfirmUp(v) {
      this.$emit("getConfirmUp", v);
    },
    //选择提升
    clkItem(index, realIndex) {
      console.log(
        "index = " + index + "; realIndex = " + realIndex
      );
      this.actives = realIndex
    }
  }
};
</script>
<style scoped lang="less">
.pcmain {
  color: #fff;

  .headerTop {
    text-align: center;
    position: relative;
    color: #fff;
  }

  .Box {
    .money {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      margin: 32px 0;
      text-align: center;
      padding: 0 50px;
      .item {
        background: #1d2922;
        border-radius: 8px;
        margin: 0 10px;
        padding: 10px;
      }
      .activeItem {
        background: rgba(51, 87, 65, 1);
      }
      .swiperLeft {
        width: 20px;
        height: 20px;
      }
      .swiperRight {
        width: 20px;
        height: 20px;
      }
      img {
        width: 60%;
      }
      p {
        color: rgba(112, 244, 165, 1);
        font-size: 30px;
        margin: 0;
      }
    }
    .tip {
      text-align: center;
    }
    .coutes {
      text-align: center;
      margin: 10px 0;
    }
    .coutes span {
      background: rgba(102, 230, 129, 0.33);
      padding: 10px 20px;
      text-align: center;
      display: inline-block;
      margin: 0 auto;
      border-radius: 20px;
    }
    .time {
      text-align: center;
      margin-top: 10px;
      span {
        color: rgba(112, 244, 165, 1);
      }
    }
    .list {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        span {
          color: rgba(112, 244, 165, 1);
        }
      }
    }
  }
  .submit {
    display: block;
    margin: 0 auto;
    width: 60%;
  }
  .zhu {
    text-align: center;
  }
}
.main {
  .headerTop {
    text-align: center;
    position: relative;
    color: #fff;
    padding: 10px;
  }
}
.close {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
</style>