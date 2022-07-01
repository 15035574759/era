
<template>
  <div :class="['pcmain', this.screenWidth >= 600 ? '' : 'main']">
    <div
      class="cainter"
      :style="`background: url(${bannerbjIMg}) no-repeat center;background-size: cover;`"
    >
      <div class="top" v-if="this.screenWidth >= 600">
        Home > <span>Roadmap</span>
      </div>
      <div class="goback" v-if="this.screenWidth < 600" @click="goback">
        <img src="@/assets/img/gobackpage.png" alt="" />
      </div>
      <div class="title">
        <img src="@/assets/img/infotitle.png" alt="" />
      </div>
      <div class="table">
        <el-row>
          <el-col :xs="24" :md="6" :lg="6" :xl="6">
            <div class="item">
              <h6>{{ $t('homepage-stage') }} 1</h6>
              <li class="color">{{ $t('homepage-stage1-01') }}</li>
              <li class="color">{{ $t('homepage-stage1-02') }}</li>
              <li class="color">{{ $t('homepage-stage1-03') }}</li>
              <li class="color">{{ $t('homepage-stage1-04') }}</li>
              <li class="color">{{ $t('homepage-stage1-05') }}</li>
              <li class="color">{{ $t('homepage-stage1-06') }}</li>
              <li class="color">{{ $t('homepage-stage1-07') }}</li>
<!--              <li class="color">20 Page Litepaper Release</li>-->
              <li class="color">{{ $t('homepage-stage1-08') }}</li>
              <li>{{ $t('homepage-stage1-09') }}</li>
            </div>
          </el-col>
          <el-col :xs="24" :md="6" :lg="6" :xl="6">
            <div class="item">
              <h6>{{ $t('homepage-stage') }} 2</h6>
              <li>{{ $t('homepage-stage2-01') }}</li>
              <li>{{ $t('homepage-stage2-02') }}</li>
              <li>{{ $t('homepage-stage2-03') }}</li>
              <li>{{ $t('homepage-stage2-04') }}</li>
              <li>{{ $t('homepage-stage2-05') }}</li>
              <li>{{ $t('homepage-stage2-06') }}</li>
              <li>{{ $t('homepage-stage2-07') }}</li>
              <li>{{ $t('homepage-stage2-08') }}</li>
              <li>{{ $t('homepage-stage2-09') }}</li>
              <li>{{ $t('homepage-stage2-10') }}</li>
              <li>{{ $t('homepage-stage2-11') }}</li>
            </div>
          </el-col>
          <el-col :xs="24" :md="6" :lg="6" :xl="6">
            <div class="item">
              <h6>{{ $t('homepage-stage') }} 3</h6>
              <li>{{ $t('homepage-stage3-01') }}</li>
              <li>{{ $t('homepage-stage3-02') }}</li>
              <li>{{ $t('homepage-stage3-03') }}</li>
              <li>{{ $t('homepage-stage3-04') }}</li>
              <li>{{ $t('homepage-stage3-05') }}</li>
              <li>{{ $t('homepage-stage3-06') }}</li>
              <li>{{ $t('homepage-stage3-07') }}</li>
              <li>{{ $t('homepage-stage3-08') }}</li>
            </div>
          </el-col>
          <el-col :xs="24" :md="6" :lg="6" :xl="6">
            <div class="item">
              <h6>{{ $t('homepage-stage') }} 4</h6>
              <li>{{ $t('homepage-stage4-01') }}</li>
              <li>{{ $t('homepage-stage4-02') }}</li>
              <li>{{ $t('homepage-stage4-03') }}</li>
              <li>{{ $t('homepage-stage4-04') }}</li>
              <li>{{ $t('homepage-stage4-05') }}</li>
              <li>{{ $t('homepage-stage4-06') }}</li>
              <li>{{ $t('homepage-stage4-07') }}</li>
              <li>{{ $t('homepage-stage4-08') }}</li>
              <li>{{ $t('homepage-stage4-09') }}</li>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      screenWidth: this.GLOBAL.clientWidth,
      bannerbjIMg: "",
    };
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.setDialogWidth();
  },
  methods: {
    setDialogWidth() {
      if (this.screenWidth < 600) {
        this.bannerbjIMg = require("@/assets/img/infobj600.jpg");
      } else {
        this.bannerbjIMg = require("@/assets/img/infobj.jpg");
      }
    },
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped  lang="less" >
.pcmain {
  background: RGBA(28, 51, 33, 1);
  font-size: 12px;

  .cainter {
    padding: 0 10%;
    min-height: 100vh;
    .top {
      padding-top: 120px;
      font-size: 16px;
      span {
        color: rgba(112, 244, 165, 1);
      }
    }
    .title img {
      width: 500px;
      margin: 30px auto;
      display: block;
    }
    .table {
      background: #0a2320;
      border-radius: 16px;
      padding: 10px;
      .item {
        h6 {
          margin: 10px 0;
          font-size: 18px;
          font-weight: 900;
        }
        li {
          color: #dbc190;
          line-height: 20px;
          margin-bottom: 10px;
          font-size: 16px;
          list-style: none;
          position: relative;
          padding: 0 20px;
        }
        li:after {
          content: "•";
          color: #dbc190;
          position: absolute;
          left: 0;
          top: 0;
        }
        .color {
          color: #fff;
        }
      }
    }
  }
}
.main {
  .cainter {
    padding: 0;
  }
  .cainter .title {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .goback {
    padding: 90px 0 0 30px;
    img {
      width: 40px;
    }
  }
  .cainter .table {
    background: 0;
    .item {
      background: #0a2320;
      margin: 20px;
      padding: 20px 20px;
      border-radius: 10px;
    }
  }
}
</style>
