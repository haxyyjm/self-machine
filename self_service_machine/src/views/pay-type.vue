<template>
  <div class="pay-type">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--<home-back></home-back>-->
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <!--<home-back></home-back>-->
        <div class="homeBack">
          <div @click="del_orde_list()">取消入住</div>
          <img src="@/common/imgs/zhuye.png" alt="">
        </div>
        <span style="position: absolute;left: 50%">请选择支付方式</span>
        <!--<back-view></back-view>-->        <!--左边返回-->
      </div>
      <div class="cinPayType" v-if="!dialog_img">
        <!-- 扫描加背景区域 -->
        <div class="cinPayInfo">
          <p>{{ room_no }} 房间 ：共计支付：<span class="fontColor">¥ {{ count_money }} </span>元 </p>
          <div class="detailView">
            <p>房费合计：<span class="fontColor">¥ {{ roomMoney }}</span> 元</p>
            <p>押金合计：<span class="fontColor">¥ {{ depositMoney }}</span> 元</p>
          </div>
          <!--<div class="cin-pay-type">
            <p>请选择支付方式：</p>
            <ul>
              <li v-for="(item,index) in payTypeImg" :key="index" class="listItem">
                <div class="listImg">
                  &lt;!&ndash;<router-link :to="item.path">&ndash;&gt;
                  <img :src="item.url" :alt="item.desc" @click="select_pay(item)">
                  &lt;!&ndash;</router-link>&ndash;&gt;
                </div>
                <p>{{ item.desc }}</p>
              </li>
            </ul>
          </div>-->
          <div style="width: 100%" class="z-fixed-c">
            <div>
              <div>微信支付</div>
              <div id="wxqrcode" ref="wxqrcode" style="width: 150px;height: 150px;margin-top: 20px"></div>
            </div>
            <div style="margin-left: 10%;">
              <div>支付宝支付</div>
              <div id="aliqrcode" ref="aliqrcode" style="margin-top: 20px"></div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="cinCode" v-else>
        <div v-if="img_src">
          <img :src="img_src" alt="" style="width: 400px;height: 400px;margin-bottom: 100px">
        </div>
        <div id="qrcode" ref="qrcode" v-else style="margin-left: 38%;margin-bottom: 20px"></div>

        &lt;!&ndash;<canvas id="qrcode" v-else></canvas>&ndash;&gt;
        &lt;!&ndash;<div class="qrcode" ref="qrCodeUrl"></div>&ndash;&gt;
        <p class="loadMsg">请扫描上方二维码，进行支付</p>
      </div>-->
      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
      <!--底部结束-->
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  import {instance} from '../common/js/instance'

  export default {
    name: "cinPayType",

    data() {
      return {
        room_list:[],
        url_bill: this.api.api_bill,
        sex: '0',//性别x
        flag_round: '',//开启轮循
        flag_val: '',//判断是不是支付成功
        wx_order_form: '',//微信订单号
        ali_order_form: '',//支付宝订单号
        ali_picture: '',//生成支付宝的二维码
        wx_picture: '', //生成微信的二维码
        img_wxsrc: '',//微信付款二维码
        img_alisrc: '',//支付宝付款二维码
        pay_mode: '',//付款方式
        url: this.api.api_9022,
        order_form: '',//订单号
        qr_w: '',//生成支付宝图片
        timer_src: '',//定时器
        timer_r: '',//定时器
        dialog_img: false,//判断是否显示二维码
        img_wz: false,//判断是微信还是支付宝
        img_src: '',//微信二维码地址
        describe_desc: "",
        payInfoData: {},
        room_no: '',
        pay_data: [{}],
        depositMoney: 0, //押金合计
        count_money: '', //共计支付
        roomMoney: 0, //房费
        code_url: '',//二维码的地址
        flag_type: '',//查看回调是不是对的
        //支付方式选择展示数据
        payTypeImg: [
          {
            url: require("../common/imgs/zhifubao.png"),
            desc: '扫码支付',
            path: "/payment",
            describe: "支付宝",
            id: 1,
            flag: 2
          },
          {
            url: require("../common/imgs/weixin.png"),
            desc: '扫码支付',
            path: "/payment",
            describe: "微信",
            id: 38,
            flag: 1
          }
        ],
        timer: null,
        timerStatus: false,
        timeFlg: 0,
      }
    },
    components: {QRCode},
    created: function () {
      let that = this;
      /**
       * 将房间信息拿到
       */
      that.room_no = sessionStorage.getItem('room_no');
      that.room_list.push(that.room_no);
      that.roomMoney = sessionStorage.getItem('day_price') ? sessionStorage.getItem('day_price') : 0;
      //that.count_money = parseFloat(that.depositMoney) + parseFloat(that.roomMoney);//这是一共需要支付的金额
      that.count_money = 0.01;
      //that.get_pay_cash();
      that.get_pay_code(1)
      that.get_pay_code(2)
    },
    methods: {
      /**
       * @get_pay_code 获取支付的二维码
       */
      get_pay_code(val) {
        let url = this.api.api_zt + 'finance/extend_pay/get_order_number/'
        if (val === 1) {
          this.$axios({
            method: 'post',
            url: url,
            data: {
              amount: this.count_money * 100,
              type: val
            }
          }).then((res) => {
            if (res.data.message === 'success') {
              this.wx_order_form = res.data._id //将订单号获取到
              this.wx_picture = res.data.code_url ? res.data.code_url : '获取微信支付失败' // url获取到
              this.made_code(val)
              this.flag_val = val
              this.get_pay_result()
            } else {
              this.wx_picture = '获取微信支付失败' // url获取到
              this.made_code(val)
            }
          }).catch((err) => {
            this.wx_picture = '获取微信支付失败' // url获取到
            this.made_code(val)
            console.error(err)
          })
        } else {
          this.$axios({
            method: 'post',
            url: url,
            data: {
              amount: this.count_money,
              type: val
            }
          }).then((res) => {
            if (res.data.message === 'success') {
              this.ali_order_form = res.data._id //将订单号获取到
              this.ali_picture = res.data.code_url ? res.data.code_url : '获取支付宝支付失败' // url获取到
              this.made_code(val)
              this.flag_val = val
              this.get_pay_result()
              //console.info($refs.aliqrcode)
            } else {
              this.wx_picture = '获取支付宝支付失败' // url获取到
              this.made_code(val)
            }
          }).catch((err) => {
            this.wx_picture = '获取支付宝支付失败' // url获取到
            this.made_code(val)
            console.error(err)
          })
        }
      },
      /**
       * @get_pay_result 获取支付返回值
       */
      get_pay_result() {
        let that = this
        let url = this.api.api_zt + 'payment/weixin/check_paid/'
        if (this.flag_val === 1) {
          this.$axios({
            method: 'post',
            url: url,
            data: {
              out_trade_no: this.wx_order_form,
              type: this.flag_val
            }
          }).then((res) => {
            console.info(res)
          }).catch((err) => {
            console.error(err)
          })
        } else {
          this.$axios({
            method: 'post',
            url: url,
            data: {
              out_trade_no: this.ali_order_form,
              type: this.flag_val
            }
          }).then((res) => {
            if (that.timeFlg >= 60) {
              clearInterval(this.timer)
              this.$router.push('/')
            } else {
              console.info(res.data.data)
              if (res.data.data) {
                if (res.data.data.paid === "yes") {
                  clearInterval(this.timer)
                  //入住
                  this.verify_cin()
                  //this.$router.push('/success')
                } else {
                  if (!that.timerStatus) {
                    this.timer = setInterval(() => {
                      this.timeFlg = this.timeFlg + 2
                      that.get_pay_result()
                      that.timerStatus = true
                    }, 2000);
                    that.timerStatus = false
                  }
                }
              } else {
                if (!that.timerStatus) {
                  this.timer = setInterval(() => {
                    this.timeFlg = this.timeFlg + 2
                    that.get_pay_result()
                    that.timerStatus = true
                  }, 2000);
                  that.timerStatus = false
                }
              }

            }
          }).catch((err) => {
            console.error(err)
          })
        }
      },
      /**
       * @verify_cin 确认入住
       * 此时的入住是非手机微信预定，包括正常散客入住和mis系统预定转入住（均为没有付款的入住）
       */
      verify_cin() {
        let that = this;
        if (sessionStorage.getItem('booking_flag') === 'booking') {
          console.info('预定转入住')
          if (sessionStorage.getItem('sex') === '男') {
            that.sex = "0";
          } else {
            that.sex = "1"
          }
          sessionStorage.setItem('guest_phone', that.phone)
          that.$axios({
            method: 'post',
            url: that.api.api_zt + '/v1/checkin/batch_booking_check_in/ ',
            data: {
              reserve_guest: [{
                room_number: sessionStorage.getItem('room_no'), //房间号
                id_code: "01",
                id_no: sessionStorage.getItem('idcardno'), //身份证号
                name: sessionStorage.getItem('checkin_name') ? sessionStorage.getItem('checkin_name') : 'Tom',
                sex: that.sex ? that.sex : '0',
                telephone: sessionStorage.getItem('clavier') ? sessionStorage.getItem('clavier') : sessionStorage.getItem('guest_phone'),
                street_add: "",
                last_name: null,
                first_name: null,
                name2: null,
                name_combi: null,
                language: "",
                title: null,
                salutation: null,
                race: null,
                religion: null,
                career: "",
                nation: null,
                visa_no: null,
                visa_grant: null,
                enter_port: null,
                where_from: null,
                where_to: null,
                salary: null,
                education: null,
                marital: null,
                company_id: null,
                company_na: "",
                pic_photo: null,
                pic_sign: null,
                remark: "",
                weixin: "",
                mobile: null,
                email: "",
                country_id: null,
                division_id: null,
                state_id: null,
                city_id: null,
                zipcode: null,
                reserve_base_id: "",
                guest_id: ""
              }],
              rt_rate: [{
                id: sessionStorage.getItem('id'), //预定单id
                code: null,
                code_name: sessionStorage.getItem('code_name'), //房型code
                create_datetime: "2019-09-16T16:54:13",
                create_user_id: 28,
                descript: null,
                descript_en: null,
                hotel_group_id: 4,
                hotel_id: 6,
                is_halt: false,
                list_order: null,
                modify_date: sessionStorage.getItem('modify_date') ? (sessionStorage.getItem('modify_date').split('T')[0] + " " + sessionStorage.getItem('modify_date').split('T')[1]) : '',
                modify_user_id: sessionStorage.getItem('modify_user_id'), //更新id
                reserve_base_id: sessionStorage.getItem('order_no'), //预定单号
                checkin_date: "2018-12-01T10:10:01",
                checkin_time: "2018-12-01T10:10:01",
                room_class: "1",
                room_type: sessionStorage.getItem('room_type'), //房型中文
                room_number: sessionStorage.getItem('room_no'), //房间号,
                code_room_special_ids: "1",
                code_room_facilities_ids: "1",
                is_arranged: false,
                rmocc_ids: "",
                ratecode_id: null,
                fix_rate: 0,
                add_person_num: 1,
                add_person_price: 1,
                add_bed_num: 1,
                add_bed_price: 1,
                code_pkg_id: 1,
                add_pkg_num: 1,
                add_pkg_price: 1,
                rate_service_fee: 1,
                rate_tax: 1,
                lower_price_id: 1,
                lower_price_reason: "1",
                lower_price_amount: 1,
                real_rate: 1,
                remark: "",
                is_checkin: null,
                room_count: 1,
                lock_number: sessionStorage.getItem('lock_no') ? sessionStorage.getItem('lock_no') : ''//锁号
              }],
              reserve_base: {
                rsv_type: 1,
                rsv_lable: 0,
                rsv_person_name: sessionStorage.getItem('rsv_person_name'), //预定人姓名
                telephone_master: sessionStorage.getItem('telephone_master'), //预定人手机号
                arr_time: sessionStorage.getItem('begin_date'), // 入住时间
                leave_time: sessionStorage.getItem('end_date') + ' 14:00:00', //  离店时间
                is_fix_rate: true,
                is_secrete: true,
                is_secret_rate: true,
                descript: null,
                descript_en: null,
                account_id: null,
                biz_date: "2018-12-01T10:10:01",
                team_id: 1,
                rsv_from: 1,
                order_no: sessionStorage.getItem('order_no'), //预定单号,
                confirmed: false,
                sales_person_id: 1,
                code_occ_id: 1,
                extra_flag: 1,
                adult_num: 1,
                children_num: 1,
                purpose: "1",
                name: "1111",
                email_master: "101608@qq.com",
                weixin_master: "1",
                mobile_master: "1",
                fix_rate: 0,
                rate_code: sessionStorage.getItem('code_name'), //房价码
                code_commision_id: "1",
                code_market_id: sessionStorage.getItem('code_market_id'), //
                code_src_id: sessionStorage.getItem('code_src_id'), //
                rsv_status_lable: 0,
                account_opened: 0,
                total_chartge: "0.00",
                total_pay: "0.00",
                last_account_id: null,
                last_pay_id: 1,
                account_num: 1,
                pay_num: 1
              },
              room_list: [
                sessionStorage.getItem('room_no') //房间号
              ],
              room_no_floor: [{
                room_no: sessionStorage.getItem('room_no'), //房间号
                floor_number: 5
              }]

            }
          }).then((res) => {
            console.info(JSON.stringify(res));
            if (res.data.message === 'success') {
              if (res.data.data.message === 'success') {
                //that.handleSpeak('办理成功')
                let resp = '';
                let orde_list = '';
                for (let i in res.data.data.data.member) {
                  resp = res.data.data.data.member[i];
                }
                for (let i in res.data.data.orde_list) {
                  orde_list = res.data.data.orde_list[i]
                }
                that.zzj_account_id = resp;
                that.orde_list = orde_list
                sessionStorage.setItem('orde_list', that.orde_list)
                sessionStorage.setItem('zzj_account_id', that.zzj_account_id);
                that.$router.push({path: '/success'});
              } else {
                instance('入住失败，请联系工作人员')
              }
            } else {
              instance('服务器错误,请稍后重试')
            }
          }).catch((err) => {
            console.error(err);
          })
        } else {
          console.info('直接入住')
          if (sessionStorage.getItem('sex') === '男') {
            that.sex = "0";
          } else {
            that.sex = "1"
          }
          sessionStorage.setItem('guest_phone', that.phone)
          let room_no = sessionStorage.getItem('room_no');
          let lock_no = sessionStorage.getItem('lock_no') ? sessionStorage.getItem('lock_no') : ''
          let lock_arrary = {}
          lock_arrary[room_no] = lock_no
          that.$axios({
            method: 'post',
            url: that.api.api_zt + 'checkin/nobooking_checkin/',
            data: {
              room_list: that.room_list,
              master_base: [{
                room_amount: 1,
                fix_rate: that.day_price,
                master_lable: 0,//判断是否为全日房
                master_type: 1,//判断是否散客入住
                arr_time: sessionStorage.getItem('begin_date'),
                leave_time: sessionStorage.getItem('end_date') + ' 14:00:00',
                room_type: that.room_type,
                code_name: sessionStorage.getItem('room_type_code'),
                room_number: that.room_no,
                biz_date: "2018-12-01 10:10:01",
                adult_num: 2,
                code_market_id: 'ZZJ',
                code_src_id: 'ZZJ',
                rate_code: sessionStorage.getItem('rate_code') ? sessionStorage.getItem('rate_code') : 'BAR',
              }],
              lock_arrary: lock_arrary,
              check_guest: [{
                room_floor: 5,
                arr_time: sessionStorage.getItem('begin_date'),
                leave_time: sessionStorage.getItem('end_date') + ' 14:00:00',
                room_number: that.room_no,
                id_code: "01",
                id_no: sessionStorage.getItem('idcardno'),
                name: that.checkin_name ? that.checkin_name : 'TOM',
                sex: that.sex ? that.sex : '0',
                telephone: that.phone,
                pic_sign: sessionStorage.getItem('face_photo') ? sessionStorage.getItem('face_photo') : 'https://ispider-oss.oss-cn-hangzhou.aliyuncs.com/live/aa3555da.png',//人脸照片
                street_add: sessionStorage.getItem('address'),//地址
              }]
            }
          }).then((res) => {
            console.info(JSON.stringify(res));
            if (res.data.message === 'success') {
              //that.handleSpeak('办理成功')
              let resp = '';
              let orde_list = '';
              for (let i in res.data.data.member) {
                resp = res.data.data.member[i];
              }
              if (res.data.orde_list) {
                for (let i in res.data.orde_list) {
                  orde_list = res.data.orde_list[i]
                }
              }
              that.zzj_account_id = resp;
              that.orde_list = orde_list
              sessionStorage.setItem('orde_list', that.orde_list)
              sessionStorage.setItem('zzj_account_id', that.zzj_account_id);
              that.$router.push({path: '/success'});
            } else {
              instance('入住失败，请联系工作人员')
            }
          }).catch((err) => {
            console.error(err);
          })
        }
      },
      /**解析后端给的数据生成二维码*/
      made_code(val) {
        let that = this;
        if (val === 2) {
          let aliqrcode = new QRCode('aliqrcode', {
            width: 150,  // 设置宽度
            height: 150, // 设置高度
            text: that.ali_picture,
            correctLevel: 3,
            colorDark: '#F40',
          })
        } else {
          let wxqrcode = new QRCode('wxqrcode', {
            width: 150,  // 设置宽度
            height: 150, // 设置高度
            text: that.wx_picture,
            correctLevel: 3,
            colorDark: '#F40',
          })
        }
      },

      //封装付钱的结算
      fu_money() {
        let that = this;
        console.info("主帐ID：" + sessionStorage.getItem('zzj_account_id'));
        that.$axios({
          url: that.url + "/v1/finance/pay_detail/pay_by_charges",
          method: "post",
          data: {
            account_id: sessionStorage.getItem('zzj_account_id'), //传入分帐前的账号
            pay_amount: parseFloat(that.count_money).toFixed(2),//支付金额
            pay_mode_id: that.pay_mode,//付款方式
            code_pay_for_id: 5,//付款原因
            in_or_out: "in",//收支种类
            original_pay_id: that.order_form,//订单号
            code_income_type_id: 10,//入账代码
            need_charge: 0,
          },
        }).then(res => {
          if (res.data.message === "success") {
            that.$router.push('/success');
            //that.hintInfo("success", "付钱成功");
          } else {
            that.del_orde_list()         //删除订单
            //that.hintInfo("warning", res.data.message);
            that.$router.push('/error'); //这应该是失败的
          }
        }).catch(error => {
          that.del_orde_list()        //如果失败 删除订单
          that.$router.push('/error'); //这里应该是失败的
          console.log(error);
        });
      },
      /**
       * @del_orde_list 支付失败删除订单
       */
      del_orde_list() {
        let that = this
        that.$axios({
          method: 'post',
          url: that.api.api_bill + '/v1/checkin/remove_master_all/',
          data: {
            order_no: sessionStorage.getItem('orde_list') ? sessionStorage.getItem('orde_list') : undefined
          }
        }).then((res) => {
          clearInterval(that.timer_src);
          clearInterval(that.timer_r);
          that.$router.push({path: '/'});
        }).catch((err) => {
          console.error(err)
        })
      },
    },
    /**
     * 页面销毁
     */
    beforeDestroy() {
      clearInterval(this.timer)
    },
  }
