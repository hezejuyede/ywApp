<template>
  <div class="unitStartStop">
    <div class="back">
      <div class="backLeft fl" @click="goBackPage">
        <i class="iconfont icon-left-trangle fl"></i>
        <span class="fl">返回</span>
      </div>
      <div class="backCenter fl">
        机组启停
      </div>
      <div class="backRight fl" @click="showChooseDate">
        <i class="iconfont icon-riqi"></i>
      </div>
    </div>
    <div class="unitStartStopNav">
      <div class="unitStartStopNavTemplate fl"
           v-for="(item,index) in unitStartStopNav">
        <div class="unitStartStopNavTemplateDiv" :class="{'navColor':index === num}" @click="changeNavBar(index,item.id)">
          <div class="" style="margin-bottom: 10px">{{item.text}}</div>
          <div class="">{{item.number}}</div>
        </div>
      </div>
    </div>
    <div class="unitStartStopContent">
      <div class="unitStartStopInfo">
        <div class="unitStartStopInfoLeft">
          <span style="margin-right: 10px">年停机次数</span>
          <span>{{count}}</span>
        </div>
        <div class="unitStartStopInfoRight">
          <span style="margin-right: 10px">年停机时长</span>
          <span>{{duration}}</span>
        </div>
      </div>
      <div class="unitStartStopTable">
        <el-table
          :data="unitStartStopData"
          :height="this.tableHeight"
          style="width: 100%">
          <el-table-column
            fixed
            prop="state"
            align="center"
            width="120"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="time"
            align="center"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="jxsc"
            align="center"
            label="继续时长">
          </el-table-column>
        </el-table>

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
            type="year"
            value-format="yyyy"
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
  import {getNowTime} from '../../../assets/js/api'
  import prefix from '../../../assets/js/prefix'


  export default {
    name: 'dutyLog',
    data() {
      return {
        img: '',
        unitStartStopNav: [
          {"text": "#1", "number": "120MW", "id": "1"},
          {"text": "#2", "number": "130MW", "id": "2"},
          {"text": "#3", "number": "140MW", "id": "3"},
          {"text": "#4", "number": "150MW", "id": "4"},
          {"text": "#5", "number": "160MW", "id": "5"},
          {"text": "#6", "number": "170MW", "id": "6"}
        ],
        num: 0,
        id:"1",
        time: "2019",
        count: "",
        duration: "",
        dateVisible: false,
        unitStartStopData: [],
        tableHeight: Number

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
          this.tableHeight = H - 150 + "px";
        }
        else {
          var h = document.body.clientHeight;
          this.tableHeight = h - 150 + "px";
        }
      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("loginMessage");
        if (userInfo === null) {
          this.$router.push("/UserLogin")
        }
        else {
          this.setTableHeight();
          this.getUnitStartStopData(this.id, this.time);
        }
      },


      //请求table数据
      getUnitStartStopData(data1,data2) {
        axios.post(" " + URL + "/app/unitStartStop/unitStartStop", {"time": data1,"id":data2})
          .then((res) => {
            if (res.data.state === "1") {
              if (res.data.data.length > 0) {
                this.unitStartStopData = res.data.data[0].data;
                this.duration = res.data.data[0].duration;
                this.count = res.data.data[0].count;
                this.dateVisible = false;
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
      },

      //进行时间查询
      doSearch() {
        if (this.time) {
          this.getUnitStartStopData(this.id, this.time);
        }
        else {
          this.$message.warning("查询时间不能为空");
        }
      },

      //改变顶部导航
      changeNavBar(index, id) {
        this.num = index;
        this.id = id;
        this.getUnitStartStopData(this.id, this.time);
      },


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../../assets/less/base";

  .unitStartStop {
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
    .unitStartStopNav {
      height: 60px;
      padding-top: 5px;
      .unitStartStopNavTemplate {
        width: 14.4%;
        height: 50px;
        border-radius: 10px;
        margin-left: 2%;
        font-size: @font-size-small-s;
        background-color: @color-white;
        .unitStartStopNavTemplateDiv {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 10px;
        }
      }
    }
    .unitStartStopInfo {
      margin-top: 5px;
      height: 50px;
      background-color: @color-white;
      display: flex;
      font-size: @font-size-medium;
      .unitStartStopInfoLeft {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 2px solid @color-F0;
      }
      .unitStartStopInfoRight {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .unitStartStopTable {
      margin-top: 10px;
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

  .navColor {
    background-color: @color-blue;
    color: @color-white;
  }

  .loading-container {
    position: absolute;
    max-width: 640px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
