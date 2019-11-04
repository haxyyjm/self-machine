<template>
  <div class="invoice">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <home-back></home-back>
      <back-view></back-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <img style="margin-top: 200px;margin-left: -140px;width: 400px;height: auto" src="../../common/imgs/inv/fp.jpg">
      <!--<button @click="make_card">制卡</button>-->
      <!--<p style="font-size: 40px;margin-top: 40px">{{"暂未开放 ~ 程序员正在努力开发中..."}}</p>-->
      <!--fon<p>{{seconds_timeout + "S"}}</p>-->
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
    name: "ext",
    data() {
      return {
        //计时 5秒
        seconds_timeout : 60,
        time : '',
      };
    },
    created: function() {
      let that = this;
      that.time = setInterval(that.remain_sec,1000);
      //that.handleSpeak('功能暂未开放，持续更新中！');
    },
    methods:{
      /**
       * @make_card 制卡
       */
      make_card(){
       let that = this
       console.info('制卡中...')
        let data_obj = {
          "type": "2",
          "data": {
            "startTime": "2019-04-18 09:12:49",
            "endTime": "2020-4-19 12:00:00",
            "lockNo":'512'
          }
        }
       let radom = that.randomString(10)
        //that.handleSpeak('请将身份证件放到读卡器处')
        let card = data_obj; //card是代表调用身份证读卡器  直接发送card
        //ios返回的数据
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data);
          //先将base64格式的文件转为file文件，作为file参数
          if (data) {
              console.info(JSON.stringify(data))
          } else {
            //that.hintInfo('warning', '读取失败');
          }
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb2', card, (data) => {
          // 处理返回数据 发送读取身份证读卡器的指令
          if (data === 'true') {
             console.info('back' + data)
            //判断interval 循环是否存在，存在的话直接将计时器删除
            //that.hintInfo('success',data);
          } else {
             console.info('error_back')
            //setTimeout(that.Get_card_info,3000);
            //that.hintInfo('warning', '请调整身份证摆放位置!');
          }
        })
      },
      /**
       *
       * @param len
       * @returns {string|string}
       */
      randomString(len) {
         　　len = len || 32;
         　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
         　　var maxPos = $chars.length;
         　　var pwd = '';
         　　for (let i = 0; i < len; i++) {
           　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
           　　}
        　　return pwd;
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
      /**
       * @remain_sec 进行秒数自减的操作
       */
      remain_sec(){
        let that = this;
        if(that.seconds_timeout === 1){
          that.$router.push({path:'/'});
        }else{
          that.seconds_timeout--;
        }
      },
    },
    destroyed: function() {
      let that = this;
      clearInterval(that.time);
    }

  }
</script>

<style  lang="less" scoped>
  .invoice {
    width: 1080px;
    height: 1920px;
    background: #fff url(../../common/imgs/juxing.png) no-repeat center;
    position: relative;
    .masking {
      width: 1080px;
      height: 1920px;
      background: rgba(7, 13, 32, 0.9);
      text-align: center;
      color: #FFFFFF;

    }
  }

</style>
