<template>
  <div class="ext-sel-info">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <span>请确认续住信息</span>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <ul class="message">
        <li class="submitOrder">
          <ul >
            <li>入住人：<div>{{GuestName}}</div></li>
            <li>房间号:<div>{{RoomNo}}</div></li>
            <li>房间类型：<div>{{RoomType}}</div></li>
            <li>入住人数:
              <div style="margin-top: 10px;">
                <!--<img src="@/common/imgs/cin/jianhao.png" alt="" style="position: absolute;top: -30px;left: -10px;width: 46px;height: 46px" @click="cut">-->
                <span style="position: absolute;top: -19px;left: 71px">{{figure}}</span>
                <!--<img src="@/common/imgs/cin/jiahao.png" alt="" @click="add" style="position: absolute;top: -30px;left: 118px;width: 46px;height: 46px">-->
              </div>
            </li>
            <li>入住时间:<div style="color:rgba(0,123,219,1);">{{BeginTime}}/{{EndTime}}</div></li>
            <li style="color: rgba(119,119,119,1);font-size: 16px;width: 388px">请在右侧选择可续住日期，若该日期不可续住，请选其他日期或返回主页重新办理入住。</li>
            <li>手机号码：<div>{{phone}}</div></li>
            <li>房间总计:
              <div style="font-size:22px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,123,219,1);">￥
                <span >{{PayMoney}}</span>
              </div>
            </li>
            <li>
              <router-link to="/"><div class="cancel">取消续住</div></router-link>
            </li>
          </ul>
        </li>
        <li class="calendar">
          <el-date-picker
            v-model="leave_time_xz"
            value-format="yyyy-MM-dd"
            @change="clickDay"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <!--<Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate"  >

          </Calendar>-->
          <!--<ul class="title">
            <li>
              <ul>
                <li>日期</li>
                <li>当日价格</li>
                <li>点选</li>
              </ul>
            </li>
          </ul>-->
          <!--<ul class="Daymany">
            <li>
              <span style="color: rgba(119,119,119,1);margin-left: 10px">2018-10-01</span>
              <span style="color: rgba(0,123,219,1);margin-left: 40px">￥598.00</span>
              <input type="checkbox" checked="checked" >
            </li>
            <li>
              <span style="color: rgba(119,119,119,1);margin-left: 10px">2018-10-01</span>
              <span style="color: rgba(0,123,219,1);margin-left: 40px">￥598.00</span>
              <input type="checkbox" checked="checked" >
            </li>
          </ul>-->
          <div class="present" @click="present">提交订单</div>
        </li>
      </ul>
      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
      <!--底部结束-->
    </div>
  </div>
</template>

