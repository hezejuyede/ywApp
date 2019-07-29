<template>
  <div class="ElectricityManagement">
    <back></back>
    <div class="ElectricityManagement-center" ref="ElectricityManagementCenter">
      <div class="ElectricityManagement-center-div1">
        <div class="center-div-title">
           日电量
        </div>
        <div class="center-div-top">
          <div class="center-div-top-left"><span>2442.22</span><span>万千瓦时</span></div>
          <div class="center-div-top-right">
            <div class="center-div-top-right-text"><span>日环比</span><span>-28.32%</span></div>
            <div class="center-div-top-right-icon"><i class="iconfont icon-you"></i></div>
          </div>
        </div>
        <div class="center-div-bottom">
          <div class="center-div-bottom-list"><span>日平均负荷</span><span>15747</span><span>mw</span></div>
          <div class="center-div-bottom-list"><span>昨日电量</span><span>35747.09</span><span>万千瓦时</span></div>
          <div class="center-div-bottom-list"><span>日利用小时数</span><span>12.09</span><span>小时</span></div>
        </div>
      </div>
      <div class="ElectricityManagement-center-div2">
        <div class="center-div-title">
          月电量
        </div>
        <div class="center-div-top">
          <div class="center-div-top-left"><span>2442.22</span><span>万千瓦时</span></div>
          <div class="center-div-top-right">
            <div class="center-div-top-right-text"><span>月环比</span><span>-28.32%</span></div>
            <div class="center-div-top-right-icon"><i class="iconfont icon-you"></i></div>
          </div>
        </div>
        <div class="center-div-bottom">
          <div class="center-div-bottom-list"><span>剩余日均电量</span><span>15747</span><span>mw</span></div>
          <div class="center-div-bottom-list"><span>本月计划电量</span><span>35747.09</span><span>万千瓦时</span></div>
          <div class="center-div-bottom-list"><span>本月计划完成率</span><span>12.09</span><span>小时</span></div>
          <div class="center-div-bottom-list"><span>月利用小时数</span><span>12.09</span><span>小时</span></div>
        </div>
      </div>
      <div class="ElectricityManagement-center-div3">
        <div class="center-div-title">
          年电量
        </div>
        <div class="center-div-top">
          <div class="center-div-top-left"><span>2442.22</span><span>万千瓦时</span></div>
          <div class="center-div-top-right">
            <div class="center-div-top-right-text"><span>日环比</span><span>-28.32%</span></div>
            <div class="center-div-top-right-icon"><i class="iconfont icon-you"></i></div>
          </div>
        </div>
        <div class="center-div-bottom">
          <div class="center-div-bottom-list"><span>剩余月均电量</span><span>15747</span><span>mw</span></div>
          <div class="center-div-bottom-list"><span>年度计划电量</span><span>35747.09</span><span>万千瓦时</span></div>
          <div class="center-div-bottom-list"><span>年度计划完成率</span><span>12.09</span><span>小时</span></div>
          <div class="center-div-bottom-list"><span>年度利用小时数</span><span>12.09</span><span>小时</span></div>
        </div>
      </div>
    </div>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Back from '../../common/back/back'
  import Loading from '../../common/loading/loading';


  export default {
    name: 'ElectricityManagement',
    data() {
      return {
        dateValue: '',
        num:0,
        img: '',
      }
    },
    components: {Loading, Back},
    mounted() {
      setTimeout(() => {
        this.setTableHeight();
      }, 1000);
    },
    created() {
      setTimeout(() => {
        this.getLoading();
      }, 1000);
    },
    methods: {
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
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

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
    }
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
