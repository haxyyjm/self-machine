<template>
  <div class="cin-id-card">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="cinIdCard">
        <p>{{ msg }}</p>
        <!-- 扫描加背景区域 -->
        <div class="cardScanView">
          <div class="IdCardView">
            <img :src="IdCardImg" alt="">
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
  import {instance} from '../../common/js/instance'
  export default {
    name: "cin-id-card",
    data() {
      return {
        card_imgUrl: '',//身份证的照片
        send_count: 0,//发送计数，
        msg: "请在【身份证感应区】放置【居民二代身份证】",
        loadMsg: "在读取过程中，请放好您的身份证",
        IdCardImg: require("@/common/imgs/cin/cin-id-card-bg.png"),
        card: true,
        is_living: '',//判断是否在住
        card_list_info: '',
        params: {},
        url: '',
        flag: '',
        guest_infos: '',//用户身份证信息
        card_info_list: [{}],//入住人
        //公共的请求参数
        data_obj: {},
        //有预定-入住的特有的参数
        data_cin: {},
        //续住的特有的参数
        data_ext: {},
        //退房的特有的参数
        data_cut: {},
        //无预定-身份证入住
        data_no_res: {},
        //是否在住
        data_in_live: {},
        //展示预定单信息
        data_arr: {},
        //房间号 这里是根据硬件扫描出来的客人信息拿到的
        RoomNo: '',
        order_no: '',//订单号
        //身份证信息-测试使用
        GuestList: {
          idcardno : '110101199003078232',
          Result: true,
          Msg: "读贵宾身份证信息成功",
          Id: "3192B75680089AB6",
          Name: '魏雷鸣',
          Sex: '男',
          Nation: '',
          Birthday: '',
          Address: '河南省周口市鹿邑县杨户口乡',
          Code: '412725199408287039',
          IdBeiginTime: "20130530",
          IdEndTime: "20230530",
          ExpirationDate: "2013.05.30-2023.05.30",
          photo: '',
          CameraPhoto: null,
          FaceResult: 0,
          Semblance: null,
          Police: null,
          GuestNo: null,
          GuestId: null,
          GuestStatus: 0
        },
      }

    },
    created: function () {
      let that = this;
      that.flag = that.$route.params['flag']; //现需要判断是从哪一个页面进到当前的身份证识别的页面的。
      console.info(that.flag);
      that.close_camera();
      /**
       * @Get_card_info 获取客人的身份证信息 这里的是调取硬件的接口 直接获取到身份证的所有信息  将信息拿到以后直接作为参数传递查询当前身份的会员信息
       */
      //this.Get_card_info();
      this.check_card_info(); //假数据测试使用
    },
    methods: {
      /**
       * @dataURLtoBlob 转文件格式
       */
      dataURLtoBlob: function (dataurl) {
        let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
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
      blobToFile: function (theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
      },
      /**
       * @constructor 获取硬件的返回参数
       * @return {string}
       */
      Get_card_info() {
        let that = this;
        let card = "card"; //card是代表调用身份证读卡器  直接发送card
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data);
          //先将base64格式的文件转为file文件，作为file参数
          if (data) {
            var arr = [];
            arr.push(JSON.parse(data));
            that.GuestList = arr.map((resp) => {
              console.info(JSON.stringify(resp));
              sessionStorage.setItem('checkin_name', resp.name);//入住人姓名
              sessionStorage.setItem('idcardno', resp.idcardno);//身份证号
              sessionStorage.setItem('sex', resp.sex);//性别
              return {
                Result: true,
                Msg: "读贵宾身份证信息成功",
                Id: "3192B75680089AB6",
                Name: resp.name,
                Sex: resp.sex,
                Nation: resp.nation,
                Birthday: resp.birthday,
                Address: resp.address,
                Code: resp.idcardno,
                IdBeiginTime: "20130530",
                IdEndTime: "20230530",
                ExpirationDate: "2013.05.30-2023.05.30",
                photo: resp.ptoto,
                CameraPhoto: null,
                FaceResult: 0,
                Semblance: null,
                Police: null,
                GuestNo: null,
                GuestId: null,
                GuestStatus: 0
              }
            });
            //GuestList 就是用来测试是不是会员的
            if (JSON.parse(data).photo.split(",")[1] !== null) {
              let blob = that.dataURLtoBlob(JSON.parse(data).photo);
              let file = that.blobToFile(blob, "imgName");
              let fd = new FormData();
              fd.append("upfile", file, "image.png");
              let config = {headers: {'Content-Type': 'multipart/form-data'}};
              let url = 'https://image.eloadspider.com/resource/employee/head_image/upload';
              that.$axios.post(url, fd, config).then(res => {
                if (res.data.id != null) {
                  console.info("身份证上传成功！");
                  that.close_card();
                  that.card_imgUrl = 'https://image.eloadspider.com/' + JSON.parse(JSON.stringify(res)).data.url;
                  console.info(that.card_imgUrl);
                  sessionStorage.setItem('card_photo', that.card_imgUrl);
                  that.check_card_info(data); //这里的数据需要格式化的，格式是错的 这里只需要将身份号拿到
                }
              }).catch((err) => {
                instance('身份证上传失败')
              })
            } else {
              console.info("获取身份证失败")
              instance('获取身份证为null')
            }
          } else {
            instance('读取失败')
          }
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb', card, (data) => {
          if (data === 'true') {
          } else {
            instance('请调整身份证摆放位置')
          }
        })
      },
      /**
       * @check_card_info 根据身份证号查询订单
       * @param GuestList
       */
      check_card_info() {
        let that = this;
        if (that.flag === 'cin') {
          /**
           * 查询是否在住  这是有预定入住的流程
           * 根据身份证查询订单
           */
          that.$axios({
            method: 'post',
            url: that.api.api_bill + '/v1/machine/booking/get_all_reserve_info/',
            data: {
              search_type: "3",
              id_no: JSON.parse(GuestList).idcardno //这里是身份证号
            }
          }).then((res) => {
            console.info(JSON.stringify(res));
            if (res.data.data.results) {
                instance('查询成功')
              //that.hintInfo('success', '查询成功！');
              /**
               * 将查询到的参数进行缓存，需要缓存的是预定信息
               * that.room_type = sessionStorage.getItem('room_type');
               that.day_price = sessionStorage.getItem('day_price');
               that.room_no = sessionStorage.getItem('room_no');
               that.begin_date = sessionStorage.getItem('begin_date').split(' ')[0];
               that.end_date = sessionStorage.getItem('end_date');
               that.room_type_name = sessionStorage.getItem('room_type_name');
               */
              sessionStorage.setItem('results', JSON.stringify(res.data.data.results));  //这里如果查询出来了信息。直接缓存下来，展示到下一个信息展示的界面，cin-orderlist
              that.$router.push({name: '/cin-orderlist', params: {flag: 'prev_order'}});// 有预定信息
            } else {
              //如果没有预定信息的时候直接提示不存在用户信息
              instance(res.data.data.result)
              //that.hintInfo('warning', res.data.data.result);
            }
          }).catch((err) => {
            console.error(err);
          })
        } else if (that.flag === 'no_res') {
          console.info("to no_res");
          /**
           * res.data.data.result === 'fail' 说明客人不在住的，是可以直接进行入住的
           * else 说明客人是在住的，不可以办理当前酒店的入住业务
           */
          let that = this;
          let url = that.api.api_zt + 'machine/checkin/is_checkin_info/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              id_no: that.GuestList.idcardno //身份证号
            }
          }).then((res) => {
            /**
             * 客人可以办理入住  查询一下是不是会员，如果是会员  需要将新的会员价格拿到
             * else 不是会员  直接拿到的是散客的价格
             */
            if (res.data.data.result === 'fail') {
              //that.$router.push({path: '/cin-face'}); //这里不做是不是会员的判断，会员统一走扫码和输入手机号
              that.$router.push({path: '/cin-detal'});//测试，这里不走人脸识别，直接进行入住
              sessionStorage.setItem('checkin_name',that.GuestList.Name) //测试，姓名是需要在身份证读卡器读取以后才可以缓存的，这里测试是写死的
              sessionStorage.setItem('idcardno', that.GuestList.idcardno); //测试，
              sessionStorage.setItem('address',that.GuestList.Address);//测试  地址是需要的
              console.info('当前客人可以入住！');
            } else {
              instance('当前客人在住，不能办理入住')
              //that.hintInfo('warning', '当前客人在住，不能办理入住！');
              that.$router.push({path: '/'})
            }
          }).catch((err) => {
            console.error(err);
          })
        } else if (that.flag === 'yes_res') {
          /**
           * 有预定 这里可能是直接从查询订单号来的，也可能是刷身份证拿到查到的预定单信息来的，目前先做的是身份证的，身份证一个只能有一个单 所以都是根据身份证拿到订单号
           * 这里刷身份证已经成功，下一步进行人脸识别
           * 应该先展示预订信息给客人确认，确认以后进行人脸扫描
           */
          console.info("to yes_res");
          let that = this;
          console.log(JSON.parse(GuestList).idcardno);
          let url = that.api.api_bill + '/v1/machine/checkin/is_checkin_info/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              id_no: JSON.parse(GuestList).idcardno //身份证号
            }
          }).then((res) => {
            console.info(JSON.stringify(res));
            /**
             * 客人可以办理入住  查询一下是不是会员，如果是会员  需要将新的会员价格拿到
             * else 不是会员  直接拿到的是散客的价格
             */
            if (res.data.data.result === 'fail') {
              that.$router.push({path: '/cin-face'}); //这里不做是不是会员的判断，会员统一走扫码和输入手机号
              console.info('当前客人可以入住！');
            } else {
              instance('当前客人在住，不能办理入住')
              //that.hintInfo('warning', '当前客人在住，不能办理入住！');
              that.$router.push({path: '/'})
            }
          }).catch((err) => {
            console.error(err);
          })
          //that.$router.push('/cin-face');
        } else if (that.flag === 'ext') {
         /*
          * 续住  直接插入房卡读出来房间号，根据房间号查询在住信息
          *
          */

          /**
           * 续住
           * 直接根据身份证或者房卡查询在住信息，如果有订单信息返回说明有在住信息，如果没有，说明没有，有的话直接拿到订单号信息，进行新的房价查询
           */
          let that = this;
          let url = that.api.api_zt + 'machine/checkin/is_checkin_info/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              id_no: that.GuestList.idcardno //JSON.parse(GuestList).idcardno //身份证号
            }
          }).then((res) => {
            if (res.data.data.result === 'fail') {
              instance('未查询到该客人的入住信息,无法进行续住')
              //that.hintInfo('warning', '未查询到该客人的入住信息,无法进行续住');
              that.$router.push({path: '/'});
            } else {
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
              /*console.info(res.data.data.order_no);
              sessionStorage.setItem('order_no', res.data.data.order_no);
              //该客人可以续住，所以需要根据订单号拿到客人的在住信息。
              that.$axios({
                method: 'get',
                url: that.api.api_zt + 'checkin/all_master_info_order/',
                params: {
                  order_no: res.data.data.order_no, //订单号  查询在住信息使用
                }
              }).then((res) => {
                console.info(JSON.stringify(res));
                if (res.data.message === 'success') {
                  console.info(sessionStorage.getItem('rate_code'));
                  //将获取到的在住信息拿到，缓存下来，在下一个页面展示出来。 ext-sel-info
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
                } else {
                  instance('查询失败')
                  //that.hintInfo('warning', '查询失败')
                }
              }).catch((err) => {
                //获取失败，将错误信息拿到。
                console.error(err);
              });*/
            }
          }).catch((err) => {
            console.error(err);
          })
        } else {
          /**
           * 退房
           * 1、先查询该客人是否在住，客人如果不在住直接提示未查到该入住信息，不可以进行退房操作，
           * 2、如果在住，拿到主账id，进行查询是否结清，如果结清，直接可以进行退房，改房态  over
           */
          console.info("to cut");
          let that = this;
          let url = that.api.api_bill + '/v1/machine/checkin/is_checkin_info/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              id_no: JSON.parse(GuestList).idcardno //身份证号
            }
          }).then((res) => {
            console.info(JSON.stringify(res));
            console.log(res.data.data.order_no);
            //将返回的订单号获取到，根据订单号查询到入住的信息，将入住信息展示出来
            if (res.data.data.result === 'fail') {
              instance('未查询到该客人的入住信息,无法进行退房')
              //that.hintInfo('warning', '未查询到该客人的入住信息,无法进行退房');
              that.$router.push({path: '/'});
              return;
            } else {
              that.$axios({
                method: 'get',
                url: that.api.api_bill + '/v1/checkin/all_master_info_order/',
                params: {
                  order_no: res.data.data.order_no,
                }
              }).then((res) => {
                if (res.data.message === 'success') {
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
                } else {
                  instance('查询失败')
                  //that.hintInfo('warning', '查询失败')
                }
              }).catch((err) => {
                console.info(JSON.stringify(err));
              })
            }
          }).catch((err) => {
            console.error(err);
          })
          /**
           * 先执行的是查询结账信息的接口
           */
        }
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
      /**
       * @hintInfo 操作提示信息
       * @param success  成功提示
       * @param warning 警告信息
       * @info 需要提示的信息
       */
      hintInfo: function (hint, info) {
        let that = this;
        if (hint === "success") {
          that.$message({
            message: info,
            type: 'success'
          });
        } else if (hint === "warning") {
          that.$message({
            message: info,
            type: 'warning'
          });
        } else {
          this.$message.error('出错了！');
        }
      },
      /**
       * @close_camera 关闭读卡器
       */
      close_card() {
        let that = this;
        let card = "close_card"; //close_camera 打开摄像头
        //ios返回的数据
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data);
          //先将base64格式的文件转为file文件，作为file参数
          if (data) {
            //alert('data:' + data);
          } else {
            //that.hintInfo('warning','读取失败');
          }
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb', card, (data) => {
          // 处理返回数据 发送读取身份证读卡器的指令
          if (data === 'true') {
            //that.hintInfo('success', '关闭摄像头');
            //判断interval 循环是否存在，存在的话直接将计时器删除
          } else {
            console.info('passing...');
          }
        })
      },
      /**
       * @close_camera 关闭摄像头
       */
      close_camera() {
        let that = this;
        let card = "close_camera"; //close_camera 打开摄像头
        //ios返回的数据
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data);
          //先将base64格式的文件转为file文件，作为file参数
          if (data) {
            //alert('data:' + data);
          } else {
            //that.hintInfo('warning','读取失败');
          }
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb', card, (data) => {
          // 处理返回数据 发送读取身份证读卡器的指令
          if (data === 'true') {
            //that.hintInfo('success', '关闭摄像头');
            //判断interval 循环是否存在，存在的话直接将计时器删除
          } else {
            console.info('passing...');
          }
        })
      },
    },


  }
</script>

<style lang="less" scoped>
  .cin-id-card {
    width: 1080px;
    height: 1920px;
    background: #fff url(../../common/imgs/juxing.png) no-repeat center;
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
          //background: #000;
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
    }
  }
</style>