<script>
  import Calendar from 'vue-calendar-component';
  export default {
    name: "success",
    data(){
      return {
        rate_code : '',//房价码
        figure:"",
        //续住的房号
        RoomNo : '',
        //续住的房间类型
        RoomType : '',
        //续住人姓名
        GuestName : '',
        //续住的天数
        iDays  : 0 ,
        //手机号
        phone : '',
        //续住开始时间
        BeginTime : '',
        //续住结束时间
        EndTime : '',
        //房费
        PayMoney : '',
        //公共的参数
        data_obj : {},
        //续住的特殊的参数
        data_present : {},
        //续住信息
        cin_data : {},
        //续住离店时间
        leave_submit_time : new Date(),
        leave_time_xz : '',
        room_type_code : '',//房型code
        url : this.api.api_price + '/v1/room/machine/get_room_type_price/',//获取酒店的房型信息
      }
    },
    created: function() {
      /**
       * 将首页缓存中的数据拿到
       * @type {any}
       */
      //获取身份证件信息
      this.room_type_code = sessionStorage.getItem("room_type_code");//房型code
      console.info("房型的code是：" + this.room_type_code);
      if(sessionStorage.getItem('rate_code') !== null){
        this.rate_code = sessionStorage.getItem('rate_code');
      }else{
        this.rate_code = "BAR";
        console.info(sessionStorage.getItem('rate_code'));
      }
      //console.info(sessionStorage.getItem('rate_code')  ? sessionStorage.getItem('rate_code') : "BAR");
      this.params = JSON.parse(localStorage.getItem('json'));
      //拿到公共的请求参数
      this.data_obj = JSON.parse(localStorage.getItem('data_obj'));
      this.GuestName = sessionStorage.getItem('names');
      this.RoomNo = sessionStorage.getItem('room_number');
      this.RoomType = sessionStorage.getItem('room_type');
      this.figure = sessionStorage.getItem('master_guest');
      this.BeginTime = sessionStorage.getItem('arr_time');
      this.EndTime = sessionStorage.getItem('leave_time');
      this.phone = sessionStorage.getItem('clavier');
      this.PayMoney = sessionStorage.getItem('fix_rate');
    },
      // 组件的方法
      methods: {
        /**
         * @present 提交续住信息
         * @param RoomNo 房间号 DayNum 续住天数
         */
        present(){
          let that = this;
          let url = that.api.api_bill + '/v1/checkin/extend_check/';
          console.info(url);
          if(that.DayNum > 0){
            that.$axios({
              method:'post',
              url : url,
              data : {
                order_no : sessionStorage.getItem('order_no'),
                chang_leave_time : that.leave_time_xz,
                total_continue_day : null,
                total_day : null,
                remark : null,
              },
            }).then((res)=>{
              console.info(JSON.stringify(res));
              sessionStorage.setItem('pay_data',JSON.stringify(res.data));
              this.$router.push({path:'/pay-type',query:{flag:'ext'}});
            }).catch((err)=>{
              console.info(err);
            })
          }else{
            that.hintInfo('warning','请选择续住截止日期！')
          }
        },
        // 组件的方法
        cut(){
          if(this.figure>0){
            this.figure--;
          }else {
            return;
          }
        },
        add(){
          if(this.figure<5){
            this.figure++;
          }else {
            return;
          }
        },
        /**
         * @clickDay 点击某一天的事件
         * @param data
         */
        clickDay() {
          let that = this;
          /**
           * 获取当前的日期
           * @type {Date}
           */
          //离店时间
          console.info(that.leave_time_xz);
          let new_date = new Date();
          let curr_date = new_date.getFullYear()+'-'+ (new_date.getMonth()+1)+'-'+new_date.getDate();
          that.DayNum = that.DateDiff(curr_date,that.leave_time_xz);
          sessionStorage.setItem('check_in_day',that.DayNum);
          console.info(sessionStorage.getItem(that.room_type_code));
          that.$axios({
             method: 'post',
             url : that.url,
             data : {
               room_type : that.room_type_code ? that.room_type_code : undefined,
               begin_date : that.EndTime ? that.EndTime : '2019-09-20',
               end_date : that.leave_time_xz,
               rate_code : that.rate_code
             }
          }).then((res)=>{
             //console.info(JSON.stringify(res));
             let count_price = 0;
             let data_list = res.data.data.data[0].price_list;
             for(let i in data_list){
                 //console.info(JSON.stringify(data_list[i].day_price));
                 count_price = count_price  + Math.ceil(data_list[i].day_price);
                 //count_price = count_price  + Math.ceil(((data_list[i].day_price) * this.present_value).toFixed(2))
             }
             console.info(count_price);
             that.PayMoney = count_price;
             sessionStorage.setItem('day_price',that.PayMoney);
          }).catch((err)=>{
             console.error(err);
          })
          console.info("续住天数为："+that.DayNum)
        },
        changeDate(data) {
          console.log(data); //左右点击切换月份
        },
        clickToday(data) {
          console.log(data); //跳到了本月
        },

        /**
         * @DateDiff 计算相差的天数
         * @param Date_end 结束时间
         * @param Date_start 开始时间
         * @returns {number} 相差天数
         */
        DateDiff(Date_end, Date_start){
          let  aDate,  oDate1,  oDate2,  iDays;
          aDate   =  Date_end.split("-"); //获取第一个数组的值
          oDate1 = new Date(aDate[0] , aDate[1] ,aDate[2]);  //将前半个数组以-拆分，每一个是一个数值
          aDate   =  Date_start.split("-");
          oDate2 = new Date(aDate[0] , aDate[1] , aDate[2]);
          iDays   =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数
          return  iDays;
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
          }else if(hint == "warning"){
            that.$message({
              message: info,
              type: 'warning'
            });
          }else{
            this.$message.error('出错了！');
          }
        },

      },
      components:{
        Calendar
      },

  }
