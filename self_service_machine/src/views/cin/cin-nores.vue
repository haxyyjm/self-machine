<template>
  <div class="cin-nores">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <span>{{show_msg}}</span>
        <back-view></back-view>
      </div>
      <!--订单列表开始-->
      <div class="cinNoRes">
        <ul class="orderType" style="background-color: #007BDB;">
          <li style="color: #ffffff">全天房</li>
          <!--<li @click="AllDayChange" :class="isAllDay?'active':'normal'">全天房</li>-->
          <!--<li @click="DateChange" :class="isDate?'active':'normal'">钟点房</li>-->
          <!--<li @click="WeeChange" :class="isWee?'active':'normal'">凌晨房</li>-->
        </ul>
        <ul class="orderType">
          <li>
            <span style="font-size: 26px">入住</span>
            <el-date-picker style="margin-left: 30px"
                            v-model="begin_date"
                            size="large"
                            disabled
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="date"
                            placeholder="选择住店时间">
            </el-date-picker>
          </li>
          <li>
            <span style="font-size: 26px">离店</span>
            <el-date-picker style="margin-left: 30px"
                            @change="get_roomType"
                            v-model="end_date"
                            size="large"
                            value-format="yyyy-MM-dd"
                            clearable
                            type="date"
                            placeholder="选择离店时间">
            </el-date-picker>
          </li>
        </ul>
        <div class="tableView">
          <div style="width: 100%; overflow: auto;padding-bottom: 50px;">
            <div style="height: 90px;width: 100%;color: #777777" class="z-fixed-c">
              <div style="height:100%;width: 40%" class="z-fixed-c">房型</div>
              <div style="height:100%;width: 40%" class="z-fixed-c">当天房价</div>
              <div style="height:100%;width: 20%"></div>
            </div>
            <div v-for="(item,index) in room_type_Data"
                 style="border-radius:4px;overflow:hidden;
                 font-size:22px;height: 90px;width: 100%;border: 1px solid #CCCCCC;margin-bottom: 10px;"
                 class="z-fixed-c"
                 :style="{color:(item.price_list[0]['can_live_num'] !== 0) ? '#333333' : '#CCCCCC'}"
            >
              <div style="height:100%;width: 40%" class="z-fixed-c">{{item.room_type}}</div>
              <div style="height:100%;width: 40%" class="z-fixed-c">￥{{Math.ceil((item.price_list[0]['day_price'] *
                present_value).toFixed(2))}}
              </div>
              <div style="height:100%;width: 20%;font-size: 26px;">
                <div style="background: #007BDB;height: 90px;line-height: 90px;color:rgba(255,255,255,1);"
                     v-if="(item.price_list[0]['can_live_num'] !== 0)" @click="Reservation(item)">选择房间
                </div>
                <div style="background: #EEEEEE;height: 90px;line-height: 90px;color:#333333;" v-else>房间已满</div>
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
    name: "cin-nores",
    data() {
      return {
        //开始时间
        begin_date: new Date(),
        //结束时间
        end_date: '',
        //相差天数
        Days: '',
        //房型列表
        room_type_Data: [],
        //url
        url: this.api.api_price + '/v1/room/machine/get_room_type_price/',//获取酒店的房型信息
        room_type: '',//房型
        show_msg: "",//展示信息
        present_value: '',//折扣价格
      }
    },
    /**
     * @created 将需要的参数拿到
     */
    created: function () {
      let that = this;
      /**
       * @get_roomType 获取房型信息
       * 需要将用户之前选择的时间段的可用房型获取到
       * 将缓存中的时间段作为参数做一次房型接口的请求
       */
        //默认往后一天
      let day = new Date();
      day.setDate(day.getDate() + 1);
      console.info(day)
      let days = that.GMTToStr(day)
      that.end_date = sessionStorage.getItem('end_date') ? sessionStorage.getItem('end_date') : days;
      console.info(days)
      if (sessionStorage.getItem('card_name')) {
        that.show_msg = '尊敬的' + sessionStorage.getItem('card_level') + '会员' + sessionStorage.getItem('card_name') + '欢迎您';
      } else if (sessionStorage.getItem('treaty')) {
        that.show_msg = '尊敬的' + sessionStorage.getItem('treaty') + '欢迎您'
      } else {
        that.show_msg = '请选择您要入住的房型';
      }
      if (sessionStorage.getItem('present_value')) {
        this.present_value = sessionStorage.getItem('present_value');
      } else {
        this.present_value = 1
      }
      if (!that.end_date) {
        //this.handleSpeak(' 请选择离店时间')
        that.hintInfo('warning', '请选择离店时间')
      } else {
        that.get_roomType();
      }
    },
    methods: {
      GMTToStr(time) {
        let date = new Date(time)
        let Str = date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' +
          date.getDate()
        return Str
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
       * @get_roomType 获取房型信息
       */
      get_roomType() {
        let that = this;
        /**
         * 需要将起始时间和终止时间放到缓存里面，这样可以进行下面接口的处理
         * 获取房型、房间
         * if sessionStorage.getItem('end_date') 确定用户是输入了终止时间
         */
        console.info(that.begin_date);
        sessionStorage.setItem('booking_flag', 'nobooking') //无预定
        sessionStorage.setItem('begin_date', that.GMTToStr_Date_time(that.begin_date));//开始时间
        sessionStorage.getItem('begin_date')
        //console.info(sessionStorage.getItem('begin_date'));
        sessionStorage.setItem('end_date', that.end_date);//结束时间，这个时间是需要将14：00：00加上
        //console.info(sessionStorage.getItem('begin_date'))
        console.info(sessionStorage.getItem('end_date'))
        if (that.end_date != null) {
          //this.handleSpeak('请选择您要预定的房型');
          that.$axios({
            method: 'post',
            //url: that.url,
            url: that.api.api_zt +  'room/machine/get_room_type_price/',
            data: {
              room_type: that.room_type ? that.room_type : undefined,
              begin_time: sessionStorage.getItem('begin_date').split(' ')[0],
              end_time: that.end_date,
              rate_code: sessionStorage.getItem('rate_code') ? sessionStorage.getItem('rate_code') : "BAR"
            }
          }).then((res) => {
            console.info(res);
            sessionStorage.setItem('check_in_day', res.data.data.data[0].price_list.length)
            that.room_type_Data = res.data.data.data;
          }).catch((err) => {
            console.error(err);
          })
        } else {
          //this.handleSpeak('请选择离店时间');
          that.hintInfo('warning', '请选择离店时间');
        }

      },
      /**
       * @Reservation 立即入住
       */
      Reservation(row) {
        let that = this;
        console.info(row);
        /**
         * 直接跳转到获取房间的页面
         * 将row.room_type_code 作为参数
         * that.$router.push({path:'/cin-roomlist'})跳转到可用房间的页面
         */
        sessionStorage.setItem('price_list', JSON.stringify(row.price_list))
        sessionStorage.setItem('room_type_code', row.room_type_code); //房型的code
        sessionStorage.setItem('room_type', row.room_type);//将用户选择的中文房型缓存下来，展示信息使用
        sessionStorage.setItem('room_type_picture', row.room_type_picture);//将改房型的图片缓存下来
        let data_rt_rate = row.price_list;
        let count_price = 0;
        for (let i in data_rt_rate) {
          //count_price = count_price + Math.ceil(((data_rt_rate[i].day_price) * this.present_value).toFixed(2));
          count_price = count_price + parseInt(data_rt_rate[i].day_price);
        }
        sessionStorage.setItem('day_price', count_price);//将价格缓存下来，缓存的是当天的价格，不是所有的价格，后期如果需要展示所有的价格是需要将每一天的价格缓存下
        console.info('总价是：' + sessionStorage.getItem('day_price'));
        that.$router.push({path: '/cin-roomlist'});
      },
      /**
       *  @GMTToStr 格林尼治时间转为日期格式
       */
      GMTToStr_date(time) {
        let date = new Date(time);
        let Str = date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' +
          date.getDate();
        return Str;
      },
      /**
       * @GMTToStr_Date_time 格林尼治时间转为时间格式
       */
      GMTToStr_Date_time(time) {
        let date = new Date(time)
        let M = date.getMonth()+1;
        let D = date.getDate();
        let H = date.getHours();
        let Min = date.getMinutes();
        let S = date.getSeconds();
        let Str = date.getFullYear() + '-' +
          this.addZero(M) + '-' +
          this.addZero(D) + ' ' +
          this.addZero(H) + ':' +
          this.addZero(Min) + ':' +
          this.addZero(S);
        return Str;
      },
      addZero(m) {
        return m < 10 ? '0' + m : m;
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

  }
</script>

<style lang="less" scoped>
  .z-fixed-c {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /*隐藏滚动条*/
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    -webkit-overflow-scrolling: touch;
  }

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

  /*table{ border-collapse:collapse;}*/
  .cin-nores {
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

      .cinNoRes {
        width: 1000px;
        height: 600px;
        background-color: #ffffff;
        font-size: 22px;
        /* overflow: auto;*/
        margin-top: 43px;
        margin-left: 40px;

        .orderType {
          /* margin-top: 43px;*/
          display: flex;
          display: -webkit-flex;
          height: 100px;
          line-height: 94px;
          font-size: 36px;

          li {
            width: 100%;
            cursor: pointer;

            Calendar {
              width: 100%;
            }
          }

          .active {
            background-color: #ffffff;
            color: #000000;
            border: 6px #007BDB solid;

          }

          .normal {
            background-color: transparent;
            color: #ffffff;
            border: 6px #007BDB solid;
          }

          // 时间选择
        }

        .tableView {
          width: 90%;
          margin: auto;
          height: 400px;
          overflow-y: auto;

        }
      }
    }
  }
</style>
<style>
  .el-input--prefix .el-input__inner {
    padding-left: 30px;
    font-size: large;
  }

  .el-icon-date:before {
    content: "\E78E";
    font-size: large;
  }
</style>
