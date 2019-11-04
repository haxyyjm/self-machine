<template>
  <div class="cut-rooms-info">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <span>请确认房务信息</span>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="cutRoomInfo">
        <!-- 左边部分 -->
        <div class="cutInfoView">
          <div class="cutTop">
            <ul class="leftUl">
              <li><span>入住人：</span> {{ userName }}</li>
              <li><span>房间号：</span> {{ roomNum }}</li>
              <li><span>房间类型：</span> {{ roomType }}</li>
              <li><span>入住时间：</span> {{ checkInDate }}</li>
              <li><span>手机号码： </span> {{ phoneNum }}</li>
              <li class="colorCg"><span>余额：</span> ￥ {{ backMoney }}.00</li>
            </ul>
            <p class="tips">正常查房后，余额将在24小时<br/>内退回到您的账户</p>
          </div>
          <div class="cutBot" @click="cancel">取消退房</div>
        </div>
        <!-- 右边部分 -->
        <div class="cutInfoView">
          <div class="cutTop">
            <p class="cutTitle">房间消费明细</p>
            <div class="tableList">
              <table style="width: 100%;">
                <thead>
                <tr>
                  <th>商品名称</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>金额</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in RoomInfoData.customDetail" :key="index">
                  <td>{{ item.goodsName }}</td>
                  <td>￥ {{ item.unitPrice }} .00</td>
                  <td>{{ item.quantity }}</td>
                  <td>￥ {{ item.sumFee }} .00</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td>合计</td>
                  <td></td>
                  <td></td>
                  <td>￥ {{ sumTotalFee }}.00</td>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="cutBot bgColor" @click="affirm ">确认退房</div>
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
    name: "success",
    data(){
      return{
        RoomInfoData:{
          userName: "王*",
          roomNum:8326,
          roomType:'舒适大床房',
          checkInDate:'2018/10/01-2018/10/02',
          phoneNum:'13812345678',
          backMoney:168.00,
          customDetail:[
            // TotalFee:32,
            // {
            //   goodsName:'咖啡',
            //   unitPrice:10.00,
            //   quantity:2,
            //   sumFee:20
            // },
            // {
            //   goodsName:'矿泉水',
            //   unitPrice:6.00,
            //   quantity:2,
            //   sumFee:12
            // }
          ]
        }
      }

    },
    created(){

      this.userName = sessionStorage.getItem('names');
      this.roomNum = sessionStorage.getItem('room_number');
      this.roomType = sessionStorage.getItem('room_type');
      this.checkInDate = sessionStorage.getItem('arr_time') + '-' + sessionStorage.getItem('leave_time');
      this.phoneNum = sessionStorage.getItem('');
      this.backMoney = -(sessionStorage.getItem('balance'));
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
      // 组件的方法
      //确认退房
      affirm(){
        let that = this;
        console.info(sessionStorage.getItem('account_id'));
        if(this.backMoney >= 0){
          let url =that.api.api_9022 + '/v1/finance/account_close_operation/add'
          that.$axios({
            method : 'post',
            url : url,
            data : {
              account_id : sessionStorage.getItem('account_id'), //在住返回来的主账id
              cashier : '',
              close_flag : 'c',
              remark : '',
              force : ''
            }
          }).then((res)=>{
            //退房成功
            console.info(JSON.stringify(res));
            if(res.data.message === 'success'){
              //that.hintInfo('success','退房成功');
              this.$router.push({path:'/check-out-succeed'});
            }else{
              //that.hintInfo('warning','退房失败');
              this.$router.push({path:'/check-out-error'});
            }
          }).catch((err)=>{
            console.error(JSON.stringify(err));
          })
        }else{
            //this.handleSpeak('余额不足，请结清余额进行办理退房');
             that.hintInfo('warning','余额不足，请结清余额');
        }
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
      //取消退房
      cancel(){
        this.$router.go(-1);//返回上一层
      }
    },
    watch: {
      // watch擅长处理的场景：一个数据影响多个数据
    },
    computed: {
      // computed擅长处理的场景：一个数据受多个数据影响
      sumTotalFee(){
        for(let i=0,totalFee=0,max=this.RoomInfoData.customDetail.length;i<max;i++){
          totalFee+=this.RoomInfoData.customDetail[i].sumFee;
          if(i==(max-1)){
            return totalFee;
          }
        }
      }
    },
    destroyed: function() {
      // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
    }
  }
</script>

<style lang="less" scoped>
  .cut-rooms-info {
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
      .cutRoomInfo{
        width: 900px;
        height: 600px;
        margin: auto;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        background-color: #ffffff;
        font-size: 26px;
        .cutInfoView{
          width: 50%;
          .cutTop{
            height: 540px;
            overflow: hidden;
            // 左边部分
            .leftUl{
              overflow: hidden;
              li{
                text-align: left;
                margin: 28px 0 28px 18px;
                color: #777777;
                font-size: 22px;
                span{
                  font-size: 26px;
                  color: #000000;
                }
              }
              .colorCg{
                color: #007BDB;
              }
            }
            .tips{
              font-size: 16px;
              color: #777777;
            }
            // 右边部分
            .cutTitle{
              color: #ffffff;
              height: 80px;
              line-height: 80px;
              background-color: #007BDB;
            }
            .tableList{
              height: 460px;
              overflow-y: scroll;
              font-size: 20px;
              table{
                line-height: 60px;
                color: #777777;
                border-collapse:collapse;
                border-spacing:0;
                thead{
                  height: 60px;
                  color: #000000;
                }
                tbody{
                  font-size: 20px;
                  tr{
                    border-top: 1px #eee solid;
                    background-color: #FCFCFC;
                  }
                }
                tfoot{
                  color: #007BDB;
                }

              }

            }
          }
          .cutBot{
            font-size: 22px;
            background-color: #EEEEEE;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
          }
          .bgColor{
            background-color: #007BDB;
            color: #ffffff;
          }


        }
      }
    }
  }
</style>
