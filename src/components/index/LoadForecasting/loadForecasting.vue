<template>
  <div class="template">
    <div class="back">
      <div class="backLeft fl" @click="goBackPage">
        <i class="iconfont icon-left-trangle fl"></i>
        <span class="fl">返回</span>
      </div>
      <div class="backCenter fl">
        负荷预测
      </div>
      <div class="backRight fl">
        <i class="iconfont icon-ditu"></i>
        <span>广安</span>
      </div>
    </div>
    <div class="templateContent" ref="templateContent">
      <div class="templateContentTable">
        <div class="templateContentTableTop">
          <div class="templateContentTableTopDiv fl"
               v-for="(item,index) in indexData"
               :key="item.id"
               :class="{'navColor':index === num}"
               @click="showOtherLine(item.id,index)"
               ref="templateContentTableTopDiv">
            <div class="weatherDiv">
              <span style="font-size: 12px">{{item.day}}</span>
            </div>
            <div class="weatherDiv">
              <span style="font-size: 10px"> {{item.date}}</span>
            </div>
            <div class="weatherDiv">
              <span style="font-size: 12px;color: #00CCFF"> {{item.wea}}</span>
            </div>
            <div class="weatherDiv">
              <span style="font-size: 12px"> {{item.tem2}}-{{item.tem1}}</span>
            </div>
            <div class="dataDiv">
              <span style="font-size: 8px;margin-bottom: 5px;color: #EB7347">最大</span>
              <span style="font-size: 16px;margin-bottom: 5px">{{item.max}}</span>
              <span style="font-size: 8px">万千瓦</span>
            </div>
            <div class="dataDiv">
              <span style="font-size: 8px;margin-bottom: 5px;color: palevioletred">平均</span>
              <span style="font-size: 16px;margin-bottom: 5px">{{item.average}}</span>
              <span style="font-size: 8px">万千瓦</span>
            </div>
          </div>
        </div>
      </div>
      <div class="templateContentLine">
        <div id="dataBar" :style="{width: '100%', height: '100%'}"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Loading from '../../../common/loading/loading';
  import axios from 'axios'
  import URL from '../../../assets/js/URL'
  import prefix from '../../../assets/js/prefix'


  export default {
    name: 'templateDiv',
    data() {
      return {
        img: '',
        num: 0,
        weather: [],
        maximumAverage: [],
        indexData: [],



      }
    },
    components: {Loading},
    mounted() {
      this.setTableHeight();
      setTimeout(()=>{
        this.loadForecastingLineData();
      },1000)
    },
    updated(){
      this.setWidth()
    },
    created() {
      setTimeout(() => {
        this.getLoading();
      }, 1000);
      this.getAdminState();
    },
    methods: {
      //初始加载图片
      getLoading() {
        this.img = ["1"]
      },

      //根据屏幕设置Table高度
      setTableHeight() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          let div = this.$refs.templateContent;
          div.style.height = H - 30 + "px";
        }
        else {
          var h = document.body.clientHeight;
          let div = this.$refs.templateContent;
          div.style.height = h - 30 + "px";

        }

      },

      setWidth(){
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var W= window.screen.width;
          let templateContentTableTopDiv = this.$refs.templateContentTableTopDiv;
          for (let i=0;i<templateContentTableTopDiv.length;i++){
            templateContentTableTopDiv[i].style.width=0.25*W +"px"
          }
        }
        else {
          var h = document.body.clientHeight;
          let div = this.$refs.templateContent;
          div.style.height = h - 30 + "px";

        }
      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo === null) {



        }
        else {
          this.getWeatherForecasts();
          this.getMaximumAverageLoad();
          setTimeout(()=>{
            this.setData()
          },1000)

        }
      },

      //返回上一页
      goBackPage() {
        this.$router.go("-1")
      },

      //获取天气预报的接口
      getWeatherForecasts(){
        axios.get('https://www.tianqiapi.com/api/?version=v1&cityid=101270801')
          .then((res) => {
            if(res.data.data.length>0){
              this.weather=res.data.data;
            }
            else {
              this.$message.warning( "暂无天气预报的数据");
            }
          })
          .catch((err) => {
            console.log(err)
          });
      },

      //获取最大平均负荷的
      getMaximumAverageLoad(){
        axios.post(" "+ URL +"/app/loadForecasting/getMaximumAverageLoad")
          .then((res) => {
            if(res.data.state==="1"){
              if(res.data.data.length>0){
                this.maximumAverage=res.data.data
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

      //将气温和平均值合并成一个对象
      setData() {
        let data1 = [];
        let data2 = [];
        let data3 = [];
        let arr = [];
        for (let i = 0; i < this.weather.length; i++) {
          let json = {
            "day": this.weather[i].day,
            "date": this.weather[i].date,
            "wea": this.weather[i].wea,
            "tem2": this.weather[i].tem2,
            "tem1": this.weather[i].tem1,
            "id": i + 1
          };
          data1.push(json)
        }
        for (let j = 0; j < this.maximumAverage.length; j++) {
          let json = {
            "max": this.maximumAverage[j].max,
            "average": this.maximumAverage[j].average,
            "id": j + 1
          };
          data2.push(json)
        }
        data3 = data1.map((item1) => {
          arr = data2.filter((item2) => {
            return item2.id === item1.id;
          });
          return Object.assign(item1, arr[0]);
        });
        this.indexData = data3
      },

      //点击切换预测曲线
      showOtherLine(id,index){
        this.loadForecastingLineData(id,index);
        this.num = index;
      },

      //请求曲线数据
      loadForecastingLineData(data1,data2){
        axios.post(" "+ URL +"/app/loadForecasting/loadForecastingLineData",{"id":data1,"time":data2})
          .then((res) => {
            if(res.data.state==="1"){
              if(res.data.data.length>0){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('dataBar'));
                // 绘制图表
                myChart.setOption({
                  title : {
                    text: '负荷',
                    subtext: '实时显示'
                  },
                  tooltip : {
                    trigger: 'axis'
                  },
                  legend: {
                    data:['实际','预测']
                  },
                  grid:{
                    x:40,
                    borderWidth:1,
                    x2:10,
                    y2:30
                  },

                  toolbox: {
                    show : true,
                    feature : {
                      mark : {show: true},
                      magicType : {show: true, type: ['line', 'bar']},
                      restore : {show: true},
                    }
                  },
                  calculable : true,
                  xAxis : [
                    {
                      type : 'category',
                      boundaryGap : false,
                      data :res.data.data[0].xAxis
                    }
                  ],
                  yAxis : [
                    {
                      type : 'value'
                    }
                  ],
                  series : [
                    {
                      name:'实际',
                      type:'line',
                      smooth:true,
                      data:res.data.data[0].actual,
                    },
                    {
                      name:'预测',
                      type:'line',
                      smooth:true,
                      data:res.data.data[0].forecast,
                    }
                  ]
                });
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
  @import "../../../assets/less/base";

  .template {
    position: absolute;
    max-width: 640px;
    width: 100%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: @color-white;
    .back {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: @color-white;
      background-color: #3492E9;
      .backLeft {
        padding-left: 3%;
        width: 25%;
        line-height: 30px;
        span {
          margin-left: 5px;
        }
      }
      .backCenter {
        width: 55%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

      }
      .backRight {
        width: 20%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-riqi {
          font-size: 120%;
        }

      }

    }
    .templateContent {
      overflow: auto;
      .templateContentTable{
        height: 58%;
        margin-top: 1%;
        margin-bottom: 1%;
        overflow-x:auto;
        .templateContentTableTop{
          width: 175%;
          height:100%;
          .templateContentTableTopDiv{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            border-right: 1px solid @color-F0;
            border-bottom: 1px solid @color-F0;
            .weatherDiv{
              width: 100%;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: @font-size-small-s;
            }
            .dataDiv{
              span{
                display: block;
              }
              flex: 2;
              font-size: @font-size-small-s;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
          }


        }
      }
      .templateContentLine{
        height: 40%;
        background-color: @color-white;
      }

    }
    .navColor{
      background-color:@color-F0;
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
