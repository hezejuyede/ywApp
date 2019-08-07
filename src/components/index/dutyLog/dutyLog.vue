<template>
  <div class="loadManagement">
    <div class="back">
      <div class="backLeft fl" @click="goBackPage">
        <i class="iconfont icon-left-trangle fl"></i>
        <span class="fl">返回</span>
      </div>
      <div class="backCenter fl">
        值长日志
      </div>
      <div class="backRight fl" @click="showChooseDate">
        <i class="iconfont icon-riqi"></i>
      </div>
    </div>

    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
    <!--弹框详情 -->
    <el-dialog :visible.sync="dateVisible" width="80%">
      <div class="equipmentDiv">
        <div class="closeBtn">
          <el-button type="danger" @click="dateVisible = false">关闭窗口</el-button>
        </div>
        <div class="equipmentDivContent">
          <el-date-picker
            style="width: 100%"
            v-model="time"
            type="dates"
            value-format="yyyy-MM-dd"
            placeholder="查询日期">
          </el-date-picker>
        </div>
        <div class="searchBtn">
          <el-button type="success" @click="doSearch">查询</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import Back from '../../../common/back/back'
  import Loading from '../../../common/loading/loading';
  import axios from 'axios'
  import URL from '../../../assets/js/URL'

  import prefix from '../../../assets/js/prefix'


  export default {
    name: 'loadManagement',
    data() {
      return {
        num: 0,
        dateValue: '',
        img: '',
        tableHeight: "",

        equipmentId: "",
        equipmentLine: [],
        loadManagementData: [],
        value2: "",
        time: "",
        dateVisible: false

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
      //初始加载图片
      getLoading() {
        this.img = ["1"]
      },

      //根据屏幕设置Table高度
      setTableHeight() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          this.tableHeight = H - 340;
        }
        else {
          var h = document.body.clientHeight;
          this.tableHeight = h - 340;
        }

      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo === null) {

        }
        else {

          this.setTableHeight();
          this.getEquipmentLineData();
          this.getEquipmentTableData();

        }
      },


      //请求table数据
      getEquipmentTableData(data) {
        axios.post(" " + URL + "/app/Electricity/dailyElectricityTableData", {"time": data})
          .then((res) => {
            if (res.data.state === "1") {
              if (res.data.data.length > 0) {
                this.loadManagementData = res.data.data;
              }
              else {
                this.$message.warning("暂无数据");
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

      //请求有几个机组线
      getEquipmentLineData(data) {
        axios.post(" " + URL + "/app/Electricity/dailyElectricityLineData", {"time": data})
          .then((res) => {
            if (res.data.state === "1") {
              if (res.data.data.length > 0) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('dataBar'));
                // 绘制图表
                myChart.setOption({
                  title: {
                    text: '日电量',
                    subtext: '实时显示'
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    data: [res.data.data[0].range]
                  },
                  grid: {
                    x: 40,
                    borderWidth: 1,
                    x2: 10,
                    y2: 30
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      mark: {show: true},
                      magicType: {show: true, type: ["line", 'bar']},
                      restore: {show: true},
                    }
                  },
                  calculable: true,
                  xAxis: [
                    {
                      type: 'category',
                      boundaryGap: false,
                      data: res.data.data[0].time
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value'
                    }
                  ],
                  series: [
                    {
                      name: res.data.data[0].range,
                      type: 'bar',
                      smooth: true,
                      data: res.data.data[0].data,
                    }
                  ]
                });
              }
              else {
                this.$message.warning("暂无数据");
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

      //返回上一页
      goBackPage() {
        this.$router.go("-1")
      },

      //显示选择
      showChooseDate() {
        this.dateVisible = true;
        this.time="";

      },

      //进行时间查询
      doSearch() {
        if (this.time.length>0 && this.time.length<3) {
          let that = this;
          axios.all([
            axios.post(" " + URL + "/app/Electricity/dailyElectricityTableData", {"time": this.time}),
            axios.post(" " + URL + "/app/Electricity/dailyElectricityLineData", {"time": this.time})
          ])
            .then(axios.spread(function (table,line) {
              that.equipmentLine = line.data.data;
              that.loadManagementData = table.data.data;
              that.dateVisible=false;
            }));
        }
        else {
          this.$message.warning("查询时间不能为空,最多2个");
        }
      },


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../../assets/less/base";

  .loadManagement {
    position: absolute;
    max-width: 640px;
    width: 100%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: @color-F0;

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
    .loadManagement-navBar {
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
    .loadManagement-line {
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: @color-white;
      margin-bottom: 5px;

    }
    .navColor {
      color: #3a8ee6;
    }
    .equipmentDiv {
      height: 180px;
      .closeBtn {
        width: 100%;
        height: 15%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 999;
        .el-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          height: 50px;
        }
      }
      .equipmentDivContent {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .searchBtn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 35px;
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
