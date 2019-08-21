<template>
  <div class="template">
    <div class="back">
      <div class="backLeft fl" @click="goBackPage">
        <i class="iconfont icon-left-trangle fl"></i>
        <span class="fl">返回</span>
      </div>
      <div class="backCenter fl">
        填写日电量
      </div>
      <div class="backRight fl" @click="doSaveFillInDay">
       确定
      </div>
    </div>
    <div class="templateContent" ref="templateContent">
      <div class="templateContentDiv">
        <div class="templateContentDivLeft">
          日历史电量填报
        </div>
        <div class="templateContentDivRight">
        </div>
      </div>
      <div class="templateContentDiv">
        <div class="templateContentDivLeft">
          选择日期
        </div>
        <div class="templateContentDivRight">
          <el-date-picker
            style="width: 80%"
            v-model="time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="templateContentDiv" v-for="(item,index) in divData">
        <div class="templateContentDivLeft">
          <span>{{item.text}}</span>
          <span>{{item.measurement}}</span>
        </div>
        <div class="templateContentDivRight" >
          <el-input
            placeholder="点击填写"
            v-model="item.value"
            clearable>
          </el-input>
        </div>
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
        time:"",
        divData:[
          {"text":"#1","measurement":"(万千万时)","value":""},
          {"text":"#2","measurement":"(万千万时)","value":""},
          {"text":"#3","measurement":"(万千万时)","value":""},
          {"text":"#4","measurement":"(万千万时)","value":""},
          {"text":"#5","measurement":"(万千万时)","value":""},
          {"text":"#6","measurement":"(万千万时)","value":""},
        ]


      }
    },
    components: {Loading},
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
          let div = this.$refs.templateContent;
          div.style.height = H - 30 + "px";
        }
        else {
          var h = document.body.clientHeight;
          let div = this.$refs.templateContent;
          div.style.height = h - 30 + "px";
        }

      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("loginMessage");
        if (userInfo === null) {
          this.$router.push("/UserLogin")
        }
        else {

        }
      },

      //返回上一页
      goBackPage() {
        this.$router.go("-1")
      },

      //保存数据
      doSaveFillInDay(){
        if(this.time){
          axios.post(" " + URL + "/app/Electricity/fillInDayData", {"time": this.time,"data":this.divData})
            .then((res) => {
              if (res.data.state === "1") {
                this.$message.success(res.data.message);
                this.time = "";
                this.divData = [
                  {"text": "#1", "measurement": "(万千万时)", "value": ""},
                  {"text": "#2", "measurement": "(万千万时)", "value": ""},
                  {"text": "#3", "measurement": "(万千万时)", "value": ""},
                  {"text": "#4", "measurement": "(万千万时)", "value": ""},
                  {"text": "#5", "measurement": "(万千万时)", "value": ""},
                  {"text": "#6", "measurement": "(万千万时)", "value": ""},
                ]
              }
              else {
                this.$message.warning(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err)
            });
        }
        else {
          this.$message.warning("时间不能为空");
        }
      }



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
    .templateContent{
      overflow: auto;
      .templateContentDiv{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        background-color: @color-white;
        .templateContentDivLeft{
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .templateContentDivRight{
          flex: 3;
          display: flex;
          align-items: center;
          justify-content: center;
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
