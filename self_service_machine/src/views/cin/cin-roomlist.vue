<template>
  <div class="cin-orderlist">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <span>请选择您要使用的房间</span>
        <back-view></back-view>
      </div>
      <!--订单列表开始-->
      <div class="indent">
        <div  style="width: 100%;padding-bottom: 50px;font-size: 26px;">
          <div style="height: 90px;width: 100%;color: #777777" class="z-fixed-c">
            <div style="height:100%;width: 40%" class="z-fixed-c">楼层</div>
            <div style="height:100%;width: 40%" class="z-fixed-c">房间号</div>
            <div style="height:100%;width: 20%"></div>
          </div>
          <div style="overflow: scroll;height:520px;" >
          <div v-for="(item,index) in order_list_data" :key="index"
               style="border-radius:4px;
                 font-size:22px;height: 90px;width: 100%;border: 1px solid #CCCCCC;margin-bottom: 10px;"
               class="z-fixed-c"
          >
            <div style="height:100%;width: 40%" class="z-fixed-c">{{item.floor_number}}</div>
            <div style="height:100%;width: 40%" class="z-fixed-c">{{item.room_no}}</div>
            <div style="height:100%;width: 20%;font-size: 26px;" >
              <div style="background: #007BDB;height: 90px;line-height: 90px;color:rgba(255,255,255,1);"
                     @click="checkin_now(item)">立即入住</div>
            </div>
          </div>
          </div>
        </div>
      </div>
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
    name: "cin-roomlist",
    data() {
      return {
        //请求的url
        url : this.api.api_price + '/v1/room/machine/can_live_room_list/',
        //可用房间列表
        order_list_data:[],
      };
    },
    created: function() {
      let that = this;
      /**
       * 获取到当前房型下的可用的房间
       */
      that.close_camera();
      console.info(sessionStorage.getItem('begin_date'));
      console.info(sessionStorage.getItem('end_date') + ' 14:00:00');
      that.get_room_list();
      //that.handleSpeak('请选择您要入住的房间')
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
      /**
       * @get_room_list 获取可用的房间号
       */
      get_room_list(){
        let that = this;
        that.$axios({
             method: 'post',
             url : that.api.api_zt + 'room/machine/can_live_room_list/',
             data : {
               room_type : sessionStorage.getItem('room_type_code'),
               begin_time : sessionStorage.getItem('begin_date'),
               end_time : sessionStorage.getItem('end_date') + ' 14:00:00' //这里是需要将带有默认下午两点的时间给到后端，这样才可以查出来对应的房间号
             }
        }).then((res)=>{
             console.info(res);
             that.order_list_data = res.data.data.data;
        }).catch((err)=>{
             console.error(err);
        })
      },
      /**
       * @checkin_now  立即入住
       * @param row 当前行的数据
       * no_res 这里的flag是用来判断进入card页面的起始页面吗
       * No reservation
       */
      checkin_now(row){
        let that = this;
        console.info(row);
        sessionStorage.setItem('room_type_name',row.room_type_name); //需要将房型进行缓存，后面的验证客人的信息是需要的。
        sessionStorage.setItem('room_no',row.room_no);//将房间号缓存下来，展示给客人
        sessionStorage.setItem('lock_no',row.lock_no) //将锁号缓存下来
        that.$router.push({name:'/cin-id-card',params:{flag:'no_res'}});
        console.info(row);
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
            that.hintInfo('success','关闭摄像头');
            //判断interval 循环是否存在，存在的话直接将计时器删除
          }else{
            console.info('passing...');
          }
        })
      },
    },

  }
</script>

<style lang="less" scoped>
  .z-fixed-c{
    display:flex;
    align-items:center;
    justify-content:center;
  }
  /*隐藏滚动条*/
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    -webkit-overflow-scrolling: touch;
  }
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
  .cin-orderlist {
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
          margin-left: -84px;
        }
      }
      .indent{
        width:1000px;
        height:600px;
        overflow:auto;
        background:rgba(15,15,15,1);
        margin: auto;
        margin-top: 69px;
        color: white;
        .title{
          padding-top: 48px;
          font-size:20px;
          span{
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
        }
        .indent-select {
          width: 900px;
          height: 460px;
          margin: auto;
          margin-top: 20px;
          li {
            margin-top: 20px;

            .select-bt {
              width: 100%;
              height: 100px;
              display: flex;
              .genre {
                width: 750px;
                height: 100px;
                background: #F8F8F8;
                flex-grow: 1;
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
                ul {
                  display: flex;
                  li {
                    flex-grow: 1;
                    font-size: 22px;
                    line-height: 100px;
                    margin-left: 40px;
                    margin-top: 0;
                  }
                  li:nth-child(1) {
                    font-size: 16px;
                    padding-left: 15px;
                    margin: 0;
                    width: 125px;
                    text-align: center;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                  }
                }

              }
              .select-details {
                width: 150px;
                height: 100px;
                background: rgba(0, 123, 219, 1);
                flex-grow: 1;
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
                font-size: 26px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                line-height: 100px;
              }
            }
          }
        }
      }

    }
  }


</style>
