<template>
  <div class="ElectricityManagement">
    <back></back>
    <div class="ElectricityManagement-center" ref="ElectricityManagementCenter">
      <div class="ElectricityManagement-center-div1">
        <div class="reportDiv" @click="showFillInPage(dayData[0].id)">
          <i class="iconfont icon-pencil"></i>
        </div>
        <div class="center-div-title">
           日电量
        </div>
        <div class="center-div-top">
          <div class="center-div-top-left"><span>{{dayData[0].yield}}</span><span>万千瓦时</span></div>
          <div class="center-div-top-right">
            <div class="center-div-top-right-text"><span>日环比</span><span>{{dayData[0].proportion}}</span></div>
            <div class="center-div-top-right-icon" @click="showLinePage(dayData[0].id)"><i class="iconfont icon-you"></i></div>
          </div>
        </div>
        <div class="center-div-bottom">
          <div class="center-div-bottom-list" v-for="(item,index) in dayData[0].data" >
            <span>{{item.text}}</span>
            <span>{{item.data}}</span>
            <span>{{item.measurement}}</span>
          </div>
        </div>
      </div>
      <div class="ElectricityManagement-center-div2">
        <div class="reportDiv" @click="showFillInPage(monthData[0].id)">
          <i class="iconfont icon-pencil"></i>
        </div>
        <div class="center-div-title">
          月电量
        </div>
        <div class="center-div-top">
          <div class="center-div-top-left"><span>{{monthData[0].yield}}</span><span>万千瓦时</span></div>
          <div class="center-div-top-right">
            <div class="center-div-top-right-text"><span>月环比</span><span>{{monthData[0].proportion}}</span></div>
            <div class="center-div-top-right-icon" @click="showLinePage(monthData[0].id)" ><i class="iconfont icon-you"></i></div>
          </div>
        </div>
        <div class="center-div-bottom">
          <div class="center-div-bottom-list" v-for="(item,index) in monthData[0].data" >
            <span>{{item.text}}</span>
            <span>{{item.data}}</span>
            <span>{{item.measurement}}</span>
          </div>
        </div>
      </div>
      <div class="ElectricityManagement-center-div3">
        <div class="reportDiv" @click="showFillInPage(yearData[0].id)">
          <i class="iconfont icon-pencil"></i>
        </div>
        <div class="center-div-title">
          年电量
        </div>
        <div class="center-div-top">
          <div class="center-div-top-left"><span>{{yearData[0].yield}}</span><span>亿千瓦时</span></div>
          <div class="center-div-top-right">
            <div class="center-div-top-right-text"><span>同比</span><span>{{yearData[0].proportion}}</span></div>
            <div class="center-div-top-right-icon" @click="showLinePage(yearData[0].id)"><i class="iconfont icon-you"></i></div>
          </div>
        </div>
        <div class="center-div-bottom">
          <div class="center-div-bottom-list" v-for="(item,index) in yearData[0].data" >
            <span>{{item.text}}</span>
            <span>{{item.data}}</span>
            <span>{{item.measurement}}</span>
          </div>
        </div>
      </div>
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
    name: 'ElectricityManagement',

    data() {
      return {
        dateValue: '',
        num:0,
        img: '',
        dayData:[],
        monthData:[],
        yearData:[]
      }
    },
    components: {Loading, Back},

    mounted() {
      setTimeout(() => {
        this.setTableHeight();
      }, 1000);

      setInterval(() => {
        this.getDayMonthYearData();
      }, 1000 * 60);
    },

    created() {
      this.getAdminState();

      setTimeout(() => {
        this.getLoading();
      }, 1000);
    },
    methods: {
      //加载选择图片
      getLoading() {
        this.img = ["1"]
      },
      //根据屏幕设置DIV高度
      setTableHeight() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          let div = this.$refs.ElectricityManagementCenter;
          div.style.height = H - 40+ "px";
        }
        else {
          let div = this.$refs.ElectricityManagementCenter;
          div.style.height = H - 40 + "px";
        }

      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("loginMessage");
        if (userInfo === null) {
          this.$router.push("/UserLogin")
        }
        else {
          this.getDayMonthYearData();

        }
      },


      //获得首页年月日的的数据
      getDayMonthYearData(){
        axios.post(" "+ URL +"/app/getDayMonthYearData")
          .then((res) => {
            if(res.data.state==="1"){
              if (res.data.data.length > 0) {
                this.dayData = res.data.data[0];
                this.monthData = res.data.data[1];
                this.yearData = res.data.data[2];
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

      //根据ID显示去哪个页面
      showFillInPage(id) {
        if (id === "1") {
          this.$router.push("/fillInDay")
        }
        else if (id === "2") {
          this.$router.push("/fillInMonth")
        }
        else if (id === "3") {
          this.$router.push("/fillInYear")
        }
      },

      //根据ID显示去哪个页面
      showLinePage(id) {
        if (id === "1") {
          this.$router.push("/dailyElectricity")
        }
        else if (id === "2") {
          this.$router.push("/monthlyElectricity")
        }
        else if (id === "3") {
          this.$router.push("/annualElectricity")
        }
      }


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../../assets/less/base";

  .ElectricityManagement {
    position: absolute;
    max-width: 640px;
    width: 100%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: @color-F0;
    .ElectricityManagement-center{
      margin-top: 10px;
      .ElectricityManagement-center-div1 {
        height:30%;
        background-color: @color-white;
        position: relative;
        overflow:hidden;
        margin-bottom: 3%;;
        .center-div-title {
          position: absolute;
          left: -20px;
          top: 8px;
          width: 80px;
          height: 20px;
          background-color: #3a8ee6;
          z-index: 99;
          color: rgba(255,255,255,0.9);
          line-height: 20px;
          text-align: center;
          font-size: @font-size-small;
          transform:rotate(-40deg);
        }
        .center-div-top {
          width: 90%;
          height: 45%;
          margin: 0 auto;
          border-bottom: 1px solid @color-F0;
          display: flex;
          align-items: center;
          .center-div-top-left{
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            span:first-child{
              color: #3a8ee6;
              font-size: @font-size-large-xxxxx;
              margin-right: 5px;
            }
            span:last-child{
              font-size: @font-size-small-ss;
              color: @color-background-dddd;
            }
          }
          .center-div-top-right{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .center-div-top-right-text{
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              flex: 2;
              span:first-child{
                color: @color-background-dd;
                font-size: @font-size-small;
                margin-bottom: 5px;
              }
              span:last-child{
                color: #3a8ee6;

              }
            }
            .center-div-top-right-icon{
              flex: 1;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              color: @color-background-d;

            }

          }

        }
        .center-div-bottom{
          width: 80%;
          height:55%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin: 0 auto;
          .center-div-bottom-list{
            height: 30%;
            margin-bottom: 3px;
            width: 100%;
            display: flex;
            align-items: center;
            span:first-child{
              flex: 1;
              color: @color-background-dddd;
              font-size: @font-size-small-s;
            }
            span:nth-child(2){
              flex: 1;
              color: #3a8ee6;
              font-size: @font-size-large;
              display: flex;

            }
            span:last-child{
              flex: 1;
              color: @color-background-dddd;
              font-size: @font-size-small;
              display: flex;
            }


          }



        }
        .reportDiv{
          position: absolute;
          right: 5px;
          top: 5px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-pencil{
            font-size:120%;
          }

        }
      }
      .ElectricityManagement-center-div2 {
        height:32%;
        background-color: @color-white;
        position: relative;
        overflow:hidden;
        margin-bottom: 3%;
        .center-div-title {
          position: absolute;
          left: -20px;
          top: 8px;
          width: 80px;
          height: 20px;
          background-color: #32BFD1;
          z-index: 99;
          color: rgba(255,255,255,0.9);
          line-height: 20px;
          text-align: center;
          font-size: @font-size-small;
          transform:rotate(-40deg);
        }
        .center-div-top {
          width: 90%;
          height: 40%;
          margin: 0 auto;
          border-bottom: 1px solid @color-F0;
          display: flex;
          align-items: center;
          .center-div-top-left{
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            span:first-child{
              color: #32BFD1;
              font-size: @font-size-large-xxxxx;
              margin-right: 5px;
            }
            span:last-child{
              font-size: @font-size-small-ss;
              color: @color-background-dddd;
            }
          }
          .center-div-top-right{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .center-div-top-right-text{
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              flex: 2;
              span:first-child{
                color: @color-background-dd;
                font-size: @font-size-small;
                margin-bottom: 5px;
              }
              span:last-child{
                color: #32BFD1;

              }
            }
            .center-div-top-right-icon{
              flex: 1;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              color: @color-background-d;

            }

          }

        }
        .center-div-bottom{
          width: 80%;
          height:60%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin: 0 auto;
          .center-div-bottom-list{
            height: 30%;
            margin-bottom: 3px;
            width: 100%;
            display: flex;
            align-items: center;
            span:first-child{
              flex: 1;
              color: @color-background-dddd;
              font-size: @font-size-small-s;
            }
            span:nth-child(2){
              flex: 1;
              color: #32BFD1;
              font-size: @font-size-large;
              display: flex;

            }
            span:last-child{
              flex: 1;
              color: @color-background-dddd;
              font-size: @font-size-small;
              display: flex;
            }


          }



        }
        .reportDiv{
          position: absolute;
          right: 5px;
          top: 5px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-pencil{
            font-size:120%;
          }

        }
      }
      .ElectricityManagement-center-div3 {
        height:33%;
        background-color: @color-white;
        position: relative;
        overflow:hidden;
        .center-div-title {
          position: absolute;
          left: -20px;
          top: 8px;
          width: 80px;
          height: 20px;
          background-color:#8BC34A;
          z-index: 99;
          color: rgba(255,255,255,0.9);
          line-height: 20px;
          text-align: center;
          font-size: @font-size-small;
          transform:rotate(-40deg);
        }
        .center-div-top {
          width: 90%;
          height: 40%;
          margin: 0 auto;
          border-bottom: 1px solid @color-F0;
          display: flex;
          align-items: center;
          .center-div-top-left{
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            span:first-child{
              color: #8BC34A;
              font-size: @font-size-large-xxxxx;
              margin-right: 5px;
            }
            span:last-child{
              font-size: @font-size-small-ss;
              color: @color-background-dddd;
            }
          }
          .center-div-top-right{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .center-div-top-right-text{
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              flex: 2;
              span:first-child{
                color: @color-background-dd;
                font-size: @font-size-small;
                margin-bottom: 5px;
              }
              span:last-child{
                color: #8BC34A;

              }
            }
            .center-div-top-right-icon{
              flex: 1;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              color: @color-background-d;

            }

          }

        }
        .center-div-bottom{
          width: 80%;
          height:60%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin: 0 auto;
          .center-div-bottom-list{
            width: 100%;
            height: 30%;
            margin-bottom: 3px;
            display: flex;
            align-items: center;
            span:first-child{
              flex: 1;
              color: @color-background-dddd;
              font-size: @font-size-small-s;
            }
            span:nth-child(2){
              flex: 1;
              color: #8BC34A;
              font-size: @font-size-large;
              display: flex;

            }
            span:last-child{
              flex: 1;
              color: @color-background-dddd;
              font-size: @font-size-small;
              display: flex;
            }


          }



        }
        .reportDiv{
          position: absolute;
          right: 5px;
          top: 5px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-pencil{
            font-size:120%;
          }

        }
      }
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
