<template>
  <div class="openingMode">
    <div class="back">
      <div class="backLeft fl" @click="goBackPage">
        <i class="iconfont icon-left-trangle fl"></i>
        <span class="fl">返回</span>
      </div>
      <div class="backCenter fl">
        开机方式
      </div>
      <div class="backRight fl">
        <i class="iconfont icon-ditu"></i>
        <span style="font-size: 12px;margin-left: 5px">广安</span>
      </div>
    </div>
    <div class="openingModeTitle">
      <span>四川广安发电有限责任公司</span>
    </div>
    <div class="openingModeBottom">
      <el-table
        :data="openingModeData"
        :height="this.tableHeight"
        :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 1)',fontSize:'16px'}"
        style="width: 100%">
        <el-table-column
          prop="unit"
          align="center"
          min-width="20%"
          label="机组">
        </el-table-column>
        <el-table-column
          prop="state"
          align="center"
          min-width="20%"
          label="状态">
          <template scope="scope">
            <div v-if="scope.row.status === '2' ">
              <el-button
                type="danger"
                style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center">
                {{scope.row.state}}
              </el-button>
            </div>
            <div v-if="scope.row.status === '1'">
              <el-button
                type="success"
                style="width: 100%;height: 35px;display: flex;align-items: center;justify-content: center">
                {{scope.row.state}}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          align="center"
          min-width="60%"
          label="时间">
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
  import axios from 'axios'
  import URL from '../../../assets/js/URL'
  import prefix from '../../../assets/js/prefix'


  export default {
    name: 'dutyLog',
    data() {
      return {
        img: '',
        openingModeData: [],
        tableHeight: ""

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
          this.tableHeight = H - 80 + "px";

        }
        else {
          var h = document.body.clientHeight;
          this.tableHeight = h - 80 + "px";
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
          this.getOpeningMode();

        }
      },


      //请求table数据
      getOpeningMode() {
        axios.post(" " + URL + "/app/openingMode/getOpeningMode")
          .then((res) => {
            if (res.data.state === "1") {
              if (res.data.data.length > 0) {
                this.openingModeData = res.data.data;
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


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../../assets/less/base";

  .openingMode {
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

    .openingModeTitle {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      font-size: @font-size-medium;
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
