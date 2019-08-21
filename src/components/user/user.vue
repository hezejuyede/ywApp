<template>
  <div class="userInfo">
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
    <div class="userInfo-top">
      <span>用户中心</span>
    </div>
    <div class="userInfo-center">
      <div class="userInfo-center-login" v-if="userState ==='1'">
        <div class="userInfoDiv">
         <div class="userInfoDivAvatar">
           <img src="../../assets/img/6.jpg" alt="">
         </div>
          <div class="userInfoDivInfo">
            <div class="userInfoDivInfoText"><div style="font-size: 20px;color:#ffffff">{{username}}</div></div>
            <div class="userInfoDivInfoStation"><div  style="color: #ffffff;margin-top:5px;font-size: 13px">专工</div></div>
          </div>
        </div>

      </div>
      <div class="userInfo-center-login" v-if="userState !=='1'">
        <div class="userInfo-center-login-avatar">
          <img src="../../assets/img/avatar.png" alt="">
        </div>
        <div class="userInfo-center-login-text" @click="goToLoginPage">
          点击登录
        </div>
      </div>
    </div>
    <div class="userInfo-bottom" ref="userInfoBottom">
      <div class="userInfo-bottom-template" v-for="(item,index) in bottomData" :key="item.id">
        <div class="template-left">
          <i :class="item.icon"></i>
        </div>
        <div class="template-right">
          <div class="template-right-text">
            {{item.text}}
          </div>
          <div class="template-right-icon">
            <i class="iconfont icon-you"></i>
          </div>
        </div>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import FooterView from '../../common/footer/footer'
  import Loading from '../../common/loading/loading';
  export default {
    name: 'userInfo',
    data() {
      return {
        img: "",
        username:"",
        userState:"2",
        bottomData:[
          {"icon": "iconfont icon-iconset0137", "text": "生产早会","url":"schedulingPlan"},
          {"icon": "iconfont icon-caozuorizhi", "text": "值长日志","url":"dutyLog"},
          {"icon": "iconfont icon-quit", "text": "退出登陆" ,"url":"EarlyMeeting"}
        ]
      }
    },
    components: {FooterView,Loading},
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

      //  前往登陆页面
      goToLoginPage(){
        this.$router.push("/UserLogin")
      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("loginMessage");
        if (userInfo === null) {
          this.$router.push("/UserLogin")
        }
        else {
          let json = JSON.parse(userInfo);
          this.userState = json.state;
          this.username = json.username;
          console.log(this.userState)



        }
      },

      //根据屏幕设置DIV高度
      setTableHeight() {
        let div = this.$refs.userInfoBottom;
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          div.style.height = H - 280 + "px";
        }
        else {
          var h = document.body.clientHeight;
          div.style.height = h - 280 + "px";
        }

      },


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/less/base";
  .userInfo{
    position: absolute;
    max-width: 640px;
    width: 100%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: @color-F0;
  }
  .userInfo-top{
    height:50px;
    line-height: 50px;
    background-color: #3492E9;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      font-size: @font-size-large;
      color: @color-white;
    }
  }
  .userInfo-center{
    margin-bottom: 10px;
    .userInfoDiv{
      width: 100%;
      height: 150px;
      background-color: #3492E9;
      display: flex;
      align-items: center;
      justify-content: center;
      .userInfoDivAvatar{
        flex: 3;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          height: 60px;
          width: 60px;
          border-radius: 50%;
        }
      }
      .userInfoDivInfo{
        flex: 7;
        height: 80px;
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;


      }
    }
    .userInfo-center-login{
      height: 150px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-bottom: 1px solid @color-background-d;
      .userInfo-center-login-avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 50px;
        img {
          height: 100%;
        }
      }
      .userInfo-center-login-text{
        margin-top: 10px;
        font-weight: bold;

      }
    }

  }
  .userInfo-bottom{
    width: 100%;
    padding-top: 10px;
    background-color: @color-white;
    .userInfo-bottom-template{
      height: 50px;
      display: flex;
      align-items: center;
      margin-top: 5px;
      .template-left{
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-iconset0137{
          display: block;
          width: 30px;
          height: 30px;
          background-color:  #2E97FF;
          line-height: 30px;
          text-align: center;
          color: @color-white;
          border-radius: 10%;
        }
        .icon-caozuorizhi{
          display: block;
          width: 30px;
          height: 30px;
          background-color:  #FD9232;
          line-height: 30px;
          text-align: center;
          color: @color-white;
          border-radius: 10%;
        }
        .icon-quit{
          display: block;
          width: 30px;
          height: 30px;
          background-color:  #ED593F;
          line-height: 30px;
          text-align: center;
          color: @color-white;
          border-radius: 10%;

        }
      }
      .template-right{
        height: 100%;
        flex: 8;
        display: flex;
        border-bottom: 1px solid@color-background-d;
        .template-right-text{
          flex: 9;
          display: flex;
          align-items: center;

        }
        .template-right-icon{
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
