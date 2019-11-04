<template>
  <div class="cin-detal-pri">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <span>房间价格明细</span>
        <back-view></back-view>
      </div>
      <div class="cinDetailPrice">
        <table style="width: 100%;">
          <thead>
          <tr>
            <th>房间类型</th>
            <th>间数</th>
            <th>日期</th>
            <th>当日单价</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in priceDetail" :key="index">
            <td>{{ room_type }}</td>
            <td>{{ 1 }}</td>
            <td>{{ item.date }}</td>
            <td>￥ {{ item.day_price }} .00</td>
          </tr>
          </tbody>
        </table>
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
    name: "cin-detal-pri",
    data() {
      return{
        priceDetail:[
          {
            roomType:'舒适大床房',
            quantity:2,
            checkInDate:'2018-10-01',
            dailyPrice:598
          },
          {
            roomType:'舒适大床房',
            quantity:2,
            checkInDate:'2018-10-01',
            dailyPrice:598
          }
        ],
        room_type : '',
        price_list : '',
      }
    },
    created(){
      let that = this
      that.priceDetail = JSON.parse(sessionStorage.getItem('price_list'))
      that.room_type = sessionStorage.getItem('room_type')
    },
    methods: {
      // 组件的方法

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
  .cin-detal-pri {
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
      .indent{
        width:1000px;
        height:600px;
        overflow:auto;
        background:rgba(15,15,15,1);
        margin: auto;
        margin-top: 69px;
        .title{
          padding-top: 48px;
          font-size:20px;
          span{
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
        }
        .indent-select {
          width: 900px;
          height: 460px;
          margin: auto;
          margin-top: 20px;
          li {
            margin-top: 20px;

            .select-bt {
              width: 100%;
              height: 100px;
              display: flex;
              .genre {
                width: 750px;
                height: 100px;
                background: #F8F8F8;
                flex-grow: 1;
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
                ul {
                  display: flex;
                  li {
                    flex-grow: 1;
                    font-size: 22px;
                    line-height: 100px;
                    margin-left: 40px;
                    margin-top: 0;
                  }
                  li:nth-child(1) {
                    font-size: 16px;
                    padding-left: 15px;
                    margin: 0;
                    width: 125px;
                    text-align: center;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                  }
                }

              }
              .select-details {
                width: 150px;
                height: 100px;
                background: rgba(0, 123, 219, 1);
                flex-grow: 1;
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
                font-size: 26px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                line-height: 100px;
              }
            }
          }
        }
      }
      .cinDetailPrice{
        width: 900px;
        max-height: 600px;
        //margin: auto;
        background-color: #ffffff;
        font-size: 26px;
        margin-top: 86px;
        margin-left: 90px;
        table{
          line-height: 100px;
          border-collapse:collapse;
          border-spacing:0;
          thead{
            color: #ffffff;
            height: 100px;
            background-color: #007BDB;
          }
          tbody{
            height: 100px;
            tr{
              border-top: 1px #eeeeee;
            }
          }
        }
      }
    }
  }


</style>
