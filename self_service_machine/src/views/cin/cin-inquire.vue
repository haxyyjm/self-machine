<template>
  <div class="cin-checkin">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <span>请选择订单查询方式</span>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="cin-inquire">
        <ul >
          <li v-for="(item,index) in inquireList" :key="index" class="listItem">
            <div class="listImg">
              <router-link :to="{name:item.path,params:{flag:'cin'}}">
                 <img :src="item.url" :alt="item.desc">
              </router-link>
            </div>
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
  export default {
    name: "cin-inquire",
    data(){
      return{
        inquireList:[
          // {
          //   id:0,
          //   url:require("@/common/imgs/cin/cin-inquire-idcard.png"),
          //   desc:"刷二代身份证",
          //   path:"/cin-id-card",
          //   name:"/cin-id-card",
          // },
          {
            id:1,
            url:require("@/common/imgs/cin/cin-inquire-ordernum.png"),
            desc:"手机号输入",
            path:"/cin-phone",
            name:"/cin-phone"
          },

        ]

      }

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
      }
    }
  }
</style>
