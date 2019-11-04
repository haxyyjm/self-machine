<template>
  <div class="cin-phone">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
           <span>请输入信息</span>
        <back-view></back-view>
      </div>
      <!--输入手机号或订单号-->
      <!--<div class="phone">-->
      <div class="phone" v-show="showKeyboard" @clickoutside="closeModal">
        <p>请输入您的手机号</p>
        <div class="inputField">
          <input type="text" max-length="11" placeholder="请输入您的手机号"  :value="clavier">
          <button @click="inquire">查询</button>
        </div>
        <div class="clavier" style="position: relative">
          <div v-for="keys in keyList" class="clavier-i">
            <template v-for="key in keys">
              <i v-if="key === 'top'" @click.stop="clickKey"  class="iconfont icon-zhiding tab-top"></i>
              <i v-else-if="key === '123'" @click.stop="clickKey"  class="tab-num">123</i>
              <i v-else-if="key === 'del'" @click.stop="clickKey"  id="del"  class="iconfont icon-delete key-delete"></i>
              <i v-else-if="key === 'blank'" @click.stop="clickKey"  class="iconfont icon-konggejian-jianpanyong tab-blank"></i>
              <i v-else-if="key === 'symbol'" @click.stop="clickKey"  class="tab-symbol">符</i>
              <i v-else-if="key === 'point'" @click.stop="clickKey"  class="tab-point">88888</i>
              <i v-else-if="key === 'enter'" @click.stop="clickKey"  class="iconfont icon-huiche tab-enter"></i>
              <i v-else @click.stop="clickKey" >{{key}}</i>
            </template>
          </div>
          <p class="according">En</p>
          <p class="delete" @click="remove"><img src="../../common/imgs/cin/cin-quxiao.png" alt=""></p>
        </div>

      <!--输入手机号或订单号-->


      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
      <!--底部结束-->
    </div>
  </div>
  </div>
</template>

