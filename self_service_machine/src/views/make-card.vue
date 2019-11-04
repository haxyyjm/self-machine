<template>
  <div class="invoice">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <home-back></home-back>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div
        style="width: 600px;height: 450px;background: #FFFFFF;position: absolute;top: 50%;left: 23%;border-radius: 10px">
        <img style="margin-top: 150px;width: 300px;height: auto" src="../common/imgs/card.png">
      </div>
      <!--<button @click="make_card">制卡</button>-->
      <p style="font-size: 40px;margin-top: 640px">{{"正在为您制作房卡中,请稍后..."}}</p>
      <!--fon<p>{{seconds_timeout + "S"}}</p>-->
      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
      <!--底部结束-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "make-card",
    data() {
      return {
        lock_no: '', //门锁
        data_pre: '', //当前时间
      }
    },
    created() {
      let that = this
      that.get_lock_no()
      //let myDate = new Date();
      that.data_pre = that.getFormatDate() //myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
      console.log(that.data_pre);
      setTimeout(function () {
        that.go_main()
      }, 5000)
    },
    methods: {
      /**
       * @getFormatDate 获取当前时间
       */
      getFormatDate() {
        var date = new Date();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var minte = date.getMinutes();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (minte >= 1 && minte <= 9) {
          minte = "0" + minte;
        }
        var currentDate = date.getFullYear() + "-" + month + "-" + strDate
          + " " + date.getHours() + ":" + minte + ":" + date.getSeconds();
        return currentDate;
      },
      go_main() {
        this.$router.push({path: '/'})
      },
      /**
       * @get_lock_no 获取门锁
       */
      get_lock_no() {
        let that = this
        that.$axios({
          method: 'get',
          url: that.api.api_price + '/v1/room/room_status/get_room_map_list/',
          params: {
            room_no: sessionStorage.getItem('room_no') ? sessionStorage.getItem('room_no') : ''
          }
        }).then((res) => {
          console.info(res)
          if (res.data.data.results.length > 0) {
            that.lock_no = res.data.data.results[0].lock_no
          } else {
            console.info("未获取到房间号")
          }
          that.make_card()
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @make_card 制卡
       */
      make_card() {
        let that = this
        console.info('制卡中...')
        let data_obj = {
          "type": "1", //1 的时候是写卡   2  的时候是读卡
          "data": {
            "startTime": that.data_pre,//sessionStorage.getItem('begin_date'),
            "endTime": sessionStorage.getItem('end_date') + ' 14:00:00',
            "lockNo": that.lock_no
          }
        }
        //that.handleSpeak('请将身份证件放到读卡器处')
        let card = data_obj; //card是代表调用身份证读卡器  直接发送card
        //ios返回的数据
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data);
          //先将base64格式的文件转为file文件，作为file参数
          if (data) {

          } else {
            //that.hintInfo('warning', '读取失败');
          }
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb2', card, (data) => {
          // 处理返回数据 发送读取身份证读卡器的指令
          if (data === 'true') {
            //判断interval 循环是否存在，存在的话直接将计时器删除
            //that.hintInfo('success',data);
          } else {
            //setTimeout(that.Get_card_info,3000);
            //that.hintInfo('warning', '请调整身份证摆放位置!');
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .invoice {
    width: 1080px;
    height: 1920px;
    background: #fff url(../common/imgs/juxing.png) no-repeat center;
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
