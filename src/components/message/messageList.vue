<template>
  <div class="messageList">
    <div class="back">
      <div class="backLeft fl" @click="goBackPage">
        <i class="iconfont icon-left-trangle fl"></i>
        <span class="fl">返回</span>
      </div>
      <div class="backCenter fl">
         通讯录
      </div>
      <div class="backRight fl"></div>
    </div>
    <div class="messageListDiv" >
      <div class="messageListDivTop">
        <input placeholder="检索联系人"  v-model="searchWord" />
      </div>
      <div class="messageListDivList"  ref="messageListDivList">
        <div class="messageTemplate" v-for="(item,index) in tables" :key="item.id" @click="goToChat(item.userName,item.id)">
          <div class="messageTemplateLeft">
            <div class="messageAvatar">
              <img :src="item.avatar" alt="">
            </div>
            <div class="unreadMessage" v-if="item.unreadMessage">
              {{item.unreadMessage}}
            </div>
          </div>
          <div class="messageTemplateRight">
          {{item.userName}}
          </div>
        </div>
      </div>
    </div>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Loading from '../../common/loading/loading';
  import axios from 'axios'
  import URL from '../../assets/js/URL'
  import prefix from '../../assets/js/prefix'


  export default {
    name: 'loadManagement',
    data() {
      return {
        img: '',
        searchWord:"",
        listData:[
          {"avatar": require('../../assets/img/messageAvatar.jpg'), "userName": "邓波"," id":"1","unreadMessage":"1"},
          {"avatar": require('../../assets/img/1.jpg'), "userName": "刘一"," id":"2","unreadMessage":"1"},
          {"avatar": require('../../assets/img/2.jpg'), "userName": "陈二"," id":"3","unreadMessage":"3"},
          {"avatar": require('../../assets/img/3.jpg'), "userName": "张三"," id":"4","unreadMessage":"4"},
          {"avatar": require('../../assets/img/4.jpg'), "userName": "李四"," id":"5","unreadMessage":""},
          {"avatar": require('../../assets/img/5.jpg'), "userName": "王五"," id":"6","unreadMessage":""},
          {"avatar": require('../../assets/img/6.jpg'), "userName": "赵六"," id":"7","unreadMessage":""},
          {"avatar": require('../../assets/img/7.jpg'), "userName": "孙七"," id":"8","unreadMessage":""},
          {"avatar": require('../../assets/img/8.jpg'), "userName": "周八"," id":"9","unreadMessage":""},
          {"avatar": require('../../assets/img/9.jpg'), "userName": "吴九"," id":"10","unreadMessage":""},
          {"avatar": require('../../assets/img/10.jpg'), "userName": "郑十"," id":"11","unreadMessage":""},
          {"avatar": require('../../assets/img/1.jpg'), "userName": "刘一"," id":"12","unreadMessage":""},
          {"avatar": require('../../assets/img/2.jpg'), "userName": "陈二"," id":"13","unreadMessage":""},
          {"avatar": require('../../assets/img/3.jpg'), "userName": "张三"," id":"14","unreadMessage":""},
          {"avatar": require('../../assets/img/4.jpg'), "userName": "李四"," id":"15","unreadMessage":""},
          {"avatar": require('../../assets/img/5.jpg'), "userName": "王五"," id":"16","unreadMessage":""},
          {"avatar": require('../../assets/img/6.jpg'), "userName": "赵六"," id":"17","unreadMessage":""},
          {"avatar": require('../../assets/img/7.jpg'), "userName": "孙七"," id":"18","unreadMessage":""},
          {"avatar": require('../../assets/img/8.jpg'), "userName": "周八"," id":"19","unreadMessage":"10"},
          {"avatar": require('../../assets/img/9.jpg'), "userName": "吴九"," id":"20","unreadMessage":"120"},
          {"avatar": require('../../assets/img/10.jpg'), "userName": "郑十"," id":"21","unreadMessage":"11"}
          ]
      }
    },
    components: {Loading},
    mounted() {
      this.setTableHeight();
    },
    computed: {
      //模糊检索
      tables: function () {
        var search = this.searchWord;
        if (search) {
          return this.listData.filter(function (dataNews) {
            return Object.keys(dataNews).some(function (key) {
              return String(dataNews[key]).indexOf(search) > -1
            })
          })
        }
        return this.listData
      }
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
        let messageListDivList = this.$refs.messageListDivList;
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          messageListDivList.style.height = H - 80 + "px";
        }
        else {
          var h = document.body.clientHeight;
          messageListDivList.style.height = h - 80 + "px";
        }

      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo === null) {

        }
        else {



        }
      },

      goToChat(userName, id) {
        this.$router.push({path: '/onlineFeedback', query: {userName: userName, id: id}})
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


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .messageList {
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
    .messageListDiv{
      .messageListDivTop{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          height: 35px;
          width: 90%;
          border-radius: 10px;
          padding-left: 20px;
        }
      }
      .messageListDivList{
        overflow: scroll;
        .messageTemplate{
          height: 55px;
          background-color: @color-white;
          display: flex;
          .messageTemplateLeft{
            flex: 2;
            position: relative;
            .messageAvatar{
              width: 100%;
              height:100%;
              display: flex;
              align-items: center;
              justify-content: center;
              img{
                width: 45px;
                height: 45px;
                border-radius: 10px;
              }
            }

            .unreadMessage{
              position: absolute;
              top: 0;
              right: 2px;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: @font-size-small-s;
              color: @color-white;
              background-color: @color-red;
              z-index: 99;
            }
          }
          .messageTemplateRight{
            flex: 8;
            display: flex;
            align-items: center;
            justify-content: start;
            border-bottom: 1px solid@color-F0;
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
