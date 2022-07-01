
<template>
  <div
    :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']"
    v-if="centerDialogVisible"
  >
     <div class="maskmodule">
      <div class="cainter" :style="{ width: dialogWidth }">
        <img src="@/assets/img/close.png" alt="" class="close" @click="closemodule" />
        <img src="@/assets/img/bigImg.jpg" alt="" class="bigImg" />
      </div>
     </div>
  </div>
</template>
      
       
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      screenWidth: this.GLOBAL.clientWidth,
      dialogWidth: 0,
      centerDialogVisible: this.show,
    };
  },
  mounted() {
    this.setDialogWidth();
  },
  methods: {
    setDialogWidth() {
      if (this.screenWidth < 600) {
        this.dialogWidth = "80%";
      } else {
        // this.dialogWidth = 400 + "px";
        this.dialogWidth  = "80%"
      }
    },
    // 点击弹框下的关闭
    closemodule(v) {
      console.log("3")
      this.$emit("getCancel", v);
    },
  },
};
</script>
<style scoped  lang="less" >
.pcmain {
  .maskmodule {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    .cainter{
          height: 60%;
       position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); 
      .bigImg{
        width: 100%;
        position: absolute;
      }
      .close{
        width: 25px;
          position: absolute;
          top: -40px;
          right: 0
      }
    }
  }
}

</style>