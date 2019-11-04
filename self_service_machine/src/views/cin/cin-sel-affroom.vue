<template>
  <div class="cin-sel-affroom">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <span>请选择房间并确认订单</span>
        <back-view></back-view>
      </div>
      <ul class="message">

        <li class="submitOrder">
          <ul >
            <p>舒适大床房</p>
            <li>房间号:<div>9527</div><span class="changed" @click="changed">换一间</span></li>
            <li>入住人数:
              <div style="margin-top: 10px;">
                <img src="../../common/imgs/cin/jianhao.png" alt="" style="position: absolute;top: -30px;left: -10px;width: 46px;height: 46px" @click="add">
                <span style="position: absolute;top: -19px;left: 71px">{{figure}}</span>
                <img src="../../common/imgs/cin/jiahao.png" alt="" style="position: absolute;top: -30px;left: 118px;width: 46px;height: 46px">
              </div>
            </li>
            <li>入住时间:<div>2018/10/01-2018/10/02</div></li>
            <li>联系方式（选填）:</li>
            <li><input type="text" placeholder="如有遗失物品，方便店内人员联系您"></li>
            <li>房间总计:
              <div>￥
                <span>864.00+200.00</span>
                <span style="color: red;font-size: 16px;vertical-align: top;margin-left: -10px">（押金）</span>
                <span class="price" @click="price">价格明细</span>
              </div>
              <div class="deposit">押金将在您退房时退回到您的账户</div>
            </li>
          </ul>
          <div class="present" @click="submit">提交</div>
        </li>
        <li><img src="../../common/imgs/cin/icn-fangjiantu.png" alt=""></li>
      </ul>
      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
      <!--底部结束-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "cin-nores",
    data() {
      return {
        figure:10,
      };
    },
    methods: {
      // 组件的方法
      add(){
        if(this.figure>0){
          this.figure--;
        }else {
          return;
        }
      },
      changed(){
        this.$router.push({path:'/cin-selroom'});

      },
      price(){
        this.$router.push({path:'/cin-detal-pri'});
      },
      submit(){
        this.$router.push({path:'/cin-id-card'});
      }
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
      console.log("Home done");
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
  .cin-sel-affroom {
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
          width: 540px;
          height: 600px;
          background:rgba(255,255,255,1);
          ul{
            font-size:26px;
            text-align: left;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:24px;
            p{
              width: 100%;
              text-align: center;
              margin-top: 33px;
              margin-bottom: 56px;
              font-size:36px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(0,123,219,1);
            }
            li{
              margin-top: 38px;
              margin-left: 17px;
              font-size:26px;
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
              input{
                width: 500px;
                height: 40px;
                border:none;
                border-bottom: 2px solid rgba(204,204,204,1);
                font-size:16px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(204,204,204,1);
              }
              .changed{
                display: inline-block;
                text-align: center;
                width:100px;
                height:30px;
                line-height: 30px;
                background:rgba(0,123,219,1);
                border-radius:15px;
                font-size:16px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                float: right;
                margin-right: 10px;
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
        }
        .present{
          width:540px;
          height:60px;
          background:rgba(0,123,219,1);
          margin-top: 30px;
          font-size:22px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:60px;
          text-align: center;
        }
      }

    }
  }


</style>
