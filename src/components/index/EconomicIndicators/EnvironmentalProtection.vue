<template>
  <div class="EnvironmentalProtection">
    <back></back>
    <div class="">
      <el-table
        :data="environmentalData"
        :height="this.tableHeight"
        style="width: 100%">
        <el-table-column
          fixed
          prop="zhibiao"
          align="center"
          width="100"
          label="指标">
        </el-table-column>
        <el-table-column
          prop="yihaoji"
          align="center"
          label="#1">
        </el-table-column>
        <el-table-column
          prop="erhaoji"
          align="center"
          label="#2">
        </el-table-column>
        <el-table-column
          prop="sanhaoji"
          align="center"
          label="#3">
        </el-table-column>
        <el-table-column
          prop="sihaoji"
          align="center"
          label="#4">
        </el-table-column>
        <el-table-column
          prop="wuhaoji"
          align="center"
          label="#5">
        </el-table-column>
        <el-table-column
          prop="liuhaoji"
          align="center"
          label="#6">
        </el-table-column>
      </el-table>
    </div>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Back from '../../../common/back/back'
  import Loading from '../../../common/loading/loading';
  import axios from 'axios'
  import URL  from '../../../assets/js/URL'

  export default {
    name: 'EconomicIndicators',
    data() {
      return {
        img: '',
        tableHeight:Number,
        environmentalData:[]
      }
    },
    components: {Loading, Back},
    mounted() {

    },
    created() {
      setTimeout(() => {
        this.getLoading();
      }, 1000);
      this.getAdminState();
    },
    methods: {
      getLoading() {
        this.img = ["1"]
      },
      //根据屏幕设置Table高度
      setTableHeight() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          this.tableHeight = H - 30 + "px";
        }
        else {
          var h = document.body.clientHeight;
          this.tableHeight = h - 30 + "px";
        }

      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo === null) {

        }
        else {
          this.setTableHeight();
        }
      },


      //请求经济指标的数据
      getEconomicIndicators(){

      },

      goToDailyHourlyMean(){
        this.$router.push("/DailyHourlyMean")
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../../assets/less/base";

  .EnvironmentalProtection {
    position: absolute;
    max-width: 640px;
    width: 100%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: @color-F0;
    .EnvironmentalProtection-navBar {
      height: 50px;
      background-color: @color-white;
      margin-bottom: 5px;
      display: flex;
      .navBar-div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }
    }
    .EnvironmentalProtection-line{
      height:250px;
      background-color: @color-white;
    }
     .EnvironmentalProtection-list{
       background-color: @color-white;
       margin-top: 5px;
       .list-title{
         width: 90%;
         margin: 0 auto;
         display: flex;
         height: 35px;
         border-bottom: 1px solid @color-background-d;
         div:first-child{
           flex: 1;
           display: flex;
           align-items: center;
           justify-content: center;
         }
         div:last-child{
           flex: 1;
           display: flex;
           align-items: center;
           justify-content:center;
           color: #8cc5ff;
           cursor: pointer;
         }
       }

     }
    .navColor {
      color: #3a8ee6;
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
