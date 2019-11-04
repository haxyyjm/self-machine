<template>
  <div class="cin-scan-face">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="cinScanFace">
        <!-- 扫描加背景区域 -->
        <div class="faceScanView">
          <p>{{ msg }}</p>
          <div class="faceView">
            <img :src="isRight ? ScanRightImg:ScanWrongImg" alt="">
          </div>
          <p class="loadMsg">{{ loadMsg}}</p>
        </div>
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
    name: "cin-scan-face",
    data(){
      return{
        isRight:true,//判断是否显示正确或者错误的图片
        img_flag : '',
        msg:"人脸识别确认身份",
        loadMsg:"请将人脸正确对准摄像头，进行人脸识别",
        ScanRightImg:require("@/common/imgs/cin/cin-scan-face-right.png"),
        ScanWrongImg:require("@/common/imgs/cin/cin-scan-face-wrong.png"),
        params : {},
        data_obj : {},
        url : this.api.api_bill,
        face_count : 3
      }
    },
    created : function () {
      /**
       * @check_face 获取客人的人脸信息
       */
      this.to_cin_detal();
      //this.close_camera();
      //判断是不是成功
      console.log(sessionStorage.getItem('img_flag'));
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
       * 验证成功以后直接进入到下一个页面
       */
       to_cin_detal(){
         let that = this;
         console.info(sessionStorage.getItem('img_flag'));
         if(sessionStorage.getItem('img_flag') === "success"){
            that.isRight = true;
            this.msg = '比对成功，即将进入入住页面...';
            this.loadMsg = '欢迎入住！'
            //this.handleSpeak('人脸比对成功，即将办理入住');
            setTimeout(function(){
              that.$router.push({path : '/cin-detal'})
            },3000);
            //that.$router.push({path : '/cin-detal'});
         }else{
            that.isRight = false;
            this.msg = '人脸比对失败，请重试!';
           //this.handleSpeak('人脸比对失败，请重试');
            this.loadMsg = '请重新识别！';
            setTimeout(that.$router.push({path : '/cin-face'}),3000);
         }
         console.info('即将进入确认入住页面......');
         //that.$router.push({path : '/cin-detal'})
       },
      /**
       * @close_camera 关闭摄像头
       */
      close_camera(){
        let that = this;
        let card = "close_camera"; //close_camera 打开摄像头
        //ios返回的数据
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data);
          //先将base64格式的文件转为file文件，作为file参数
          if(data){
            //alert('data:' + data);
          }else{
            //that.hintInfo('warning','读取失败');
          }
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb',card, (data) => {
          // 处理返回数据 发送读取身份证读卡器的指令
          if(data === 'true'){
            //that.hintInfo('success','关闭摄像头');
            console.info("关闭摄像头");
            //判断interval 循环是否存在，存在的话直接将计时器删除
          }else{
            console.info('passing...');
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .cin-scan-face {
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

        }
      }
      .cinScanFace{
        width: 800px;
        margin: auto;
        font-size: 26px;
        color: #ffffff;
        margin-top: 176px;
        .faceScanView{
          padding: 35px 0;
          background: #000;
          height: 500px;
          .faceView{
            width: 400px;
            height: 300px;
            margin:34px auto 38px auto;
            background: #ffffff;
            position: relative;
            img{
              width: 92px;
              height: 89px;
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              left: 0;
              margin: auto;
            }
            p{
              color: #ffffff;
            }
          }
        }
      }

    }
  }
</style>
