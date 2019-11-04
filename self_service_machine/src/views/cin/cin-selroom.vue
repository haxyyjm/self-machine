<template>
  <div class="cin-selroom">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <span>请选择您要入住的房间</span>
        <back-view></back-view>
      </div>
      <!--订单列表开始-->
      <div class="cinSelRoom">
        <p class="roomTitle">{{ chooseRoomData.roomTitle }} <span class="roomLeft"> (剩余{{ chooseRoomData.roomLeft }}间) </span></p>
        <!-- 中间部分 -->
        <div class="roomShow">
          <ul class="showLeft">
            <li @click="checkFloorIndex(index)" v-for="(item,index) in chooseRoomData.floorData" :key="index" :class="(index==floorIndex)?'active':''"><span>F {{ item.floorNum }} </span> 剩余{{ item. floorLeft}}间</li>
          </ul>
          <div class="showRight">
            <ul class="cellList">
              <li v-for="(item,index) in chooseRoomData.floorData[floorIndex].floorRoom" :key="index" :class="item.isChoose?'isChoose':''">{{ item.roomNum }}</li>
            </ul>
          </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
          <div class="cancle" @click="cancel ">取消</div>
          <div class="confirm" @click="affirm">确认</div>
        </div>
      </div>
      <!--订单列表结束-->

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
      return{
        floorIndex:0,
        chooseRoomData:{
          roomTitle:'舒适大床房',
          roomLeft:10,
          floorData:[
            {
              floorNum:5,
              floorLeft:4,
              floorRoom:[
                {
                  roomNum:'8501',
                  isChoose:false
                },
                {
                  roomNum:'8502',
                  isChoose:true
                },
                {
                  roomNum:'8503',
                  isChoose:false
                },
                {
                  roomNum:'8503',
                  isChoose:false
                },
                {
                  roomNum:'8503',
                  isChoose:true
                },
                {
                  roomNum:'8503',
                  isChoose:true
                },
                {
                  roomNum:'8503',
                  isChoose:false
                },
                {
                  roomNum:'8503',
                  isChoose:false
                },
                {
                  roomNum:'8503',
                  isChoose:true
                }
              ]
            },
            {
              floorNum:4,
              floorLeft:4,
              floorRoom:[
                {
                  roomNum:'8401',
                  isChoose:true
                },
                {
                  roomNum:'8402',
                  isChoose:false
                },
                {
                  roomNum:'8403',
                  isChoose:true
                }
              ]
            },
            {
              floorNum:3,
              floorLeft:2,
              floorRoom:[
                {
                  roomNum:'8301',
                  isChoose:false
                },
                {
                  roomNum:'8302',
                  isChoose:true
                },
                {
                  roomNum:'8303',
                  isChoose:false
                }
              ]
            },
          ]
        }

      }
    },
    methods: {
      // 组件的方法
      //点击确认
      affirm(){
        this.$router.push({path:'/cin-id-card'});
      },
      //点击取消
      cancel(){
        this.$router.go(-1);//返回上一层
      },
      checkFloorIndex(index){
        // 判断是否选中当前图层
        index!=this.floorIndex && (this.floorIndex=index);
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
  .cin-selroom {
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
      .cinSelRoom{
        width: 900px;
        height: 600px;
        margin: auto;
        background-color: #ffffff;
        margin-top: 86px;
        .roomTitle{
          line-height: 100px;
          color: #007BDB;
          font-size:36px;
          span{
            font-size:22px;
          }
        }
        .roomShow{
          width: 100%;
          overflow: hidden;
          .showLeft{
            width: 220px;
            height: 420px;
            float: left;
            overflow-y: scroll;
            li{
              line-height: 60px;
              color:  #777777;
              font-size: 20px;
              cursor: pointer;
              span{
                color: #333333;
                font-size: 24px;
              }
            }
            .active{
              border-left: 4px solid #007BDB;
              background:rgba(248,248,248,1);
            }
          }
          .showRight{
            width: 650px;
            float: left;
            height: 420px;
            padding: 20px 60px;
            .cellList{
              width: 100%;
              height: 100%;
              text-align: left;
              li{
                width: 100px;
                height: 100px;
                line-height: 100px;
                color: #ffffff;
                background-color: #007BDB;
                display: inline-block;
                text-align: center;
                margin: 2px;
                cursor: pointer;
                font-size: 30px;
              }
              .isChoose{
                background-color:#EEEEEE;
              }
            }

          }
          .showLeft::-webkit-scrollbar,.showRight::-webkit-scrollbar { width: 0 !important }
        }
        // 底部
        .footer{
          width: 100%;
          height: 60px;
          margin-top: 20px;
          line-height: 60px;
          display: flex;
          display: -webkit-flex;
          div{
            width: 50%;
            font-size: 22px;
            cursor: pointer;
          }
          .cancle{
            color: #333333;
            background-color:  #eeeeee;
          }
          .confirm{
            color: #ffffff;
            background-color:  #007BDB;
          }
        }
      }

    }
  }


</style>
