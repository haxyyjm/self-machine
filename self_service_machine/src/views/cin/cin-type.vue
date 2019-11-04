<template>
  <div class="cin-checkin">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <span>请选择入住类型</span>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="cin-type">
        <ul>
          <li v-for="(item,index) in typeList" :key="index" class="listItem">
            <div class="listImg">
              <router-link :to="item.path">
                <img :src="item.url" :alt="item.desc">
              </router-link>
            </div>
            <p>{{ item.desc }}</p>
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
    name: "cinType",
    data() {
      return {
        typeList: [
          {
            id: 0,
            url: require("@/common/imgs/cin/cin-type-ordered.png"),
            desc: "有预订",
            path: "/cin-phone"
          },
          {
            id: 1,
            url: require("@/common/imgs/cin/cin-type-noorder.png"),
            desc: "无预订",
            path: "/cin-nores"
          },
          {
            id: 2,
            url: require("@/common/imgs/cin/cin-type-team.png"),
            desc: "团队",
            path: {name: '/cin-qrcode-member', params: {qrcode_flag: 'team'}}
          },
          {
            id: 3,
            url: require("@/common/imgs/cin/cin-type-member.png"),
            desc: "会员",
            path: {name: '/cin-team-type', params: {qrcode_flag: 'member'}}
          },
          {
            id: 4,
            url: require("@/common/imgs/cin/cin-type-protocol.png"),
            desc: "协议",
            path: {name: '/cin-qrcode-member', params: {qrcode_flag: 'xieyi'}}
          },
          {
            id: 5,
            url: require("@/common/imgs/cin/cin-type-spare.png"),
            desc: "拼房",
            path: ""
          }
        ]

      }

    },
    created(){
      //this.handleSpeak('请选择入住类型');
    },
    methods: {
     /*
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
      /*
      * 语音停止
      */
      // handleStop(e) {
      //   msg.text = e;
      //   msg.lang = 'zh-CN';
      //   synth.cancel(msg);
      // }
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

      .return {
        overflow: hidden;
        height: 40px;
        margin-bottom: 70px;

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
          margin-right: 110px;
        }
      }

      .cin-type {
        ul {
          margin: auto;
          width: 870px;

          li {
            display: inline-block;
            margin: 40px 45px;
            cursor: pointer;
            text-align: center;
            font-size: 30px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 24px;

            .listImg {
              width: 200px;
              height: 200px;

              img {
                width: 100%;
              }
            }

            p {
              margin-top: 33px;
              font-size: 30px;
            }
          }
        }
      }
    }
  }
</style>
