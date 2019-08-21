<template>
  <div class="dutyLog">
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
    <div class="dutyLogContent" ref="dutyLogContent">
      <div class="dutyLogContentTitle">
        <span>{{time}}</span><span style="margin-left: 5px">值长日志</span>
      </div>
      <div class="dutyLogContentTemplate" v-for="(item,index) in dutyLogData" :key="item.id">
        <div class="dutyLogContentTemplateTop">
          <div class="fl">
            <span>登记人</span>
            <span>：</span>
            <span>{{item.name}}</span>
          </div>
          <div class="fr">
            <span>{{item.time}}</span>
          </div>
        </div>
        <div class="dutyLogContentTemplateBottom">
          　{{item.content}}
        </div>
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
        dutyLogData: [],
        time: "",
        dateVisible: false

      }
    },
    components: {Loading, Back},
    mounted() {
      this.setTableHeight();

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
          let dutyLogContent = this.$refs.dutyLogContent;
          dutyLogContent.style.height = H - 30 + "px";
        }
        else {
          var h = document.body.clientHeight;
          let dutyLogContent = this.$refs.dutyLogContent;
          dutyLogContent.style.height = h - 30 + "px";
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
          this.getDutyLogData(this.time)

        }
      },


      //请求table数据
      getDutyLogData(data) {
        axios.post(" " + URL + "/app/dutyLog/dutyLogData", {"time": data})
          .then((res) => {
            if (res.data.state === "1") {
              if (res.data.data.length > 0) {
                this.dutyLogData = res.data.data;
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
          this.getDutyLogData(this.time);
        }
        else {
          this.$message.warning("查询时间不能为空");
        }
      },


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../../assets/less/base";

  .dutyLog {
    position: absolute;
    max-width: 640px;
    width: 100%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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
    .dutyLogContent {
      background-color: @color-F0;
      overflow: auto;
      .dutyLogContentTitle {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: @color-blue;
      }
      .dutyLogContentTemplate {
        padding-left: 10px;
        padding-right: 10px;
        background-color: @color-white;
        margin-bottom: 10px;
        .dutyLogContentTemplateTop {
          height: 40px;
          line-height: 40px;
          font-size: @font-size-small;
          border-bottom: 1px solid @color-F0;
        }
        .dutyLogContentTemplateBottom {
          padding-bottom: 10px;
          padding-top: 10px;
          font-size: @font-size-small;
        }

      }

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
