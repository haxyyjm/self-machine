<template>
  <div class="invoice">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <home-back></home-back>
      <back-view></back-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div style="width: 600px;height: 450px;background: #FFFFFF;position: absolute;top: 50%;left: 23%;border-radius: 10px">
        <img style="margin-top: 150px;width: 300px;height: auto" src="../common/imgs/readcard.png">
      </div>
      <!--<button @click="read_card">制卡</button>-->
      <p style="font-size: 40px;margin-top: 640px">{{"请插入您的房卡为您读取信息，请稍后..."}}</p>
      <!--fon<p>{{seconds_timeout + "S"}}</p>-->
      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
      <!--底部结束-->
    </div>
  </div>
</template>

<script>
  import { showLoading, hideLoading } from '../assets/js/loading';
  import {instance} from '../common/js/instance'
  export default {
    name: "read-card",
    data(){
      return {
        lock_no : '', //门锁,
        flag : ''
      }
    },
    created() {
      let that = this
      that.read_card() //读卡
      that.flag = that.$route.params['flag'] ? that.$route.params['flag'] : sessionStorage.getItem('option_flag');
      console.info(that.flag)
      sessionStorage.setItem('flag_back',that.flag)
      //setTimeout(function () {that.go_main()},5000)
    },
    methods:{
      go_main(){
        this.$router.push({path : '/'})
      },
      /**
       * @read_card 读卡
       */
      read_card(){
        let that = this
        showLoading()
        let data_obj = {
          "type": "2", //1 的时候是写卡   2  的时候是读卡
          "data": {
            "startTime": sessionStorage.getItem('begin_date') ? sessionStorage.getItem('begin_date') : '',
            "endTime": sessionStorage.getItem('end_date') + ' 14:00:00' ? sessionStorage.getItem('end_date') + ' 14:00:00' : '',
            "lockNo":that.lock_no ? that.lock_no : null
          }
        }
        //that.handleSpeak('请将身份证件放到读卡器处')
        let card = data_obj; //card是代表调用身份证读卡器  直接发送card
        //ios返回的数据
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data)
          //先将base64格式的文件转为file文件，作为file参数
          if (data) {
            if(JSON.parse(data).result === true){
              let lockNo = JSON.parse(data).data.lockNo;
              //alert(lockNo.length)
              if(lockNo.length === 13){
                let lock_no = lockNo.split('.')[0].substring(2) + '.' + lockNo.split('.')[1].substring(2) + '.'  + lockNo.split('.')[2].substring(1)
                that.get_order_no(lock_no)
              }else{
                instance('门锁格式错误')
                that.reback_card()
                that.$router.push('/')
              }
            }else{
              //console.info('返回错误')
              instance('返回错误')
            }
          } else {
            instance('发送失败')
            //that.hintInfo('warning', '读取失败');
          }
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb2', card, (data) => {
          // 处理返回数据 发送读取身份证读卡器的指令
          if (data === 'true') {
            hideLoading()
          } else {

          }
        })
      },
      /**
       * @get_order_no 获取单号
       */
      get_order_no(lock_no){
        let that = this
        //instance(lock_no)
        that.$axios({
          method: 'get',
          url: that.api.api_bill + '/v1/checkin/all_master_info_order/?lock_number='+lock_no+'&master_status_lable=0',
        }).then((res) => {
          console.info(JSON.stringify(res))
          if (res.data.data.count > 0) {
            if(that.flag === 'cut'){
              //退房
              //将获取到的在住信息拿到，缓存下来，在下一个页面展示出来。 ext-sel-info
              sessionStorage.setItem('fix_rate', res.data.data.results[0].fix_rate);//房价
              sessionStorage.setItem('room_type', res.data.data.results[0].room_type);//房型
              sessionStorage.setItem('master_guest', res.data.data.results[0].master_guest.length);//入住人数
              sessionStorage.setItem('arr_time', res.data.data.results[0].arr_time.split(' ')[0]); //到达时间
              sessionStorage.setItem('leave_time', res.data.data.results[0].leave_time.split(' ')[0]); //离开时间
              sessionStorage.setItem('leave_time_submit', res.data.data.results[0].leave_time);
              sessionStorage.setItem('room_number', res.data.data.results[0].room_number);//房间号
              sessionStorage.setItem('account_id', res.data.data.results[0].account_id);
              let names = [];
              for (let i in res.data.data.results[0].master_guest) {
                names.push(res.data.data.results[0].master_guest[i].name);
              }
              sessionStorage.setItem('names', names);//房间在住人数
              that.get_info_pms(sessionStorage.getItem('account_id'));
            }else{
              //续住
              sessionStorage.setItem('rate_code',res.data.data.results[0].rate_code);//房价码
              sessionStorage.setItem('fix_rate', res.data.data.results[0].fix_rate);//房价
              sessionStorage.setItem('zzj_account_id',res.data.data.results[0].account_id);//主帐ID
              sessionStorage.setItem('room_type', res.data.data.results[0].room_type);//房型
              sessionStorage.setItem('room_type_code', res.data.data.results[0].code_name);//房型code
              sessionStorage.setItem('master_guest', res.data.data.results[0].master_guest.length);//入住人数
              sessionStorage.setItem('arr_time', res.data.data.results[0].arr_time.split(' ')[0]); //到达时间
              sessionStorage.setItem('leave_time', res.data.data.results[0].leave_time.split(' ')[0]); //离开时间
              sessionStorage.setItem('leave_time_submit', res.data.data.results[0].leave_time);
              sessionStorage.setItem('room_number', res.data.data.results[0].room_number);//房间号
              let names = [];
              for (let i in res.data.data.results[0].master_guest) {
                names.push(res.data.data.results[0].master_guest[i].name);
              }
              sessionStorage.setItem('names', names);//房间号
              that.$router.push('/ext-sel-info');
            }
          } else {
            instance('没有入住信息')
            that.reback_card()
            that.$router.push('/');
            //that.hintInfo('warning', '查询失败')
          }
        }).catch((err) => {
          console.info(JSON.stringify(err));
        })
      },
      /**
       * 退卡
       */
      reback_card(){
        let that = this
        console.info('读卡中...')
        let data_obj = {
          "type": "4", //1 的时候是写卡   2  的时候是读卡 3成功   4 失败
          "data": {
            "startTime": sessionStorage.getItem('begin_date') ? sessionStorage.getItem('begin_date') : '',
            "endTime": sessionStorage.getItem('end_date') + ' 14:00:00' ? sessionStorage.getItem('end_date') + ' 14:00:00' : '',
            "lockNo":that.lock_no ? that.lock_no : null
          }
        }
        //that.handleSpeak('请将身份证件放到读卡器处')
        let card = data_obj; //card是代表调用身份证读卡器  直接发送card
        //ios返回的数据
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data)
          //先将base64格式的文件转为file文件，作为file参数
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb2', card, (data) => {
          // 处理返回数据 发送读取身份证读卡器的指令
        })
      },
      get_info_pms(account_id) {
        let that = this;
        let url = that.api.api_9022 + '/v1/finance/account/get_info_pms/' + account_id;
        that.$axios({
          method: 'get',
          url: url,
          params: {
            with_collections: 1,
            related_objects: 1
          }
        }).then((res) => {
          console.info(JSON.stringify(res));
          if (res.data.message === 'success') {
            sessionStorage.setItem('balance', res.data.data.balance);
            that.$router.push('/cut-rooms-info');
          } else {
            instance('查询账务失败')
            //that.hintInfo('warning', '查询账务失败');
          }
        }).catch((err) => {
          console.info(err);
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
