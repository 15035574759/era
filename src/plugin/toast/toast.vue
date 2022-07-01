<template>
  <!-- 全局提示框 -->
  <transition name="slide-fade">
    <div :class="['pcmain',this.screenWidth >= 600 ?'':'main']">
      <div v-if="visible" :class="['dialog-tips',type=='success'?'':'error']">
        <div>{{message}}</div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      message: "",
      type: "success",
      screenWidth: document.body.clientWidth,
    };
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
  }

};
</script>
<style scoped lang="less">
.pcmain {
  .dialog-tips {
    min-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(44, 134, 80, 0.9);
    overflow: hidden;
    padding: 0 10px;
    line-height: 82px;
    // display: flex;
    text-align: center;
    align-items: center;
    color: #fff;
    z-index: 999;
    div {
      text-align: center;
    }
  }
  .error {
    background: rgba(233, 70, 42, 0.9);
    color: fff;
    div {
      text-align: center;
    }
  }
}
.main {
  .dialog-tips {
    min-width: 50%;
     max-width: 80%;
   padding: 20px 0;
    line-height: 20px;

  }
}
.slide-fade-enter,
.slide-fade-leave-to {
  margin-top: -30px;
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-to,
.slide-fade-leave {
  margin-top: 0px;
  opacity: 1;
}
</style>