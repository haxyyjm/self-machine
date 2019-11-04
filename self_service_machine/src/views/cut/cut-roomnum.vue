<template>
  <div class="cut-roomnum">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <span>请选择您要退房的房间号</span>
        <back-view></back-view>
      </div>
      <!--订单列表开始-->
      <div class="phone" v-show="showKeyboard" @clickoutside="closeModal">
        <p>请输入您的房间号</p>
        <div class="inputField">
          <input type="text" placeholder="请输入您的房间号" :value="clavier">
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
      return {
        number:true,
        //生命input的value值
        clavier:"",
        //声明键盘的变量
        showKeyboard:true,
        keyList: [],
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
    methods: {
      // 组件的方法
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
        console.log(key)
        this.$emit('keyVal', key)
        this.clavier+=key;
      },
      closeModal(e) {
        if (e.target !== this.option.sourceDom) {
          // this.showKeyboard = false
          this.$emit('close', false)
        }
      },
      //点击键盘的删除
      remove(){
        let str = this.clavier;
        this.clavier = str.slice(0,str.length-1);

      },
      //键盘事件的结束
      //点击查询后跳转续住信息选择
      inquire:function(){
        if (this.clavier.length>0 ){
          console.log(this.clavier)
          // this.$router.go('/orderlist');
          this.$router.push({path:'/cut-rooms-info'});
        }

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
      //键盘事件
      this.keyList = this.lowercase
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
  .cut-roomnum {
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
        }
        .inputField{
          width:400px;
          height:60px;
          position: relative;
          margin: auto;
          margin-top: 32px;
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
              margin-top: 30px;
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
          }

        }
      }

    }
  }


</style>
