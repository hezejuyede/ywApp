<template>
  <div class="EnvironmentalProtection">
    <div class="back" >
      <div class="backLeft fl" @click="goBackPage">
        <i class="iconfont icon-left-trangle fl"></i>
        <span class="fl">返回</span>
      </div>
      <div class="backCenter fl">
        经济指标
      </div>
      <div class="backRight fl" @click="showChooseDate">
        <i class="iconfont icon-xinjianyemiantianjia"></i>
      </div>
    </div>
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

    <!--弹框详情 -->
    <el-dialog title="指标配置" :visible.sync="dateVisible" :fullscreen="true" :center="true">
      <div class="equipmentDiv">
        <div class="equipmentDivContent" ref="equipmentDivContent">
          <div class="equipmentDivContentDiv" v-for="(item,index) in xzData" :key="item.id">
            <div class="equipmentDivContentDivLeft">
              {{item.text}}
            </div>
            <div class="equipmentDivContentDivRight">
              <el-button type="primary" @click="setXz(item.id)">限值</el-button>
              <el-button type="warning" @click="deleteXz(item.id)">移除</el-button>
            </div>
          </div>

        </div>
        <div class="searchBtn" ref="searchBtn">
          <el-button type="success" @click="showAdd">添加</el-button>
        </div>
      </div>
    </el-dialog>

    <!--弹框详情 -->
    <el-dialog  title="指标添加" :visible.sync="aadVisible" width="80%">
      <div class="indicatorsDiv">
        <div class="indicatorsContent" v-for="(item,index) in xzData" :key="item.id">
          <div class="indicatorsContentLeft">
            {{item.text}}
          </div>
          <div class="indicatorsContentRight">
            <el-button type="primary" icon="el-icon-plus" circle></el-button>
          </div>
        </div>
      </div>
    </el-dialog>
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
        environmentalData:[],
        xzData:[
          {"text":"有功负荷指令","id":"1"},
          {"text":"有功负荷指令","id":"2"},
          {"text":"有功负荷指令","id":"3"},
          {"text":"有功负荷指令","id":"4"},
          {"text":"有功负荷指令","id":"5"},
          {"text":"有功负荷指令","id":"6"},
          {"text":"有功负荷指令","id":"7"},
          {"text":"有功负荷指令","id":"8"},
          {"text":"有功负荷指令","id":"9"},
          {"text":"有功负荷指令","id":"10"},
          {"text":"有功负荷指令","id":"11"},
          {"text":"有功负荷指令","id":"12"},
          {"text":"有功负荷指令","id":"13"},
          {"text":"有功负荷指令","id":"14"},
          {"text":"有功负荷指令","id":"15"},
          {"text":"有功负荷指令","id":"16"},
          {"text":"有功负荷指令","id":"17"},
          {"text":"有功负荷指令","id":"18"}
        ],
        dateVisible:false,
        aadVisible:false
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

      setDivHeight(){
        let equipmentDivContent = this.$refs.equipmentDivContent;
        let searchBtn = this.$refs.searchBtn;
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          equipmentDivContent.style.height = 0.75* H + "px";
          searchBtn.style.height = 0.1* H + "px";
        }
        else {
          var h = document.body.clientHeight;
          equipmentDivContent.style.height = 0.75 * h + "px";
          searchBtn.style.height = 0.1* H + "px";
        }
      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo === null) {

        }
        else {
          this.setTableHeight();
          this.getEconomicIndicators();
        }
      },

      //请求经济指标的数据
      getEconomicIndicators() {
        axios.post(" " + URL + "/app/economicIndicators/getEconomicIndicators")
          .then((res) => {
            if (res.data.state === "1") {
              if (res.data.data.length > 0) {
                this.environmentalData = res.data.data;
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
      goBackPage(){
        this.$router.go("-1")
      },

      //显示选择
      showChooseDate(){
        this.dateVisible=true;
        setTimeout(()=>{
          this.setDivHeight();
        },1000)

      },
      //设置限值
      setXz(){

      },
      //删除限值
      deleteXz(id) {
        for (let i = 0; i < this.xzData.length; i++) {
          if (id === this.xzData[i].id) {
            this.xzData.splice(i, 1)
          }
        }

      },

      //现在添加的详情
      showAdd(){
        this.aadVisible=true;

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
        .icon-xinjianyemiantianjia{
          font-size: 120%;
        }

      }


    }


  }
  .equipmentDiv{
    .equipmentDivContent{
      overflow: auto;
      .equipmentDivContentDiv{
        width: 100%;
        border: 2px solid @color-F0;
        display: flex;
        background-color: @color-white;
        .equipmentDivContentDivLeft{
          flex: 1;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .equipmentDivContentDivRight{
          flex: 1;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-button{
            width: 60px;
            height: 35px;
          }

        }

      }
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
        height: 50px;
      }
    }

  }
  .indicatorsDiv{
    height: 300px;
    overflow: auto;
    .indicatorsContent{
      width: 100%;
      border: 2px solid @color-F0;
      display: flex;
      background-color: @color-white;
      .indicatorsContentLeft{
        flex: 2;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .indicatorsContentRight{
        flex: 1;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;

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
