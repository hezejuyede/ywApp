<template>
  <div class="loadManagement">
    <div class="back" >
      <div class="backLeft fl" @click="goBackPage">
        <i class="iconfont icon-left-trangle fl"></i>
        <span class="fl">返回</span>
      </div>
      <div class="backCenter fl">
        <span style="margin-right: 5px">一厂</span>
        <el-switch
          style="display: block"
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <span style="margin-left: 5px">二厂</span>
      </div>
      <div class="backRight fl" @click="showChooseDate">
        <i class="iconfont icon-riqi"></i>
      </div>
    </div>
    <div class="loadManagement-navBar">
      <div class="navBar-div" v-for="(item,index) in navBar" @click="changeNavBar(index)" :class="{'navColor':index === num}">
        {{item.jz}}
      </div>

    </div>
    <div class="loadManagement-line">
      <div id="dataBar" :style="{width: '100%', height: '300px'}"></div>
    </div>
    <div class="loadManagement-list">
      <el-table
        :data="loadManagementData"
        :height="this.tableHeight"
        style="width: 100%">
        <el-table-column
          prop="type"
          align="center"
          min-width="20%"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="rj"
          align="center"
          min-width="20%"
          label="日均负荷率">
        </el-table-column>
        <el-table-column
          prop="hb"
          align="center"
          min-width="20%"
          label="负荷率日环比">
        </el-table-column>
        <el-table-column
          prop="AGC"
          align="center"
          min-width="20%"
          label="AGC指令值">
        </el-table-column>
        <el-table-column
          prop="ss"
          align="center"
          min-width="20%"
          label="实时负荷">
        </el-table-column>
      </el-table>
    </div>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>


    <!--公告详情 -->
    <el-dialog :visible.sync="dateVisible" width="80%">
      <div class="equipmentDiv">
        <div class="closeBtn">
          <el-button type="danger" @click="dateVisible = false">关闭窗口</el-button>
        </div>
        <div class="equipmentDivContent">
          <el-date-picker
            style="width: 100%"
            v-model="time"
            type="date"
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
  import Back from '../../common/back/back'
  import Loading from '../../common/loading/loading';
  import {getNowTime} from '../../assets/js/api'


  export default {
    name: 'loadManagement',
    data() {
      return {
        num:0,
        dateValue: '',
        img:'',
        tableHeight:"",
        navBar:[{jz:"全部"},{jz:"#1"},{jz:"#2"},{jz:"#3"},{jz:"#4"},{jz:"#5"}],
        loadManagementData:[
          {type:"全部",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
          {type:"#1",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
          {type:"#2",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
          {type:"#3",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
          {type:"#4",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
          {type:"#5",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
          {type:"#6",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"}
        ],
        value2:"",
        time:"",
        dateVisible:false

      }
    },
    components: {Loading,Back},
    mounted() {
      this.drawLine();
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
          this.tableHeight=H-390;
        }
        else {
          var h = document.body.clientHeight;
          this.tableHeight=h-390;
        }

      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo === null) {

        }
        else {
          this.time = getNowTime();
          this.setTableHeight();
        }
      },

      //显示曲线
      drawLine() {
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
            data:['昨日','今日']
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
              data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'昨日',
              type:'line',
              smooth:true,
              data:[3001, 2001, 3015, 3085, 2600, 3830, 2710,3001, 2001, 3015, 3085, 2600, 3830, 2710,3001, 2001, 3015, 3085, 2600, 3830, 2710,3001, 2001,3001,],
            },
            {
              name:'今日',
              type:'line',
              smooth:true,
              data:[3501, 2501, 3515, 3585, 2900, 3530, 2510,3501, 2501, 3515, 3585, 2200, 3530, 2510,3501, 2501, 3515, 3585, 2500, 3530, 2510,3501, 2501,3501,],
            }
          ]
        });
      },

      //返回上一页
      goBackPage(){
        this.$router.go("-1")
      },

      //显示选择
      showChooseDate(){
        this.dateVisible=true;

      },

      //进行时间查询
      doSearch(){
        if (this.time) {

        }
        else {
          this.message = "查询时间不能为空";
          this.HideModal = false;
          const that = this;
          function a() {
            that.message = "";
            that.HideModal = true;
          }
          setTimeout(a, 2000);
        }
      },

      //改变头部NAV
      changeNavBar(index){
        this.num = index;
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";
  .loadManagement{
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
      .backLeft{
        padding-left: 3%;
        width: 25%;
        line-height: 30px;
        span {
          margin-left: 5px;
        }
      }
      .backCenter{
        width: 55%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

      }
      .backRight{
        width: 20%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-riqi{
          font-size: 120%;
        }

      }


    }
    .loadManagement-navBar{
      height: 50px;
      background-color: @color-white;
      margin-bottom: 5px;
      display: flex;
      .navBar-div{
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }
    }
    .loadManagement-line{
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: @color-white;
      margin-bottom: 5px;

    }
    .navColor{
      color: #3a8ee6;
    }
    .equipmentDiv{
      height: 180px;
      .closeBtn {
        width: 100%;
        height: 15%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top:10px;
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
      .equipmentDivContent{
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