</script>

<style lang="less" scoped>
  .pay-type {
    text-align: center;
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
        height: 40px;
        margin-bottom: 70px;

        span {
          height: 30px;
          font-size: 30px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
          display: inline-block;
          margin: auto;
          vertical-align: top;
          margin-top: 10px;
          margin-left: -84px;
        }

        .homeBack {
          float: right;
          margin-right: 40px;

          div {
            height: 25px;
            font-size: 26px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 35px;
            float: left;
            margin-right: 8px;
          }

          img {
            width: 30px;
            height: 30px;
            float: left;
          }
        }
      }

      .cinPayType {
        width: 900px;
        margin: auto;
        font-size: 30px;
        color: #ffffff;

        .cinPayInfo {
          padding: 40px 0 0 0;
          background: #000;
          height: 600px;

          .fontColor {
            color: #FB9E19
          }

          .detailView {
            display: flex;
            display: -webkit-flex;
            margin: 70px 0 102px 0;

            p {
              width: 50%;
              text-align: center;
            }
          }

          /* 支付方式选择展示 */

          .cin-pay-type {
            ul {
              width: 100%;

              li {
                display: inline-block;
                margin: 66px 50px;
                cursor: pointer;

                .listImg {
                  width: 192px;
                  height: 100px;

                  img {
                    width: 100%;
                  }

                  p {
                    margin-top: 26px;
                    font-size: 26px;
                  }
                }
              }
            }
          }
        }
      }

      .cinCode {
        .loadMsg {
          font-size: 30px;
          color: #ffffff;
        }


      }
    }
  }

  .z-fixed-c {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
