<template>
  <div class="success">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="sucView">
        <img :src="sucImg" alt="支付结果" @clck="skip_success">
      </div>
      <!--<button @click="make_card" style="width: 300px;height: 80px;border: none;border-radius: 10px;font-size: 0.5em;">制卡</button>-->
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
        sucImg: require("../common/imgs/rzsuccess.png"),
        much : '',//居住的天数
        lock_no : '', //门锁
      }
    },
    created(){
      let that = this;
      sessionStorage.getItem('guest_phone'); //获取到手机号
      //this.begin_date = sessionStorage.getItem('begin_date').split(' ')[0];//时间
      this.end_date = sessionStorage.getItem('end_date');//时间
      this.flag = this.$route.query['flag'];
      that.start_send()
      that.del_coupon()
      that.get_lock_no()
    },
    methods: {


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
      /**点击成功图片*/
      skip_success() {
        let that = this;
        that.$axios({
          method : 'post',
          url : 'https://sms.eloadspider.com/v1/authentication/ht/sms/send_message/',
          data : {
            phone_number : sessionStorage.getItem('guest_phone'),
            sign_name:"皇冠晶品酒店服务中心",
            template_code:"SMS_173405844",
            template_param:{
              status:"成功",
              order:sessionStorage.getItem('order_no') ? sessionStorage.getItem('order_no').substring(0, 19) : 'B7664354280974',
              name:sessionStorage.getItem('checkin_name') ? sessionStorage.getItem('checkin_name') : '贵宾' ,
              date:sessionStorage.getItem('begin_date') ? sessionStorage.getItem('begin_date') : '2019-09-20',
              hotel:"皇冠晶品酒店",
              roomtype:sessionStorage.getItem('room_type') ? sessionStorage.getItem('room_type') : '皇冠晶品',
              much:"1",
              day:sessionStorage.getItem('check_in_day') ? sessionStorage.getItem('check_in_day') : '暂未获取',
              money:sessionStorage.getItem('day_price') ? sessionStorage.getItem('day_price') : '¥',
              adress:"上海市浦东新区人民东路2635弄105号",
              tel:'4001600703'
            }
          }
        }).then((res)=>{
          console.info(res);
        }).catch((err)=>{
          console.error(err);
        })
        that.del_coupon()
        that.$router.push('/make-card')
      },
      start_send: function () {
        let that = this;
        setTimeout(function () {
          that.$axios({
            method : 'post',
            url : 'https://sms.eloadspider.com/v1/authentication/ht/sms/send_message/',
            data : {
              phone_number : sessionStorage.getItem('guest_phone'),
              sign_name:"皇冠晶品酒店服务中心",
              template_code:"SMS_173405844",
              template_param:{
                status:"成功",
                order:sessionStorage.getItem('order_no') ? sessionStorage.getItem('order_no').substring(0, 19) : 'B7664354280974',
                name:sessionStorage.getItem('checkin_name') ? sessionStorage.getItem('checkin_name') : '贵宾' ,
                date:sessionStorage.getItem('begin_date') ? sessionStorage.getItem('begin_date') : '2019-09-20',
                hotel:"科冠晶品酒店",
                roomtype:sessionStorage.getItem('room_type') ? sessionStorage.getItem('room_type') : '科冠晶品',
                much:"1",
                day:sessionStorage.getItem('check_in_day') ? sessionStorage.getItem('check_in_day') : '暂未获取',
                money:sessionStorage.getItem('day_price') ? sessionStorage.getItem('day_price') : '¥',
                adress:"上海市浦东新区人民东路2635弄105号",
                tel:'4001600703'
              }
            }
          }).then((res)=>{
            console.info(res);
          }).catch((err)=>{
            console.error(err);
          })
          that.$router.push('/make-card')
        }, 3000);
      },
      del_coupon : function () {
        let that = this
        setTimeout(function () {
          if(sessionStorage.getItem('coupon_id')){
            that.$axios({
              method : 'post',
              url : that.api.api_price + '/v1/customer/coupon/update_coupon_detail/id='+ sessionStorage.getItem('coupon_id'),
              data : {
                sta : 'O',
                use_sta : 'U'
              }
            }).then((res)=>{
              console.info(res)
            }).catch((err)=>{
              console.error(err)
            })
          }else{

          }
        },3000)
      }
    },
  }
</script>

<style lang="less" scoped>
  .success {
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

      .sucView {
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
