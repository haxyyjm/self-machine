<template>
  <div class="cin-checkin">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <span>请选择查询方式</span>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="cin-inquire">
        <ul>
          <li class="listItem">
            <button @click="phone_search">
              手机号查询
            </button>
            <button @click="qrcode_search">
              二维码查询
            </button>
          </li>
        </ul>
      </div>
      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
      <!--底部结束-->
    </div>
  </div>
</template>

<script>
  //const synth = window.speechSynthesis;
  //const msg = new SpeechSynthesisUtterance();
  export default {
    name: "cin-team_type",
    data(){
      return{

      }
    },
    created(){
      //this.handleSpeak('请选择会员查询方式');
    },
    methods : {
      /**
       * 语音播报
       */
      // handleSpeak(e) {
      //   msg.text = e;
      //   msg.lang = 'zh-CN';
      //   msg.volume = '1';
      //   msg.rate = 1;
      //   msg.pitch = 1;
      //   synth.speak(msg);
      // },
      /**
       * @phone_search 根据手机号查询会员信息
       */
      phone_search(){
       this.$router.push({path:"/cin-member-phone"});
      },
      /**
       * @qrcode_search 根据二维码查询会员信息
       */
      qrcode_search(){
        this.$router.push({name:"/cin-qrcode-member",params:{qrcode_flag:'member'}});//{name:'/cin-team-type',params:{flag:'member'}}
      }
    }
  }
</script>

<style lang="less" scoped>
  .cin-checkin {
    width: 1080px;
    height: 1920px;
    background: #fff url(../../common/imgs/juxing.png) no-repeat center;
    position: relative;
    .masking {
      width: 1080px;
      height: 1920px;
      background: rgba(7, 13, 32, 0.9);
      .return{
        overflow: hidden;
        height: 40px;
        margin-bottom: 132px;
        span{
          width: 600px;
          height:30px;
          font-size:32px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:24px;
          display: inline-block;
          margin: auto;
          vertical-align: top;
          margin-top: 10px ;
          margin-left: -88px;
        }
      }
      .cin-inquire{
        ul{
          margin: auto;
          width: 600px;
          li{
            margin: 40px 0;
            cursor: pointer;
            .listImg{
              width: 600px;
              height: 200px;
              img{
                width: 100%;
              }
            }
          }
        }
        .listItem{
          button{
            border: none;
            background: #00afeb;
            color: #FFFFFF;
            font-size: xx-large;
            height: 199px;
            width: 600px;
            border-radius: 10px;
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>
