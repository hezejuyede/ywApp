<template>
  <div class="message">
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
    <div id="LxKf">
      <div class="LxKf-top">
        <i class="iconfont icon-xiangzuo" @click="backIndex"></i>
        <span>经济指标</span>
        <i class="iconfont icon-solid-person"></i>
      </div>
      <div class="LxKf-center">
        <div class="" v-for="(item,index) in  onMessage">
          <div class="left-template"  v-show="item.direction === 'left'">
            <div class="left-template-time">{{item.time}}</div>
            <div class="left-template-content">
              <p class="">
                {{item.leftContent}}
              </p>
            </div>
            <div class="left-template-avatar">
              <img :src="item.leftAvatar" alt="">
            </div>
          </div>
          <div class="right-template" v-show="item.direction=== 'right'">
            <div class="right-template-avatar">
              <img :src="item.rightAvatar" alt="">
            </div>
            <div class="right-template-time"> {{item.time}}</div>
            <div class="right-template-content" >
              <p class="">
                {{item.rightContent}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="LxKf-bottom" ref="LxKfBottom">
        <div class="LxKf-bottom-left1">
          <i class="iconfont icon-jianpan"></i>
        </div>
        <div class="LxKf-bottom-left2">
          <input v-model="EmitMessage"/>
        </div>
        <div class="LxKf-bottom-right2">
          <p @click="emitMessage">发送</p>
        </div>
      </div>
      <modal
        :msg="message"
        :isHideModal="HideModal">
      </modal>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import HeaderView from '../../common/header/header';
  import FooterView from '../../common/footer/footer'
  import Modal from "../../common/modal/modal";
  import axios from 'axios'
  import {getNowTime} from '../../api/config'
  import Loading from '../../common/loading/loading';
  export default {
    name: 'message',
    data() {
      return {
        img:'',
        message: "",
        HideModal: true,
        EmitMessage: '',
        onMessage: [],
        chatObject:"",
        chatObjectId:"",

        avatar: '11',
        username: '11',
        content:'',


        CustomerService:'',
        CustomerServiceAvatar:'',
        CustomerServiceContent:'',

      }
    },
    components: {HeaderView,FooterView,Modal,Loading},
    mounted() {
      this.$socket.on('privateMsg', (from, to, msg) => {
        if (msg.user === this.username) {
          this.content = msg.message;
          this.avatar = msg.avatar;
          let t = msg.time;
          let time = t.slice(5);
          let a = {
            'direction':"left",
            'leftContent': this.content,
            'leftAvatar': this.avatar,
            'time':time,
            'state':"1"
          };
          this.onMessage.push(a)
        }
        else if (msg.user === 'CustomerService') {
          this.CustomerService = msg.user;
          this.CustomerServiceContent = msg.message;
          this.CustomerServiceAvatar = msg.avatar;
          let t = msg.time;
          let time = t.slice(5);
          let b = {
            'direction':"right",
            'time':time,
            'rightContent': this.CustomerServiceContent,
            'rightAvatar': this.CustomerServiceAvatar,
            'state':"1"
          };
          this.onMessage.push(b)
        }
        axios.post('/api/UserChatList',{
          chatMessage:this.onMessage
        })
          .then((res)=>{
            console.log("1")
          })
          .catch((err)=>{
            console.log(err)
          })

      });
    },
    created() {
      this._getUserCollect();
      /*this._getChatList();*/
      setTimeout(() => {
        this.getLoading();
      }, 1000);
    },
    methods: {
      _getUserCollect() {
        this.chatObject=this.$route.query.userName;
        this.chatObjectId=this.$route.query.chatObjectId;

        if (sessionStorage.getItem("userInfo") === null) {
          console.log("用户还没有登录")
          this.$socket.emit('CustomerService', {
            "username": this.username,
          });
        }
        else {
          let UserInfo = sessionStorage.getItem("userInfo");
          UserInfo = JSON.parse(UserInfo);
          this.login = UserInfo.state;
          this.avatar = UserInfo.avatar;
          this.username = UserInfo.username;
          this.$socket.emit('CustomerService', {
            "username": this.username,
          });

        }
      },

      _getChatList() {
        axios.post('/api/getUserChatList')
          .then((res) => {
            this.onMessage = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      },

      emitMessage() {
        let time = getNowTime();
        this.$socket.emit("privateMessage", this.username, 'CustomerService', {
          "message": this.EmitMessage,
          "time": time,
          "user": this.username,
          'avatar': this.avatar
        });
        this.EmitMessage = "";
      },


      backIndex() {
        this.$router.go(-1)
      },

      getLoading() {
        this.img = ["1"]
      }

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

    .noLogin {
      width: 100%;
      height: 100%;
      background-color: @color-F0;
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: @font-size-large-xxx;
      justify-content: center;
      img {
        margin-bottom: 50px;
      }
      p {
        margin-bottom: 50px;
      }
    }

  }

  #LxKf{
    width: 100%;

    .LxKf-top{
      max-width: 640px;
      width: 100%;
      background-color: @color-wxt;
      height: 50px;
      line-height: 50px;
      position: fixed;
      top: 0;
      z-index: 99;
      .icon-xiangzuo{
        margin-left: 15px;
        color: @color-white;
        font-size: @font-size-large;
        font-weight: bold;
        margin-right: 10px;
      }
      span{
        color: @color-white;
        font-size: @font-size-large;
        font-weight: bold;
      }
      .icon-solid-person{
        float: right;
        margin-right: 20px;
        font-size: @font-size-large-xx;
        color: @color-white;
        font-weight: bold;
      }


    }
    .LxKf-center{
      position: absolute;
      width: 100%;
      height: 70%;
      overflow-y: auto;
      top: 60px;
      bottom: 50px;
      .left-template{
        width: 80%;
        float: right;
        display: flex;
        align-items: center;
        position: relative;
        margin: 20px;
        .left-template-avatar{
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          img{
            width: 50px;
            height: 50px;
          }

        }
        .left-template-content{
          flex: 4;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          p{
            padding:10px;
            border-radius: 10%;
            background-color: @color-wxxx;
          }


        }
        .left-template-time{
          height: 16px;
          line-height: 16px;
          padding-left: 10px;
          padding-right: 10px;
          position: absolute;
          top: -12px;
          background-color: @color-F0;
          color:@color-white;
          left: 25%;
          font-size: 12px;
        }
      }
      .right-template{
        width: 80%;
        float: left;
        display: flex;
        align-items: center;
        margin: 20px;
        position: relative;
        .right-template-avatar{
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          img{
            width: 50px;
            height: 50px;
          }

        }
        .right-template-content{
          flex: 4;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          p{
            padding:10px;
            border-radius: 10%;
            background-color: @color-F0;
          }


        }
        .right-template-time{
          height: 16px;
          line-height: 16px;
          padding-left: 10px;
          padding-right: 10px;
          position: absolute;
          top: -12px;
          background-color: @color-F0;
          color:@color-white;
          left: 35%;
          font-size: 12px;
        }
      }
    }

    .LxKf-bottom{
      max-width: 640px;
      width: 100%;
      position: fixed;
      bottom: 0;
      height: 50px;
      z-index: 99;
      background-color: @color-F0;
      border-top: 1px solid@color-background-d;
      display: flex;
      align-items: center;
      .LxKf-bottom-left1 {
        flex: 1;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-yuyin {
          font-size: @font-size-large-xxxxx;
        }
        .icon-jianpan {
          font-size: @font-size-large-xxxxx;
        }
      }
      .LxKf-bottom-left2 {
        flex: 6;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        input{
          width: 200px;
          margin: 0 auto;
          height: 40px;
          border-bottom: 1px solid @color-green;
          font-size: @font-size-medium;
          background-color: @color-F0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
        p:last-child {
          width: 80%;
          font-size: @font-size-large;
          height: 40px;
          border-radius: 5%;
          border: 1px solid @color-background-d;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .LxKf-bottom-right1 {
        flex: 1;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-smiling {
          font-size: @font-size-large-xxxxxxxx
        }

      }
      .LxKf-bottom-right2 {
        flex: 1.5;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        p{
          width: 90%;
          height: 40px;
          background-color: @color-green;
          color: @color-white;
          border-radius: 10%;
          text-align: center;
          line-height: 40px;
          font-size: @font-size-medium-x;
        }
        .icon-jiahao{
          font-size: @font-size-large-xxxxxxxx;
        }

      }
    }
    .LxKf-FJ{
      max-width: 640px;
      width: 100%;
      position: fixed;
      bottom: 0;
      height: 150px;
      z-index: 99;
      .wxFace{
        width: 100%;
        height: 100%;
      }
      .WXFj{
        width: 100%;
        height: 100%;
        background-color: @color-F0;
        div{
          float: left;
          width: 25%;
          height: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .icon-xiangce1{
            display: block;
            width: 45px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 15%;
            background-color: @color-white;
            font-size: @font-size-large-xxx;
            margin-bottom: 5px;

          }
          .icon-xiangji{
            display: block;
            width: 45px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 15%;
            background-color: @color-white;
            font-size: @font-size-large-xxxx;
            margin-bottom: 5px;

          }
          .icon-dizhi{
            display: block;
            width: 45px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 15%;
            background-color: @color-white;
            font-size: @font-size-large-xxxx;
            margin-bottom: 5px;

          }
          .icon-icon-test1{
            display: block;
            width: 45px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 15%;
            background-color: @color-white;
            font-size: @font-size-large-xxxx;
            margin-bottom: 5px;
          }
          .icon-ai01{
            display: block;
            width: 45px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 15%;
            background-color: @color-white;
            font-size: @font-size-large-xxxx;
            margin-bottom: 5px;
          }
          .icon-solid-person{
            display: block;
            width: 45px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 15%;
            background-color: @color-white;
            font-size: @font-size-large-xxxx;
            margin-bottom: 5px;
          }
          .icon-favorite{
            display: block;
            width: 45px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 15%;
            background-color: @color-white;
            font-size: @font-size-large-xxxx;
            margin-bottom: 5px;
          }
          .icon-shipin{
            display: block;
            width: 45px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 15%;
            background-color: @color-white;
            font-size: @font-size-large-xxxx;
            margin-bottom: 5px;
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
