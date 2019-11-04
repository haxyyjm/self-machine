<template>
 <div class="back" v-on:click="back">
   <img src=".././common/imgs/fanhui.png" alt="">
   <span>返回</span><span>{{'剩余'+seconds_timeout+'秒'}}</span>
 </div>
</template>

<script>
    export default {
        name: "return",
        data(){
        return  {
             //计时 90秒
             seconds_timeout : 60,
             time : '',
           }
        },
      /**
       * @created 页面加载的时候进行页面自减函数的间隔执行操作
       */
      created : function () {
        let that = this;
        that.time = setInterval(that.remain_sec,1000)
      },
      methods:{
        /**
         * @remain_sec 进行秒数自减的操作
         */
          remain_sec(){
              let that = this;
              if(that.seconds_timeout === 1){
                 that.$router.push({path:'/'});
              }else{
                 that.seconds_timeout--;
              }
          },
          back(){
            this.$router.go(-1);//返回上一层
          }
      },
      /**
       * @beforeDestroy  页面销毁前，将Interval清除
       */
      destroyed : function () {
            let that = this;
            clearInterval(that.time);
      }
    }
</script>

<style lang="less" scoped>
 .back{
   float: left;
   img{
     width: 43px;
     height: 34px;
     margin-left: 40px;
     float: left;
   }
   span{
     height:25px;
     font-size:26px;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(255,255,255,1);
     line-height:40px;
     float: left;
     margin-left: 8px;
   }
 }
</style>
