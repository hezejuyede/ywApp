<template>
  <div class="message">
    <div class="messageTitle">
      <span> 消息</span>
    </div>
    <div class="messageContent" ref="messageContent">
      <div class="messageContentTemplate" v-for="(item,index) in messageData" :key="(item.id)" @click="goToMessagePage(item.url)">
        <div class="messageContentTempLeft">
          <i :class="item.icon"></i>
        </div>
        <div class="messageContentTempCenter">
          <div class="" style="font-size: 16px;margin-bottom: 5px">
           {{item.text}}
          </div>
          <div class="" style="font-size: 14px;color: rgba(0,0,0,0.5)">
            <span>{{item.count}}</span><span style="margin-left: 5px">条信息</span>
          </div>
        </div>
        <div class="messageContentTempRight">
         <i class="iconfont icon-you"></i>
        </div>
      </div>
    </div>
    <footer-view></footer-view>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Loading from '../../common/loading/loading';
  import axios from 'axios'
  import URL  from '../../assets/js/URL'
  import FooterView from '../../common/footer/footer';

  export default {
    name: 'message',
    data() {
      return {
        img: '',
        messageData: [
          {"icon": "iconfont icon-huanbao", "text": "环保指标", "count": "1", "id": "1", "url": "/environmentalProtectionIndicators"},
          {"icon": "iconfont icon-xiaoliangyuce", "text": "调度计划", "count": "1", "id": "2", "url": "/schedulingPlanOnLine"},
          {"icon": "iconfont icon-shuju", "text": "经济指标", "count": "1", "id": "3", "url": "/economicIndicators"},
          {"icon": "iconfont icon-peizhiguanli", "text": "机组启停", "count": "1", "id": "4", "url": "/jzStartStop"},
          {"icon": "iconfont icon-shezhi", "text": "系统消息", "count": "1", "id": "5", "url": "/systemMessage"},
          {"icon": "iconfont icon-youjian", "text": "在线反馈", "count": "1", "id": "6", "url": "/messageList"}
        ]

      }
    },
    components: {Loading,FooterView, },
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
      getLoading() {
        this.img = ["1"]
      },
      //根据屏幕设置Table高度
      setTableHeight() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          let messageContent = this.$refs.messageContent;
          messageContent.style.height = H - 100 + "px"

        }
        else {
          var h = document.body.clientHeight;
          let messageContent = this.$refs.messageContent;
          messageContent.style.height = h - 100 + "px"

        }

      },

      //前往消息交流页面
      goToMessagePage(url) {
        this.$router.push(url)
      },


      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo === null) {
          console.log(11)

        }
        else {

        }
      },

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";

  .message {
    position: absolute;
    max-width: 640px;
    width: 100%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: @color-F0;
    .messageTitle {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: @color-white;
      background-color: #3492E9;
      display: flex;
      align-items: center;
      justify-content: center;

    }
    .messageContent{
      background-color: @color-white;
      overflow: auto;
      .messageContentTemplate{
        height: 80px;
        display: flex;
        border-bottom: 1px solid @color-F0;
        .messageContentTempLeft{
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-huanbao{
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 200%;
            background-color: @color-bg-lv;
            color: @color-white;
          }
          .icon-xiaoliangyuce{
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 200%;
            background-color: @color-bg-red;
            color: @color-white;
          }
          .icon-shuju{
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 200%;
            background-color: @color-bg-ch;
            color: @color-white;
          }
          .icon-peizhiguanli{
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 200%;
            background-color: @color-bg-cs;
            color: @color-white;
          }
          .icon-shezhi{
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 200%;
            background-color: @color-blue;
            color: @color-white;
          }
          .icon-youjian{
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 200%;
            background-color: @color-green;
            color: @color-white;
          }



        }
        .messageContentTempCenter{
          flex: 7;
          display: flex;
          align-items: start;
          justify-content: center;
          flex-direction: column;
        }
        .messageContentTempRight{
          flex: 1;
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
