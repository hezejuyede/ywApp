<template>
  <header id="header" class="ga-header">
    <div class="header-top">
      <div class="header-top-left fl">四川广安发电有限责任公司</div>
      <div class="header-top-right fr">
        <i class="iconfont icon-saoyisao"></i>
      </div>
    </div>
    <div class="header-center">
      <div class="header-center-weather">
        <div class="weather-temperature">
          <span>{{minTemperature}}～{{maxTemperature}}</span>
        </div>
        <div class="weather-state">
          {{weather}}
        </div>
      </div>
      <div class="header-center-data">
        <p class="header-center-data-top">全厂负荷</p>
        <p class="header-center-data-center">{{rate}}</p>
        <p class="header-center-data-bottom">MW</p>
      </div>
      <div class="header-center-data">
        <p class="header-center-data-top">全厂负荷率</p>
        <p class="header-center-data-center">{{loadRate}}</p>
        <p class="header-center-data-bottom" style="rgba(1,1,1,1)">%</p>
      </div>
      <div class="header-center-data">
        <p class="header-center-data-top">全厂电量</p>
        <p class="header-center-data-center">{{electricQuantity}}</p>
        <p class="header-center-data-bottom">万千瓦时</p>
      </div>
    </div>
    <div class="header-bottom">
      <div class="header-bottom-data fl" v-for="(item,index) in headerArr" ref="headerDiv">
        <p class="header-bottom-data-top"><span>{{item.number}}</span><span>{{item.load}}</span></p>
        <p class="header-bottom-data-center">{{item.name}}</p>
      </div>
    </div>
  </header>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import URL  from '../../assets/js/URL'

  export default {

  name: 'yw-header',
  data() {
    return {
      minTemperature:"",
      maxTemperature:"",
      weather:"",
      rate:"",
      loadRate:"",
      electricQuantity:"",
      headerArr:[]

    }
  },
  components: {},
  mounted() {
  },
    created() {
      this.getAdminState();
    },
  methods: {
    //页面加载检查用户是否登陆，没有登陆就加载登陆页面
    getAdminState() {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo === null) {

      }
      else {
        this.getWeatherForecasts();
        this.getPlantWideLoad();
        this.getPlantWideLoadRate();
        this.getPlantWideElectricQuantity();
        this.getPlantWideCrewRate();




      }
    },
    
    //获取天气预报的接口
    getWeatherForecasts(){
      axios.get('https://www.tianqiapi.com/api/?version=v1&cityid=101270801')
        .then((res) => {
          if(res.data.data.length>0){
            this.minTemperature = res.data.data[0].tem2;
            this.maxTemperature = res.data.data[0].tem1;
            this.weather = res.data.data[0].wea;


          }
          else {
            this.$message.warning( "暂无天气预报的数据");
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },

    //获取全厂负荷
    getPlantWideLoad(){
      axios.post(" "+ URL +"/app/getPlantWideLoad")
        .then((res) => {
          if(res.data.state==="1"){
            if(JSON.stringify(res.data.data) !== "{}"){
              this.rate=res.data.data.data;



            }
            else {
              this.$message.warning( "暂无数据");
            }
          }
          else {
            this.$message.warning(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },

    //获取全厂负荷率
    getPlantWideLoadRate(){
      axios.post(" "+ URL +"/app/getPlantWideLoadRate")
        .then((res) => {
          if(res.data.state==="1"){
            if(JSON.stringify(res.data.data) !== "{}"){
              this.loadRate=res.data.data.data;


            }
            else {
              this.$message.warning( "暂无数据");
            }
          }
          else {
            this.$message.warning(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },

    //获取全厂电量
    getPlantWideElectricQuantity(){
      axios.post(" "+ URL +"/app/getPlantWideElectricQuantity")
        .then((res) => {
          if(res.data.state==="1"){
            if(JSON.stringify(res.data.data) !== "{}"){
              this.electricQuantity=res.data.data.data;

            }
            else {
              this.$message.warning( "暂无数据");
            }
          }
          else {
            this.$message.warning(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },

    //获取全厂机组功率
    getPlantWideCrewRate(){
      axios.post(" "+ URL +"/app/getPlantWideCrewRate")
        .then((res) => {
          if(res.data.state==="1"){
            if(res.data.data.length>0){
              this.headerArr=res.data.data;
            }
            else {
              this.$message.warning( "暂无数据");
            }
          }
          else {
            this.$message.warning(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },




  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .ga-header {
    height: 160px;
    background: url("../../assets/img/bg.jpg") no-repeat center center;
    background-size: 100%;
    .header-top {
      color: @color-white;
      height: 30px;
      line-height: 30px;
      .header-top-left{
        margin-left: 5%;

      }
      .header-top-right{
        margin-right: 5%;

      }
    }
    .header-center{
      width: 100%;
      height:65px;
      display: flex;
      color: @color-white;
      .header-center-weather{
        flex: 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .weather-temperature{
          font-size: @font-size-large;
          margin-bottom: 5px;
        }
        .weather-state{
          font-size: @font-size-small;
        }
      }
      .header-center-data{
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .header-center-data-top{
          font-size: @font-size-small-s;
          margin-bottom: 5px;
          color: @color-F0;
        }
        .header-center-data-center{
          font-size: @font-size-large;
          margin-bottom: 5px;
        }
        .header-center-data-bottom{
          font-size: @font-size-small-sss;
          text-align: right;
          color: @color-F0;
        }
      }
    }
    .header-bottom {
      width: 100%;
      height: 65px;
      display: flex;
      .header-bottom-data{
        flex: 1;
        color: @color-white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .header-bottom-data-top {
          span:first-child {
            font-size: @font-size-medium;

          }
          span:last-child {
           font-size: @font-size-small;
            margin-left: 5%;
          }
        }
        .header-bottom-data-center{
          margin-top: 5px;
          font-size: @font-size-small;
        }
      }
    }
  }
</style>