</script>

<style lang="less" scoped>
  .ext-sel-info {
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
      .cinIdCard{
        width: 800px;
        margin: auto;
        font-size:26px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 96px;
        .cardScanView{
          margin:50px 0;
          padding: 40px 0;
          background: #000;
          height: 500px;
          .IdCardView{
            width: 570px;
            height: 358px;
            margin:0 auto 40px auto;
            /* border: 1px red solid; */
          }
          .loadMsg{
            color: #ffffff;
          }
        }
      }
      .errView{
        width: 600px;
        margin: auto;
        color: #ffffff;
        margin-top: 142px;
        img{
          width: 100%;
        }
      }
      .message{
        width: 900px;
        height: 600px;
        margin: auto;
        margin-top: 69px;
        display: flex;

        li{
          flex-grow: 1;
        }
        .submitOrder{
          width: 450px;
          height: 600px;
          display: flex;
          background:rgba(255,255,255,1);
          ul{
            flex-wrap: wrap;
            font-size:26px;
            text-align: left;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:24px;
            li{
              margin-top: 32px;
              margin-left: 17px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(51,51,51,1);
              /*line-height:24px;*/
              .price{
                width:100px;
                height:30px;
                display: inline-block;
                text-align: center;
                line-height: 30px;
                background:rgba(0,123,219,1);
                border-radius:15px;
                font-size:16px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                margin-left: 24px;
              }
              div{
                display: inline-block;
                font-size:22px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(119,119,119,1);
                line-height:24px;
                margin-left: 21px;
                position: relative;

                img{
                  position: absolute;
                  top: -9px;
                  left: -9px;
                }
              }
              .deposit{
                font-size:16px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(128,127,127,1);
                line-height:24px;
                margin-left: 154px;
                margin-top: 12px;
              }
            }
          }
          .cancel{
            width:450px;
            height:60px;
            margin-left: -16px;
            background:rgba(238,238,238,1);
            font-size:22px;
            font-weight:400;
            line-height:60px;
            text-align: center;
            color:rgba(51,51,51,1);
            margin-top: 32px;
          }
        }
        .calendar{
          width: 450px;
          height: 600px;
          position: relative;
          background-color:  rgba(252,252,252,1);
          .title{
            width: 450px;

            li{
              ul{
                display: flex;
                justify-content:  space-between ;
                li{
                  height: 59px;
                  line-height: 59px;
                  font-size:22px;
                  font-family:PingFangSC-Regular;
                  font-weight:400;
                  color:rgba(51,51,51,1);
                }
              }
            }
          }
          .Daymany{
            height: 426px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            overflow-y:auto;
            color:rgba(119,119,119,1);
            li{
             overflow: hidden;
              height: 60px;
              span{
                float: left;
                line-height: 60px;
              }
              input{
                width:24px;
                height:24px;
                border: rgba(0,123,219,1);
                margin-left: 40px;
                margin-top: 18px;
              }
            }
          }
          .present{
            width:450px;
            height:60px;
            background:rgba(0,123,219,1);
            font-size:22px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:60px;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }

      }
    }

  }
</style>
