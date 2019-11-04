<template>
     <!--<div class="masking"></div>-->
     <!--上半部分开始-->
     <div class="crownTop">
       <!--头部欢迎标语-->
       <div class="head">
         <div  class="slogan">科冠晶品酒店 欢迎您的光临！</div>
         <ul class="timer">
           <li>{{nowTime}}</li>
           <li>{{week}}</li>
           <!--<li>天气晴</li>-->
           <li>{{nowTimer}}</li>
         </ul>
       </div>
       <!--中间自主入住标语-->
       <div class="cafeteria">
         <p class="checkIn">自助入住</p>
         <p class="esl">SELF-SERVICE CHECK-IN</p>
       </div>
       <!--支付方式的展示-->
       <ul class="alipay">
         <li>
           <div>
             <img src="../common/imgs/zhifubao.png" alt="">
           </div>
           <p>扫码支付</p>
         </li>
         <li>
           <div>
             <img src="../common/imgs/weixin.png" alt="">
           </div>
           <p>扫码支付</p>
         </li>
         <li>
           <div>
             <img src="../common/imgs/yinlian.png" alt="">
           </div>

           <p>扫码支付</p>
         </li>
       </ul>
       <div class="wire"></div>
     </div>
     <!--上半部分结束-->

</template>
<script>
    export default {
        name: "headH",
      data() {
        return {
          nowTime:"",
          nowTimer:"",
          week:"",
        };
      },
      methods: {
        // 组件的方法
        // 获取当前时间函数
        timeFormate(timeStamp) {
          let year = new Date(timeStamp).getFullYear();
          let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
          let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
          let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
          let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
          let str = "星期" + "日一二三四五六".charAt(new Date().getDay());
          this.week=str;
          // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
          // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
          this.nowTime = year + "年" + month + "月" + date +"日" ;
          this.nowTimer=hh+":"+mm ;
          // console.log(this.nowTime);
        },
// 定时器函数
        nowTimes(){
          this.timeFormate(new Date());
          setInterval(this.nowTimes,30*1000);
        },
      //  获取天气

      },
      watch: {
        // watch擅长处理的场景：一个数据影响多个数据
      },
      computed: {
        // computed擅长处理的场景：一个数据受多个数据影响
      },
      beforeCreate: function() {
        // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
      },
      created: function() {
        // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
      },
      beforeMount: function() {
        // 在挂载开始之前被调用：相关的 render 函数首次被调用。
      },
      mounted: function() {
        // 编译好的HTML挂载到页面完成后执行的事件钩子
        // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
        // 此钩子函数中一般会做一些ajax请求获取数据进行数据初始化
        this.nowTimes();
      },
      beforeUpdate: function() {
        // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
      },
      updated: function() {
        // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
        // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。
        // 该钩子在服务器端渲染期间不被调用。
      },
      beforeDestroy: function() {
        // 实例销毁之前调用。在这一步，实例仍然完全可用。
      },
      destroyed: function() {
        // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
      }
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

    /*height: 1920px;*/
    /*background-image: url(../common/imgs/juxing.png) ;*/
    /*background-repeat: no-repeat;*/
    /*position: relative;*/
    /*.masking{*/
      /*width:1080px;*/
      /*height:1920px;*/
      /*background:rgba(7,13,32,1);*/
      /*opacity:0.9;*/
    /*}*/
    /*上半部分开始*/
      .crownTop{

        .head{
          overflow: hidden;
          width:1080px;
          height:60px;
          background:rgba(15,15,15,1);
          .slogan{
            /*width:366px;*/
            height:27px;
            margin: 16px 265px 17px 20px;
            font-size:26px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:26px;
            float: left;
          }
          .timer{
            width:415px;
            height:20px;
            font-size:20px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:20px;
            margin-top: 20px;
            margin-right: 21px;
            display: flex;
            li{
              flex-grow: 1; /* default 0 */
            }
          }
        }
        .cafeteria{
          width:990px;
          height:390px;
          background:rgba(15,15,15,1);
          border:5px solid rgba(119,119,119,1);
          border-radius:10px;
          margin:61px 35px 71px 35px;
          .checkIn{
            /*width:783px;*/
            /*height:186px;*/
            font-size:200px;
            text-align: center;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            /*line-height:26px;*/
          }
          .esl{
            width: 810px;
            font-size:60px;
            text-align: center;
            margin-top: 45px;
            margin-left: 95px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(254,255,255,1);
            line-height:26px;
          }
        }
        .alipay{
          width:900px ;
          height: 206px;
          margin: 71px 80px  37px 80px;
          overflow: hidden;
          li{
            float: left;
            margin-left:50px;
            div{
              width: 250px;
              height: 130px;
            }
            img{
              width: 250px;
              height: 130px;

            }
            p{
              width:250px;
              height:28px;
              text-align: center;
              margin-top: 13px;
              font-size:30px;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(255,255,255,1);
              line-height:26px;
            }
          }
        }

      }
      .wire{
        width:1080px;
        height:2px;
        margin-bottom: 23px;
        background:rgba(255,255,255,1);
      }


</style>
