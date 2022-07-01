
<template>
  <div
    :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']"
    v-if="centerDialogVisible"
  >
    <div class="maskmodule" @click.self="closemodule">
      <div class="modulemain" :style="{ width: dialogWidth }">
        <img src="@/assets/img/lihua.png" alt="" class="lihua" />
        <div class="top">
          <img src="@/assets/img/checktop.png" alt="" class="topp" />
          <img src="@/assets/img/close.png" alt="" class="closemodule"  @click="closemodule"/>
        </div>
        <span class="tips">You got a</span>
        <div class="imgs">
          <img src="@/assets/img/checkbj.png" alt="" class="checkbj" />
          <!-- <img src="@/assets/img/xunzhaung1.png" alt="" class="xz" /> -->
          <img :src="activeImgSrc" alt="" class="xz" />
          <div class="name">{{activeName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
      
       
<script>

import level1 from '@/assets/img/xunzhaung1.png'
import level2 from '@/assets/img/xunzhaung2.png'
import level3 from '@/assets/img/xunzhaung3.png'
import level4 from '@/assets/img/xunzhaung4.png'
import level5 from '@/assets/img/xunzhaung5.png'
import level6 from '@/assets/img/xunzhaung6.png'

export default {
  props: {
    showcheck: {
      type: Boolean,
      default: false,
    },
    level:[String , Number]
  },
  data() {
    return {
      screenWidth: this.GLOBAL.clientWidth,
      dialogWidth: 0,
      centerDialogVisible: this.showcheck,
      level1,
      level2,
      level3,
      level4,
      level5,
      level6,
      nameList:['Power Badge' ,'Magic Badge','Spirit Badge','Time Badge','Mind Badge','Soul Badge']
    };
  },
  mounted() {
    this.setDialogWidth();
  },
  computed:{
    activeImgSrc(){
      let level = Number(this.level)
      if(isNaN(level) || level > 6 || level < 1) level = 1
      let src = 'level'+level
      return this[src]
    },
    activeName(){
      let level = Number(this.level)
      if(isNaN(level) || level > 6 || level < 1) level = 1
      let index = level - 1
      return this.nameList[index]
    }
  },
  methods: {
    setDialogWidth() {
      if (this.screenWidth < 600) {
        this.dialogWidth = "80%";
      } else {
        this.dialogWidth = 400 + "px";
      }
    },
    // 点击弹框下的关闭
    closemodule(v) {
      this.$emit("getCancelclose", v);
    },
  },
};
</script>
<style scoped  lang="less" >
.pcmain {
  
  .maskmodule {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2001;
    .lihua {
      width: 130%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .modulemain {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(38, 53, 44, 1);
      border-radius: 10px;
      .top {
        .topp {
          width: 109%;
          position: absolute;
          top: -43px;
          left: -5%;
        }
        .closemodule {
          width: 25px;
          position: absolute;
          top: 24px;
          right: 5%;
          z-index: 999;
        }
      }
      .tips {
        position: absolute;
        top: 23%;
        left: 50%;
        transform: translate(-50%, -50%);
        /* width: 60%; */
        text-align: center;
        font-size: .24rem;
      }
      .imgs {
        position: relative;
        width: 100%;
        height: 360px;
        .checkbj {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          animation: infinityRoll 6s linear infinite;
        }
        .xz {
          position: absolute;
          top: 50%;
          width: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .name {
        position: absolute;
        bottom: 10%;
        width: 50%;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 18px;
        text-align: center;
      }
    }
  }
}
.main {
  .maskmodule .modulemain .imgs {
    height: 300px;
  }
  .maskmodule .modulemain .top .topp {
    width: 109%;
    position: absolute;
    top: -27px;
    left: -5%;
  }
  .maskmodule .modulemain .top .close {
    width: 25px;
    position: absolute;
    top: 18px;
    right: 5%;
  }
}
@keyframes infinityRoll {
  0%{
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100%{
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}
</style>