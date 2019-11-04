<template>
  <div class="payment">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <div class="return">
        <home-back></home-back>
        <back-view></back-view>
      </div>
      <!--中间部分开始-->
      <div class="cinCode">
        <div class="codeTypeImg">
          <img :src="codeTypeImg" alt="支付方式">
        </div>
        <div class="codeImg">
          <img src="../common/imgs/erweima.png" alt="二维码">
        </div>
        <p class="loadMsg">请扫描上方二维码，进行支付</p>
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
    name: "payment",
    data() {
      return {
        codeTypeImg: require('../common/imgs/code-alipay.png')

      }

    },
    methods: {
      // 组件的方法


    },
    watch: {
      // watch擅长处理的场景：一个数据影响多个数据
    },
    computed: {
      // computed擅长处理的场景：一个数据受多个数据影响
    },
    beforeCreate: function () {
      // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
    },
    created: function () {

      // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：
      // 数据观测(data observer)，属性和方法的运算， watch/event 事件回调。
      // 然而，挂载阶段还没开始，$el 属性目前不可见。

    },
    beforeMount: function () {
      // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    },
    mounted: function () {
      // 编译好的HTML挂载到页面完成后执行的事件钩子
      // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
      // 此钩子函数中一般会做一些ajax请求获取数据进行数据初始化
      console.log("Home done");


    },
    beforeUpdate: function () {
      // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
    },
    updated: function () {
      // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
      // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。
      // 该钩子在服务器端渲染期间不被调用。
    },
    beforeDestroy: function () {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
    },
    destroyed: function () {
      // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
    }
  }
</script>

<style lang="less" scoped>
  .payment {
    width: 1080px;
    height: 1920px;
    background: #fff url(../common/imgs/juxing.png) no-repeat center;
    position: relative;

    .masking {
      width: 1080px;
      height: 1920px;
      background: rgba(7, 13, 32, 0.9);

      .return {
        overflow: hidden;
      }

      .cinIdCard {
        width: 800px;
        margin: auto;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-top: 96px;

        .cardScanView {
          margin: 50px 0;
          padding: 40px 0;
          background: #000;
          height: 500px;

          .IdCardView {
            width: 570px;
            height: 358px;
            margin: 0 auto 40px auto;
            /* border: 1px red solid; */
          }

          .loadMsg {
            color: #ffffff;
          }
        }
      }

      .cinCode {
        width: 900px;
        margin: auto;
        font-size: 30px;
        color: #ffffff;
        background: #000000;
        margin-top: 92px;
        overflow: hidden;

        .codeTypeImg {
          width: 260px;
          height: 76px;
          margin: 70px auto 40px auto;

          .codeTypeImg img {
            width: 100%;
            margin-top: 100px;
          }
        }

        .codeImg {
          width: 260px;
          height: 260px;
          margin: auto;

          .codeImg img {
            width: 260px;
          }
        }

        .loadMsg {
          font-size: 30px;
          margin: 65px auto 60px auto;
        }
      }
    }
  }
</style>
