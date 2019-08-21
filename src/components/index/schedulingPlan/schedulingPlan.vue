<template>
  <div class="loadManagement">
    <div class="back" >
      <div class="backLeft fl" @click="goBackPage">
        <i class="iconfont icon-left-trangle fl"></i>
        <span class="fl">返回</span>
      </div>
      <div class="backCenter fl">
        <span>调度计划</span>
      </div>
      <div class="backRight fl">
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
          prop="time"
          align="center"
          min-width="25%"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="mqjh"
          align="center"
          min-width="25%"
          label="目前计划">
        </el-table-column>
        <el-table-column
          prop="rnjh"
          align="center"
          min-width="25%"
          label="日内计划">
        </el-table-column>
        <el-table-column
          prop="sscl"
          align="center"
          min-width="25%"
          label="实时出力">
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
  import {getNowTime} from '../../../assets/js/api'
  import axios from 'axios'
  import URL  from '../../../assets/js/URL'


  export default {
    name: 'loadManagement',
    data() {
      return {
        num:0,
        dateValue: '',
        img:'',
        tableHeight:"",
        navBar:[],
        navBarId:"1",
        equipmentId:"",
        equipmentLine:[],
        loadManagementData:[],
        value2:"",
        time:"",
        dateVisible:false

      }
    },
    components: {Loading,Back},
    mounted() {
      setTimeout(()=>{
        this.getEquipmentLineData(this.navBar[0].id,this.time);
      },1000)

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
        const userInfo = localStorage.getItem("loginMessage");
        if (userInfo === null) {
          this.$router.push("/UserLogin")
        }
        else {
          this.time = getNowTime();
          this.setTableHeight();
          axios.post(" "+ URL +"/app/getNumberOEquipment")
            .then((res) => {
              if(res.data.state==="1"){
                if(res.data.data.length>0){
                  this.navBar=res.data.data;
                  this.getEquipmentTableData(this.time);
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
        }
      },

      //请求有几个机组线
      getEquipmentTableData(data1,data2){
        axios.post(" "+ URL +"/app/schedulingPlan/getSchedulingPlanTableData",{"id":data1,"time":data2})
          .then((res) => {
            if(res.data.state==="1"){
              if(res.data.data.length>0){
                this.loadManagementData=res.data.data;
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

      //请求table数据
      getEquipmentLineData(data1,data2){
        axios.post(" "+ URL +"/app/schedulingPlan/getSchedulingPlanLineData",{"id":data1,"time":data2})
          .then((res) => {
            if(res.data.state==="1"){
              if(res.data.data.length>0){
                // 基于准备好的dom，初始化echarts实例
                this.equipmentLine =res.data.data;
                let myChart = this.$echarts.init(document.getElementById('dataBar'));
                // 绘制图表
                myChart.setOption({
                  title : {
                    text: 'MW',
                    subtext: '实时显示'
                  },
                  tooltip : {
                    trigger: 'axis'
                  },
                  legend: {
                    data:['目前','日内','实时']
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
                      data :this.equipmentLine[0].xAxis
                    }
                  ],
                  yAxis : [
                    {
                      type : 'value'
                    }
                  ],
                  series : [
                    {
                      name:'目前',
                      type:'line',
                      smooth:true,
                      data:this.equipmentLine[0].present,
                    },
                    {
                      name:'日内',
                      type:'line',
                      smooth:true,
                      data:this.equipmentLine[0].intraday,

                    },
                    {
                      name:'实时',
                      type:'line',
                      smooth:true,
                      data:this.equipmentLine[0].realTime,
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


      //返回上一页
      goBackPage(){
        this.$router.go("-1")
      },

      //改变头部NAV
      changeNavBar(index){
        this.navBarId=this.navBar[index].id;
        this.getEquipmentLineData(this.navBarId,this.time);
        this.getEquipmentTableData(this.navBarId,this.time);
      }



    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../../assets/less/base";
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
