<template>
  <div class="cin-phone">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <span>请确认入住人信息</span>
        <back-view></back-view>
      </div>
      <!--确认入住人信息开始-->
      <ul class="message">
        <li class="submitOrder">
          <ul>
            <li>房间号:
              <div>{{room_no}}</div>
              <span style="font-size: 16px;color: #777777;margin-left: 10px">(推荐)</span></li>
            <!--<li>订单号:<div>9527</div></li>-->
            <li>入住人:
              <div>{{checkin_name}}</div>
            </li>
            <li>房间类型:
              <div>{{room_type}}</div>
            </li>
            <li>入住人数:
              <div style="margin-top: 10px;">
                <!--                <img src="../../common/imgs/cin/jianhao.png" alt="" style="position: absolute;top: -30px;left: -10px;width: 46px;height: 46px" @click="cut">-->
                <span style="position: absolute;top: -19px;">{{figure}}</span>
                <!--                <img src="../../common/imgs/cin/jiahao.png"  alt="" style="position: absolute;top: -30px;left: 118px;width: 46px;height: 46px" @click="">-->
              </div>
            </li>
            <li>入住时间:
              <div>{{begin_date}} ~ {{end_date}}</div>
            </li>
            <li>联系方式:</li>
            <li><input v-model="phone" maxlength="11" placeholder="如有遗失物品，方便店内人员联系您"
                       style="width: 430px;height: 44px;line-height: 44px;border: none;border-bottom: 1px solid #777777;font-size: 18px"></input>
            </li>
            <li>房价总计:
              <div>￥
                <span>{{day_price}} + ¥ {{depositMoney}}</span>
                <span style="color: red;font-size: 16px;text-decoration: line-through">(押金)</span>
                <!--<button @click="price"   style="background:#007bdb;color: white; border: none;border-radius: 4px;width: 70px;height: 30px;line-height: 30px;margin-left: 50px ">价格明细</button>-->
              </div>
              <p>押金将在您退房时退回到您的账户</p>
            </li>
          </ul>
          <div class="present" @click="verify_cin">{{hint_submit.desc}}</div>
        </li>
        <li class="right-con"
            :style="{backgroundImage: 'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')', backgroundSize:'100% 100%'}"></li>
      </ul>
      <!--确认入住人信息结束-->
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
    name: "cin-detal",
    data() {
      return {
        number: true,
        figure: 1,
        hint_submit: {'key': 'submit', 'desc': '提交'},//确认入住
        url: this.api.api_bill,
        checkin_name: '',//入住人
        room_type: '',//入住房间类型
        day_price: '',//入住房间的价格
        guest_name: '',//入住人姓名
        room_no: '',//入住房间号
        begin_date: '',//入住时间
        end_date: '',//离店时间
        guest_iphone: '',//入住人手机号
        room_list: [],//入住的房间列表
        check_guest: [],//宾客信息
        room_type_name: '',//房型信息 英文描述
        depositMoney: 0,//押金
        phone: '',//手机号码
        sex: '0',//性别x
        zzj_account_id: '',//自助机的account_id
        defaultIcon: sessionStorage.getItem('room_type_picture'),//拿到缓存的照片
        coverImgUrl: sessionStorage.getItem('room_type_picture'),
        baseImg: '../../common/imgs/cin/icn-fangjiantu.png',
        orde_list: '',//入住返回订单号
      };
    },
    created() {
      let that = this;
      /**
       * 将需要的参数拿到，将需要的信息展示给客户，点击提交以后进行办理入住的业务
       */
      // that.room_type = sessionStorage.getItem('room_type');
      // that.day_price = sessionStorage.getItem('day_price');
      // that.room_no = sessionStorage.getItem('room_no');
      // that.begin_date = sessionStorage.getItem('begin_date').split(' ')[0];
      // that.end_date = sessionStorage.getItem('end_date');
      // that.room_type_name = sessionStorage.getItem('room_type_name');
      // that.room_list.push(that.room_no);
      // if(that.room_type_name === 'FYDCF'){
      //     that.depositMoney = 100;
      // }else if(that.room_type_name === 'FYSCF'){
      //     that.depositMoney = 220;
      // }else if(that.room_type_name === 'FYTF'){
      //     that.depositMoney = 450.50;
      // }else if(that.room_type_name === 'FYJTF'){
      //     that.depositMoney = 600;
      // }else if(that.room_type_name === 'FYDYF'){
      //     that.depositMoney = 700;
      // }else if(that.room_type_name === 'FYDJF'){
      //     that.depositMoney = 308.70;
      // }else{
      //     that.depositMoney = 0;
      // }
      // sessionStorage.setItem('depositMoney',that.depositMoney);

      //获取到展示的信息
      that.room_no = sessionStorage.getItem('room_no');//房间号
      that.checkin_name = sessionStorage.getItem('checkin_name');//入住人
      that.room_type = sessionStorage.getItem('room_type');//房型
      sessionStorage.getItem('');//人数
      that.begin_date = sessionStorage.getItem('begin_date').split(' ')[0];//时间
      that.end_date = sessionStorage.getItem('end_date');//时间
      that.phone = sessionStorage.getItem('clavier') ? sessionStorage.getItem('clavier') : sessionStorage.getItem('guest_phone');//手机号
      that.day_price = sessionStorage.getItem('day_price');//房间总计
      sessionStorage.getItem('room_type_code');//获取到房型的code  调入住的接口使用
      that.room_list.push(that.room_no);
      //that.handleSpeak('请确认入住信息，如有疑问，请咨询前台工作人员')
      // that.verify_cin();
    },
    methods: {
      check_submit_hitinfo() {
        let that = this;
        /**
         * 这里是直接进行人数的判断，如果人数和下面的入住人数是相等的，那么直接可以进行提交的操作，如果是不相等的，那么进行的是请完善信息的操作
         */
        if (that.figure === 1) {
          that.hint_submit.desc = '提交';
        } else {
          that.hint_submit.desc = '请完善同伴信息';
          that.hint_submit.key = 'check_card';
        }
      },
      /**
       * @verify_cin  确认入住
       */
      verify_cin() {
        let that = this;
        if (that.room_no) {
          if (!(/^1[3456789]\d{9}$/.test(that.phone))) {
            instance('请核对手机号')
          } else {
            if (sessionStorage.getItem('code_src_id') === 'phone') {
              that.$axios({
                method: 'post',
                url: that.url + '/v1/checkin/batch_booking_check_in/ ',
                data: {
                  reserve_guest: [{
                    room_number: sessionStorage.getItem('room_no'), //房间号
                    id_code: "01",
                    id_no: sessionStorage.getItem('idcardno'), //身份证号
                    name: that.checkin_name ? that.checkin_name : 'Tom',
                    sex: that.sex ? that.sex : '0',
                    telephone: that.phone,
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
                    //that.hintInfo('warning', '入住失败！');
                  }
                } else {
                  instance('服务器错误,请稍后重试')
                  //that.hintInfo('warning', '服务器错误！');
                }
                //如果成功，执行付款函数
                //that.go_payment()
              }).catch((err) => {
                console.error(err);
              })
            } else {
              //有预定但是是mis系统预定  没有付款
              that.$router.push('pay-type')
            }
          }
        } else {
          instance('房间号不存在，请核对房型信息')
        }
      },
      /**
       * @go_payment 付款
       */
      go_payment() {
        let that = this;
        if (that.hint_submit.key === "submit") {
          that.$router.push({path: '/pay-type'});
        } else {
          that.$router.push({name: '/cin-id-card', params: {flag: 'ver_checkin'}});//用来判断是根据完善用户信息界面进来的扫描身份证
        }
      },
      // 组件的方法
      add() {
        let that = this;
        that.figure++;
        that.check_submit_hitinfo();
      },
      cut() {
        let that = this;
        if (that.figure > 1) {
          that.figure--;
          that.check_submit_hitinfo();
        } else {
          that.hintInfo('warning', '宾客不可少于一个');
          return;
        }
      },
      /**价格明细跳转路由*/
      price() {
        let that = this;
        //将该房型下的房价信息拿到

        that.$router.push('/cin-detal-pri')
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
    },
    /**
     * 页面销毁的时候  需要将之前缓存的数据清除
     */
    // destroyed() {
    //   sessionStorage.removeItem('card_name');
    //   sessionStorage.removeItem('card_level');
    //   sessionStorage.removeItem('rate_code');
    //   sessionStorage.removeItem('present_value');
    // }
  }
</script>

<style lang="less" scoped>
  body {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .cin-phone {
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
        height: 40px;

        span {
          height: 30px;
          font-size: 32px;
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
      }

      .message {
        width: 900px;
        height: 600px;
        margin: auto;
        margin-top: 69px;
        display: flex;

        li {
          flex-grow: 1;
        }

        .right-con {
          width: 360px;
          height: 600px;
        }

        .submitOrder {
          width: 540px;
          height: 600px;
          background: rgba(255, 255, 255, 1);

          ul {
            font-size: 26px;
            text-align: left;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 24px;

            li {
              margin-top: 27px;
              margin-left: 17px;
              font-size: 26px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              /*line-height:24px;*/

              div {
                display: inline-block;
                font-size: 22px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(119, 119, 119, 1);
                line-height: 24px;
                margin-left: 21px;
                position: relative;

                img {
                  position: absolute;
                  top: -9px;
                  left: -9px;
                }
              }

              p {
                font-size: 16px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(128, 127, 127, 1);
                line-height: 24px;
                margin-left: 138px;
                margin-top: 12px;
              }
            }
          }
        }

        .present {
          width: 540px;
          height: 60px;
          background: rgba(0, 123, 219, 1);
          margin-top: 67px;
          font-size: 22px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 60px;
          text-align: center;
        }
      }

    }

  }
</style>
