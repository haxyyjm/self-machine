<template>
  <div class="error">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="errView">
        <img :src="sucImg" alt="支付失败" @click="skip_error">
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
    name: "success",
    data() {
      return {
        isSuc: true,
        sucImg: require("../common/imgs/zferror.png")
      }
    },
    created: function () {
      // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：
      // 数据观测(data observer)，属性和方法的运算， watch/event 事件回调。
      // 然而，挂载阶段还没开始，$el 属性目前不可见。
      let that = this;
      that.start();
    },
    methods: {
      /**
       * @del_orde_list 支付失败删除订单
       */
      del_orde_list() {
        let that = this
        that.$axios({
          method: 'post',
          url: that.api.api_bill + '/v1/checkin/remove_master_all/',
          data: {
            order_no: sessionStorage.getItem('orde_list')
          }
        }).then((res) => {
          console.info(res)
        }).catch((err) => {
          console.error(err)
        })
      },
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
      // 组件的方法
      /**点击失败图片*/
      skip_error() {
        let that = this;
        that.del_orde_list()
        that.$router.push('/')
      },
      start: function () {
        let that = this
        setTimeout(function () {
          that.del_orde_list()
          that.$router.push('/')
        }, 3000);
      }
    }
  }
</script>

<style lang="less" scoped>
  .error {
    width: 1080px;
    height: 1920px;
    background: #fff url(../common/imgs/juxing.png) no-repeat center;
    position: relative;

    .masking {
      width: 1080px;
      height: 1920px;
      background: rgba(7, 13, 32, 0.9);

      .return {
        overflow: hidden;
      }

      .cinIdCard {
        width: 800px;
        margin: auto;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-top: 96px;

        .cardScanView {
          margin: 50px 0;
          padding: 40px 0;
          background: #000;
          height: 500px;

          .IdCardView {
            width: 570px;
            height: 358px;
            margin: 0 auto 40px auto;
            /* border: 1px red solid; */
          }

          .loadMsg {
            color: #ffffff;
          }
        }
      }

      .errView {
        width: 600px;
        margin: auto;
        color: #ffffff;
        margin-top: 142px;

        img {
          width: 100%;
        }
      }
    }
  }
</style>
