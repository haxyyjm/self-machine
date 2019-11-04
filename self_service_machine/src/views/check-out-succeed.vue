<template>
  <div class="check-out">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <!--<back-view></back-view>-->
      </div>
      <!--中间部分开始-->
      <div class="cutSucView">
        <div class="sucImg">
          <img :src="sucImg" alt="支付成功">
        </div>
        <p class="cutMsg">退房成功，期待您的下次光临！</p>
        <p class="cutCheck">退房信息将稍后为您发送到手机上，请您注意查收~</p>

      </div>
      <!--订单列表开始-->
      <!--订单列表结束-->

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
    name: "check-out-succeed",
    data(){
      return{
        sucImg:require("@/common/imgs/cut-success.png"),
        seconds_timeout : 3,
        time : '',
      }


    },
    created(){
      let that = this;
      that.time = setInterval(that.remain_sec,1000);
    },
    methods: {
      // 组件的方法
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
       * @remain_sec 进行秒数自减的操作
       */
      remain_sec(){
        let that = this;
        if(that.seconds_timeout === 1){
          clearInterval(that.time);
          that.$router.push({path:'/'});
        }else{
          that.seconds_timeout--;
        }
      },
    },
    destroyed() {
      let that = this;
      clearInterval(that.time);
    }
  }
</script>

<style lang="less" scoped>
  body{
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  *{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }
  .check-out {
    width: 1080px;
    height: 1920px;
    background: #fff url(../common/imgs/juxing.png) no-repeat center;
    position: relative;
    .masking {
      width: 1080px;
      height: 1920px;
      background: rgba(7, 13, 32, 0.9);
      .return{
        overflow: hidden;
        height: 40px;
        span{
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
          margin-left: -84px;
        }
      }
      .cutSucView{
        color: #ffffff;
        margin-top: 120px;
        .sucImg{
          width: 497px;
          margin: auto;

          .sucView img{
            width: 100%;
          }
        }
        .cutMsg{
          font-size: 40px;
          color: #45E0E4;
          margin: 110px 0 38px 0;
        }
        .cutCheck{
          font-size: 30px;
        }
      }

    }
  }


</style>
