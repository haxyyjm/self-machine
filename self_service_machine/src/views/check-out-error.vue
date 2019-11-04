<template>
  <div class="check-out-error">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <!--<back-view></back-view>-->
      </div>
      <div class="cutErrView">
        <div class="errImg">
          <img :src="errImg" alt="支付成功">
        </div>
        <p class="cutMsg">退房失败，请到前台办理退房业务！</p>
        <p class="cutCheck">对您造成的困扰我们深感抱歉我们将尽量解决此问题~</p>

      </div>

      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
      <!--底部结束-->
    </div>
  </div>
</template>

<script>
 // const synth = window.speechSynthesis;
  //const msg = new SpeechSynthesisUtterance();
  export default {
    name: "check-out",
    data() {
      return{
        errImg:require("@/common/imgs/cut-fail.png"),
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
          //that.press_camera();
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
  .check-out-error {
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
      .cutErrView{
        color: #ffffff;
        margin-top: 120px;
        .errImg{
          width: 497px;
          margin: auto;

          .errView img{
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
