<template>
  <div class="index">
    <header-view></header-view>
    <main>
      <div class="AdministrationDiv">
        <div class="AdministrationDiv-left">
          <div class="Administration-icon">
            <i class="iconfont icon-imm"></i>
          </div>
          <div class="Administration-txt" @click="goToLoadManagement">
            <span>负荷管理</span>
          </div>
        </div>
        <div class="AdministrationDiv-right">
          <div class="Administration-icon">
            <i class="iconfont icon-dianchibattery141"></i>
          </div>
          <div class="Administration-txt" @click="goToElectricityManagement">
            <span>电量管理</span>
          </div>
        </div>
      </div>
      <div id="banner" ref="banner" >
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in bannerImg" :key="item.id">
            <img :src="item.img"
                 style="width: 100%"
                 @click="showBanner(index,item.id,item.sindex)">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>
      <div class="indexBottom" ref="indexBottom">
        <div class="IndexNavDiv clearfix">
          <div class="IndexNavTemplate fl" v-for="(item,index) in indexNav" :key="item.id"
               @click="goToNavBar(item.url)">
            <div class="IndexNavTemplate-icon">
              <i :class="item.icon"></i>
            </div>
            <div class="IndexNavTemplate-txt">
              <span>{{ item.text}}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer-view></footer-view>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import HeaderView from '../../common/header/header';
  import FooterView from '../../common/footer/footer';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import Loading from '../../common/loading/loading';
  import axios from 'axios'
  import URL  from '../../assets/js/URL'

  require('swiper/dist/css/swiper.css');

  export default {
    name: 'index',
    data() {
      return {
        img: '',
        height:Number,
        indexNav: [
          {"icon": "iconfont icon-pulse", "text": "负荷预测","url":"loadForecasting"},
          {"icon": "iconfont icon-xiaoliangyuce", "text": "调度计划","url":"schedulingPlan"},
          {"icon": "iconfont icon-caozuorizhi", "text": "值长日志","url":"dutyLog"},
          {"icon": "iconfont icon-shujuqushi", "text": "生产早会" ,"url":"EarlyMeeting"},
          {"icon": "iconfont icon-yanjing", "text": "经济指标","url":"EnvironmentalProtection"},
          {"icon": "iconfont icon-huanbao", "text": "环保指标","url":"EconomicIndicatorsIndex"},
          {"icon": "iconfont icon-peizhiguanli", "text": "机组启停","url":"unitStartStop"},
          {"icon": "iconfont icon-xunjianrenyuan", "text": "现场巡查","url":"Patrol"},
          {"icon": "iconfont icon-kaiji", "text": "设备信息"},
          {"icon": "iconfont icon-yijianqidong", "text": "开机方式","url":"OpeningMode"},
          {"icon": "iconfont icon-xunchatongji", "text": "巡查统计"},
          {"icon": "iconfont icon-Energy-", "text": "煤炭数据","url":"TwoRules"}
        ],
        bannerImg: [{"img": require("../../assets/img/banner1.jpg")}, {"img": require("../../assets/img/banner2.jpg")}],
        swiperOption: {
          direction: "horizontal",
          loop: true,
          pagination: ".swiper-pagination",
          prevButton: ".swiper-button-prev",
          nextButton: ".swiper-button-next",
          autoplay: 3000,
          autoplayDisableOnInteraction: false,
        },

      }
    },
    components: {HeaderView, FooterView, swiper, swiperSlide, Loading},
    mounted() {
      setTimeout(() => {
        this.setTableHeight();
      }, 1000);
    },
    created() {
      this.getAdminState();
      setTimeout(() => {
        this.getLoading();
      }, 1000);
    },
    methods: {
      //根据屏幕设置Table高度
      setTableHeight() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          let div = this.$refs.indexBottom;
          let banner = this.$refs.banner.offsetHeight;
          let height = banner+280;
          div.style.height = H - height + "px";
        }
        else {
          var h = document.body.clientHeight;
          let div = this.$refs.indexBottom;
          let banner = this.$refs.banner.offsetHeight;
          let height = banner+280;
          div.style.height = h - height + "px";
        }

      },


      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("loginMessage");
        if (userInfo === null) {
          this.$router.push("/UserLogin")
        }
        else {



        }
      },

      //图片旋转
      getLoading() {
        this.img = ["1"]
      },

      //前往负荷管理
      goToElectricityManagement(){
        this.$router.push("/ElectricityManagement")
      },
      //前往电量管理
      goToLoadManagement(){
        this.$router.push("/LoadManagement")
      },
      //底部导航前往
      goToNavBar(url){
        this.$router.push("/"+ url +"")
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .index {
    position: absolute;
    max-width: 640px;
    width: 100%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .AdministrationDiv {
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      .AdministrationDiv-left {
        width: 48%;
        height: 60px;
        margin-right: 0.5%;
        border-radius: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(50, 191, 209, 1);
        color: @color-F0;
      }
      .AdministrationDiv-right {
        width: 48%;
        height: 60px;
        margin-left: 0.5%;
        border-radius: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(42, 143, 245, 1);
        color: @color-F0;
      }
      .Administration-icon {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-imm {
          font-size: 200%;
        }
        .icon-dianchibattery141 {
          font-size: 200%;
          color: @color-white;
        }
      }
      .Administration-txt {
        flex: 3;
      }
    }
    .IndexNavDiv{
      margin-bottom: 20px;
      .IndexNavTemplate {
        width: 25%;
        height: 80px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid @color-F0;
        border-left: 1px solid @color-F0;
        font-size: @font-size-small;
        .IndexNavTemplate-icon {
          .icon-pulse {
            color: #F56C6C;
            font-size: 200%;
          }
          .icon-xiaoliangyuce {
            color: rgba(50, 191, 209, 1);
            font-size: 200%;
          }
          .icon-caozuorizhi {
            color: #E6A23C;
            font-size: 200%;
          }
          .icon-message-channel {
            color: deeppink;
            font-size: 200%;
          }
          .icon-shujuqushi {
            color: rgba(66, 166, 249, 1);
            font-size: 200%;
          }
          .icon-icon-test {
            color: @color-red;
            font-size: 200%;
          }
          .icon-wenti {
            color: #909399;
            font-size: 200%;
          }
          .icon-yanjing {
            color: @color-green;
            font-size: 200%;
          }
          .icon-huanbao {
            color: #F56C6C;
            font-size: 200%;
          }
          .icon-xunjianrenyuan {
            color: rgba(50, 191, 209, 1);
            font-size: 200%;
          }
          .icon-iconset0137 {
            color: #E6A23C;
            font-size: 200%;
          }
          .icon-yijianqidong {
            color: deeppink;
            font-size: 200%;
          }
          .icon-Energy- {
            color: @color-red;
            font-size: 200%;
          }
          .icon-peizhiguanli {
            color: @color-red;
            font-size: 200%;
          }
          .icon-xunchatongji {
            color: @color-bg-lv;
            font-size: 200%;
          }
          .icon-dianlixingye {
            color: @color-green;
            font-size: 200%;
          }
          .icon-kaiji{
            color: @color-bg-cs;
            font-size: 200%;
          }
        }
        .IndexNavTemplate-txt {
          margin-top: 5px;
        }
      }
    }
    .indexBottom{
      overflow: auto;

    }
  }

  .loading-container {
    position: absolute;
    max-width: 640px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }


</style>
