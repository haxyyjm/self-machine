<template>
  <div class="cin-face">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <back-view></back-view>
      </div>
      <div class="cinFace">
        <!-- 扫描加背景区域 -->
        <div class="faceScanView">
          <!--<p>{{ msg }}{{seconds_timeout + "s"}}</p>-->
          <div class="faceView">
            <img :src="FaceImg" alt="">
          </div>
          <p class="loadMsg">{{ loadMsg}}</p>
        </div>
      </div>
      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
<!--      <el-button type="primary" @click="press_camera()">拍照</el-button>-->
      <!--底部结束-->
    </div>
  </div>
</template>

<script>
  //const synth = window.speechSynthesis;
  //const msg = new SpeechSynthesisUtterance();
  import WebViewJavascriptBridge from '@/assets/JsBridge/WebViewJavascriptBridge';
  import {instance} from '../../common/js/instance'
  export default {
    name: "cin-face",
    data(){
      return{
        seconds_timeout : 2,
        time : '',
        msg:"即将拍照，请对准摄像头",
        loadMsg:"请将人脸正确对准摄像头，进行人脸识别",
        FaceImg:require("@/common/imgs/cin/face.gif"),

      }
    },
    created() {
      let that = this;
       //直接进行人脸识别
      //that.face_recognition();
      setTimeout(that.face_recognition,1000);
      //setTimeout(that.press_camera,10000);
      that.time = setInterval(that.remain_sec,1000);
    },
    methods : {
      /**
       * @remain_sec 进行秒数自减的操作
       */
      remain_sec(){
        let that = this;
        if(that.seconds_timeout === 1){
           that.press_camera();
           clearInterval(that.time);
          //that.$router.push({path:'/'});
        }else{
          that.seconds_timeout--;
        }
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
       * @dataURLtoBlob 转文件格式
       */
      dataURLtoBlob : function(dataurl) {
        let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while(n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
          type: mime
        });
      },
      /**
       * @param {Object} theBlob 文件
       * @param {Object} fileName 文件名字
       */
      blobToFile : function(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
      },
      /**
       * @face_recognition 调取摄像头
       */
      face_recognition(){
        let that = this;
        let card = "open_camera"; //open_camera 打开摄像头
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
          if(data === 'true'){
            //that.handleSpeak('请对准摄像头')
            //that.hintInfo('success','打开摄像头');
            //that.$router.push({path:'/cin-scan-face'});
          }else{
            //that.handleSpeak('摄像头打开失败，请重试');
            //that.hintInfo('warning','打开摄像头失败');
            console.info('passing...');
          }
        })
      },
      /**
       * @press_camera 拍照
       */
      press_camera(){
        let that = this;
        console.info('passing take-picture');
        let card = "take_picture"; //take_picture 代表的是拍照
        //ios返回的数据
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data);
          console.info(JSON.stringify(data));
          //先将base64格式的文件转为file文件，作为file参数  如果拿到照片并且上传成功以后直接关闭
          if(data){
              let blob = that.dataURLtoBlob(data);
              let file = that.blobToFile(blob, "imgName");
              let fd = new FormData();
              fd.append("upfile", file,"image.png");
              let config = {headers: {'Content-Type': 'multipart/form-data'}};
              let url = 'https://image.eloadspider.com/resource/employee/head_image/upload';
              that.$axios.post(url,fd,config).then(res=>{
                console.info(JSON.stringify(res));
                if(res.data.id != null){
                  //that.hintInfo('success','人脸上传成功');
                  //将身份证照片拿到
                  that.card_imgUrl = 'https://image.eloadspider.com/' + JSON.parse(JSON.stringify(res)).data.url;
                  //将拍到的照片拿到混存下来
                  sessionStorage.setItem('face_photo',that.card_imgUrl);
                  console.info(sessionStorage.getItem("card_photo"));
                  console.info(sessionStorage.getItem("face_photo"));
                  //进行人脸比对
                  that.$axios({
                      method : 'post',
                      url : 'https://sms.eloadspider.com/v1/authentication/ht/rf/auth_one_to_one/',
                      data : {
                        image_url1 : sessionStorage.getItem('card_photo'),
                        image_url2 : sessionStorage.getItem('face_photo')
                      }
                  }).then((res)=>{
                    console.info(JSON.stringify(res));
                    if(res.data.message === 'success'){
                      //如果成功 直接将调取比对成功的界面
                        console.info(JSON.stringify(res));
                      //sessionStorage.setItem('img_flag',true);
                      if(res.data.data.result === 'success'){
                        sessionStorage.setItem('img_flag','success');
                        //that.$router.push({path : '/cin-scan-face'});
                        that.$router.push({path : '/cin-detal'}) //直接到详情的页面
                      }else{
                        instance('识别失败，请重试')
                        //that.hintInfo('warning','识别失败，请重试')
                        sessionStorage.setItem('img_flag','error');
                        location.reload()
                        //that.$router.push({path : '/cin-scan-face'});
                      }
                    }else{
                      console.info('人脸识别接口调用失败');
                    }
                  }).catch((err)=>{
                     //sessionStorage.setItem('img_flag',false);
                     that.$router.push({path : '/cin-scan-face'});
                     console.error(err);
                  })
                }else{
                      console.info('passing cin-sacn-info');
                      sessionStorage.setItem('img_flag','error');
                      that.$router.push({path : '/cin-scan-face'});
                }
              }).catch((err)=>{
                 console.error(err);
                 //that.handleSpeak('照片上传失败，请重试');
                 //that.hintInfo('warning','人脸上传失败！');
              })
          }else{
            // sessionStorage.setItem('img_flag',false);
            // that.$router.push({path : '/cin-scan-face'});
            //that.handleSpeak('照片读取失败，请重试！');
            //that.hintInfo('warning','照片读取失败');
          }
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb',card, (data) => {
          // 处理返回数据 发送读取身份证读卡器的指令
          if(data === 'true'){
            //判断interval 循环是否存在，存在的话直接将计时器删除
            //that.hintInfo('success','拍照成功！');
          }else{

            console.info('passing...');
          }
        })
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
            //判断interval 循环是否存在，存在的话直接将计时器删除
          }else{
            console.info('passing...');
          }
        })
      },
      /**
       * @hintInfo 操作提示信息
       * @param success  成功提示
       * @param warning 警告信息
       * @info 需要提示的信息
       */
      hintInfo : function(hint,info){
        let that = this;
        if(hint === "success"){
          that.$message({
            message: info,
            type: 'success'
          });
        }else if(hint === "warning"){
          that.$message({
            message: info,
            type: 'warning'
          });
        }else{
          this.$message.error('出错了！');
        }
      },
    },
    destroyed() {
      let that = this;
      clearInterval(that.time);
      that.close_camera();
    }
  }
</script>

<style lang="less" scoped>
  .cin-face {
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
      }
      .cinFace{
        width: 800px;
        margin: auto;
        margin-top: 177px;
        border: 1px #FFFFFF solid;
        font-size: 26px;
        color: #ffffff;
        .faceScanView{
          padding: 35px 0;
          //background: #000;
          height: 500px;
          .faceView{
            width: 400px;
            height: 300px;
            margin:34px auto 38px auto;
            img{
              width: 100%;
              height: auto;
            }
          }
          .loadMsg{
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
