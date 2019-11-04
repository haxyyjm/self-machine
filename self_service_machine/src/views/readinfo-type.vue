<template>
  <div class="cin-checkin">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <span>请选择{{option}}方式</span>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="cin-inquire">
        <ul>
          <li class="listItem">
            <button @click="phone_search">
              身份证{{option}}
            </button>
            <button @click="qrcode_search">
              房卡{{option}}
            </button>
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
  export default {
    name: "cin-team_type",
    data(){
      return{
        option : '续住',
        flag : '',
      }
    },
    created(){
      let that = this
      that.flag = that.$route.params['flag'] ? that.$route.params['flag']:sessionStorage.getItem('flag_back');
      if(that.flag === 'ext'){
        that.option = '续住'
      }else{
        that.option = '退房'
      }
    },
    methods : {
      /**
       * @phone_search 根据身份证查询在住信息
       */
      phone_search(){
        if(this.flag === 'cut'){
          this.$router.push({name:'/cin-id-card',params:{flag:'cut'}})
        }else{
          this.$router.push({name:'/cin-id-card',params:{flag:'ext'}})
        }
      },
      /**
       * @qrcode_search 根据读房卡进行操作
       */
      qrcode_search(){
        if(this.flag === 'cut'){
          this.$router.push({name:'/read-card',params:{flag:'cut'}})
        }else{
          this.$router.push({name:'/read-card',params:{flag:'ext'}})
        }
        //this.$router.push({name:"/cin-qrcode-member",params:{qrcode_flag:'member'}});//{name:'/cin-team-type',params:{flag:'member'}}
      }
    }
  }
</script>

<style lang="less" scoped>
  .cin-checkin {
    width: 1080px;
    height: 1920px;
    background: #fff url(../common/imgs/juxing.png) no-repeat center;
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
          button{
            border: none;
            background: #00afeb;
            color: #FFFFFF;
            font-size: xx-large;
            height: 199px;
            width: 600px;
            border-radius: 10px;
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>
