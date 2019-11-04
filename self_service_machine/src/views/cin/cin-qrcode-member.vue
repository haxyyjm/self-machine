<template>
  <div class="cin-checkin">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <span>请扫描二维码</span>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="cin-inquire">
        <ul>
          <li class="listItem">
            <input ref='gain'  v-model="member_code" placeholder="请扫描二维码"/>
            <button @click="search_qrcode">查询</button>
          </li>
        </ul>
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
    name: "cin-qrcode-member",
    data(){
      return{
        member_code : '',
        qrcode_flag : '',
      }
    },

    created(){
      this.$nextTick( () =>{
        this.$refs.gain.focus()
      })
      this.qrcode_flag = this.$route.params['qrcode_flag']; //现需要判断是从哪一个页面进到当前的身份证识别的页面的。
      console.info(this.qrcode_flag);
      //this.handleSpeak('请将二维码放到自助机右下角进行扫描')
    },
    methods : {
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
      search_qrcode(){
        /**
         * 根据二维码查询是不是会员/团队
         */
        if(this.qrcode_flag === 'member'){
          if(this.member_code){
            this.$axios({
              method : 'post',
              url : this.api.api_price + '/v1/customer/machine/search_card_by_info/',
              data : {
                search_type : 1,
                info : this.member_code //这里是会员号
              }
            }).then((res)=>{
              console.info(res);
              if(res.data.message === 'success'){
                //this.hintInfo('success','查询成功！');
                sessionStorage.setItem('rate_code',res.data.data.card_info.rate_code); //将会员房价码缓存下来
                sessionStorage.setItem('card_level',res.data.data.card_info.card_level); //将会员等级缓存下来
                sessionStorage.setItem('card_name',res.data.data.card_info.card_name); //将会员名字缓存下来
                this.$router.push({path:'/cin-nores'});// 存在会员信息
              }else{
                //如果没有预定信息的时候直接提示不存在用户信息
                //this.hintInfo('warning',res.data.message);
                //this.handleSpeak('未查到任何会员信息');
                instance('未检测到会员信息')
                //this.hintInfo('warning','未检测到会员信息');
                this.member_code = "";
              }
            }).catch((err)=>{
              console.error(err);
            })
          }else{
            //this.handleSpeak('未检测到二维码信息，请重新扫描')
            instance('未检测到二维码信息，请重新扫描')
            //this.hintInfo('warning','未检测到二维码信息，请重新扫描');
          }
        }else if(this.qrcode_flag === 'xieyi'){
          if(this.member_code){
            // /v1/customer/coupon/get_coupon_detail_by_no/
            this.$axios({
              method : 'post',
              url : this.api.api_price + '/v1/customer/coupon/get_coupon_detail_by_no/',
              data : {
                no : this.member_code //这里是团队的二维码
              }
            }).then((res)=>{
              console.info(res);
              if(res.data.message === 'success'){
                //this.hintInfo('success','查询成功！');
                sessionStorage.setItem('coupon_type',res.data.data.coupon_data.coupon_type); //将折扣券类型缓存下来
                sessionStorage.setItem('coupon_id',res.data.data.coupon_data.id); //将协议公司的id缓存
                sessionStorage.setItem('rate_code',res.data.data.coupon_data.company_data.rate_code)//房价码缓存
                sessionStorage.setItem('treaty',res.data.data.coupon_data.name); //将会员名字缓存下来
                this.$router.push({path:'/cin-nores'});// 存在会员信息
              }else{
                //this.handleSpeak('未查到团队信息');
                //如果没有预定信息的时候直接提示不存在用户信息
                instance('未检测到团队信息')
                //this.hintInfo('warning','未检测到团队信息');
                this.member_code = "";
              }
            }).catch((err)=>{
              console.error(err);
            })
          }else{
            instance('未检测到二维码信息，请重新扫描')
            //this.hintInfo('warning','未检测到二维码信息，请重新扫描');
            //this.handleSpeak('未检测到二维码信息，请重新扫描')
          }
        }else{
          if(this.member_code){
            //这个是根据订单号查询订单
            // /v1/customer/coupon/get_coupon_detail_by_no/
            this.$axios({
              method : 'get',
              url : this.api.api_bill + '/v1/booking/get_order_reserve_info/',
              params : {
                order_no : this.member_code, //这里是订单号
              }
            }).then((res)=>{
              console.info(res)
              if(res.data.data.results.length > 0){
                //that.hintInfo('success','查询成功！');
                /**
                 * 将查询到的参数进行缓存，需要缓存的是预定信息
                 * that.room_type = sessionStorage.getItem('room_type');
                 that.day_price = sessionStorage.getItem('day_price');
                 that.room_no = sessionStorage.getItem('room_no');
                 that.begin_date = sessionStorage.getItem('begin_date').split(' ')[0];
                 that.end_date = sessionStorage.getItem('end_date');
                 that.room_type_name = sessionStorage.getItem('room_type_name');
                 */
                sessionStorage.setItem('results',JSON.stringify(res.data.data.results));  //这里如果查询出来了信息。直接缓存下来，展示到下一个信息展示的界面，cin-orderlist
                this.$router.push({name:'/cin-orderlist',params:{flag:'prev_order'}});// 有预定信息
              }else{
                //如果没有预定信息的时候直接提示不存在用户信息
                instance('该二维码没有任何预订信息')
                //that.hintInfo('warning','该手机号没有任何预订信息');
                //that.handleSpeak('该手机号没有任何预订信息');
                this.clavier = "";
              }
            }).catch((err)=>{
              instance('系统错误')
              console.error(err);
            })
          }else{
            instance('未检测到二维码信息，请重新扫描')
            //this.hintInfo('warning','未检测到二维码信息，请重新扫描');
            //this.handleSpeak('未检测到二维码信息，请重新扫描')
          }
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
    },
    watch:{
      // member_code(val){
      //   if(val){
      //     /**
      //      * 根据二维码查询是不是会员
      //      */
      //     this.$axios({
      //       method : 'post',
      //       url : this.api.api_price + '/v1/customer/machine/search_card_by_info/',
      //       data : {
      //         search_type : 1,
      //         info : val //这里是会员号
      //       }
      //     }).then((res)=>{
      //       console.info(res);
      //       if(res.data.message === 'success'){
      //         this.hintInfo('success','查询成功！');
      //         sessionStorage.setItem('rate_code',res.data.data.card_info.rate_code); //将会员房价码缓存下来
      //         sessionStorage.setItem('card_level',res.data.data.card_info.card_level); //将会员等级缓存下来
      //         sessionStorage.setItem('card_name',res.data.data.card_info.card_name); //将会员名字缓存下来
      //         this.$router.push({path:'/cin-nores'});// 存在会员信息
      //       }else{
      //         //如果没有预定信息的时候直接提示不存在用户信息
      //         this.hintInfo('warning',res.data.message);
      //       }
      //     }).catch((err)=>{
      //       console.error(err);
      //     })
      //   }
      // },

    }
  }
</script>

<style lang="less" scoped>
  .cin-checkin {
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
        margin-bottom: 132px;
        span{
          width: 600px;
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
          margin-left: -88px;
        }
      }
      .cin-inquire{
        ul{
          margin: auto;
          width: 600px;
          li{
            margin: 40px 0;
            cursor: pointer;
            .listImg{
              width: 600px;
              height: 200px;
              img{
                width: 100%;
              }
            }
          }
        }
        .listItem{
          input{
            border: 1px solid #0f0f0f;
            width: 600px;
            height: 100px;
            border-radius: 10px;
            font-size: xx-large;
            text-align: center;
          }
          button{
            width: 200px;
            height: 50px;
            border: none;
            background: #00afeb;
            color: #FFFFFF;
            font-size: xx-large;
            border-radius: 10px;
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>