<script>
  //const synth = window.speechSynthesis;
  //const msg = new SpeechSynthesisUtterance();
  import aa from "../../common/js/cin-phone";
  import {instance} from '../../common/js/instance'
    export default {
        name: "cin-phone",
      data() {
        return {
          number:true,
          //声明input的value值
          clavier: '',
          //声明键盘的变量
          showKeyboard:true,
          keyList: [],
          //查询预定单的参数
          data_arriving : {},
          //公共的请求参数
          data_obj : {},
          //页面缓存的参数
          params : {},
          //url
          url : '',
          status: 2,//0 小写 1 大写 2 数字 3 符号
          lowercase: [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['','0','del'],
          ],
          //equip:!!navigator.userAgent.toLocaleLowerCase().match(/ipad|mobile/i)//是否是移动设备
          //声明键盘的变量结束
        };
      },
      props:{
        //  键盘事件
        option: {
          type: Object
        }
      },
      created: function() {
        /**
         * 拿到页面缓存的基本信息
         * @type {default}
         */
        console.info(this.clavier);
        //this.handleSpeak('请输入预定使用的手机号');
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
        //键盘事件的开始
        tabHandle({ value = '' }) {
          if(value.indexOf('tab-num') > -1){
            this.status = 2
            //数字键盘数据
          }else if(value.indexOf('key-delete') > -1){
            console.log(value.indexOf('key-delete'))
            this.emitValue('delete')
          }else if(value.indexOf('tab-blank') > -1){
            this.emitValue(' ')
          }else if(value.indexOf('tab-enter') > -1){
            this.emitValue('\n')
          }else if(value.indexOf('tab-point') > -1){
            this.emitValue('.')
          }else if(value.indexOf('tab-symbol') > -1){
            this.status = 3
          }else if(value.indexOf('tab-top') > -1){
            if(this.status === 0){
              this.status = 1
            }else{
              this.status = 0
              this.keyList = this.lowercase
            }
          }else{

          }
        },
        clickKey(event) {
          // if(event.type === 'click' && this.equip) return
          let value = event.srcElement.innerText;
          let id = event.srcElement.id;
          let target = event.srcElement ? event.srcElement : event.target;
          if(id !== '' && id === 'del'){//如果点击的是id为del的表示是删除
            this.emitValue(id);
          }else if (id !=='' && id==='En'){
            this.emitValue(id);
          }
          else{//否则
            value && id !== 'del'? this.emitValue(value) : this.tabHandle(target.classList);
          }
        },
        emitValue(key) {
          this.$emit('keyVal', key);
          this.clavier+=key;
        },
        closeModal(e) {
          if (e.target !== this.option.sourceDom) {
            // this.showKeyboard = false
            this.$emit('close', false);
          }
        },
        //点击键盘的删除
        remove(){
          let str = this.clavier;
            this.clavier = str.slice(0,str.length-1);
        },
        //键盘事件的结束
        //点击查询后跳转订单列表
        inquire:function(){
          let that = this;
          /**
           * 查询是否在住  这是有预定入住的流程
           * 根据身份证查询订单
           */
          if(!(/^1[3456789]\d{9}$/.test(that.clavier))){
            instance('手机号输入错误，请核对')
            //that.hintInfo('warning','手机号输入错误，请核对')
            //that.handleSpeak('手机号输入错误，请核对');
          }else{
            that.$axios({
              method : 'post',
              url : that.api.api_zt + 'booking/get_all_reserve_info/?page_size=300',
              data : {
                search_type : "3",
                telephone_master : that.clavier, //这里是手机号
              }
            }).then((res)=>{
              if(res.data.data.results.length>0){
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
                sessionStorage.setItem('clavier',that.clavier)
                sessionStorage.setItem('results',JSON.stringify(res.data.data.results));  //这里如果查询出来了信息。直接缓存下来，展示到下一个信息展示的界面，cin-orderlist
                that.$router.push({name:'/cin-orderlist',params:{flag:'prev_order'}});// 有预定信息
              }else{
                //如果没有预定信息的时候直接提示不存在用户信息
                instance('该手机号没有任何预订信息')
                //that.hintInfo('warning','该手机号没有任何预订信息');
                //that.handleSpeak('该手机号没有任何预订信息');
                that.clavier = "";
              }
            }).catch((err)=>{
              console.error(err);
            })
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
      /**
       *
       */
      mounted: function() {
        // 编译好的HTML挂载到页面完成后执行的事件钩子
        // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
        // 此钩子函数中一般会做一些ajax请求获取数据进行数据初始化
        //键盘事件
        this.keyList = this.lowercase
      },
    }
</script>

<style lang="less" scoped>
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
  .cin-phone {
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
      .phone{
        width:500px;
        height:650px;
        background:rgba(15,15,15,1);
        margin:  auto;
        margin-top: 69px;
        p{
          width: 400px;
          text-align: center;
          font-size:22px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(254,254,254,1);
          line-height:24px;
          margin: auto;
          padding-top: 68px;
          margin-bottom:32px ;
        }
        .inputField{
          width:400px;
          height:60px;
          position: relative;
          margin: auto;
          margin-bottom: 35px;
          input{
            width:300px;
            height:60px;
            position: absolute;
            top: 0;
            left: 0;
            background:rgba(255,255,255,1);
            /*border-radius:10px;*/
            border-top-left-radius:10px;
            border-bottom-left-radius:10px;
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(90,150,224,1);
            text-align: center;
            outline:none;
          }
          input::-webkit-input-placeholder {
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(90,150,224,1);
            /* placeholder位置  */
            text-align: center;
          }
          button{
            display: inline-block;
            width: 100px;
            height: 60px;
            position: absolute;
            right: 0;
            top: 0;
            background:rgba(0,37,164,1);
            border-radius:0px 10px 10px 0px;
            font-size:22px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(254,254,254,1);
            text-align: center;
            line-height: 60px;
            border: none;
            outline:none;
          }
        }
        .clavier{
          width:398px;
          height:398px;
          background:rgba(255,255,255,1);
          border-radius:10px;
          margin: auto;
          border-collapse:collapse;
          border-radius:10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .clavier-i{
            width:398px;
            display: flex;
            position: relative;
            border-bottom: 1px solid rgba(204,204,204,1);
            border-radius:10px;
            i{
              /*border:1px solid rgba(204,204,204,1);*/
              border-right:1px solid rgba(204,204,204,1);
              /*border-left: none;*/
              width: 132px;
              height: 98px;
              flex-grow: 1;
              font-size:40px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(51,51,51,1);
              text-align: center;
              line-height: 99px;
              border-bottom: none;
            }
            i:last-child{
             border-right: none;
            }
          }
          p{
            position: absolute;
            bottom: 0;
            width: 132px;
            height: 98px;
            padding: 0;
          }
          .delete{
             right: 0;

            img{
              width: 56px;
              height: 36px;
              margin: auto;
              margin-top: 64px;
            }
          }
          .according{
            left: 0;
            font-size:40px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            text-align: center;
            line-height: 99px;
            margin: 0;
          }

        }
      }




    }

  }
</style>
