<template>
  <div id="app">
   <!--<router-link to="/HelloWorld">111</router-link>-->
    <!--<HelloWorld/>-->
    <!--添加路由跳转-->
    <!--<router-link to="/home">自助机</router-link>-->
    <!--添加视图窗口，展示路由对应组件-->
    <!--<transition :name="transitionName">-->
      <router-view></router-view>
    <!--</transition>-->
  </div>
</template>

<script>
import HelloWorld from './components/main_self'
import './common/js/rem'


export default {
  name: 'App',
  data(){
    return {
      transitionName:'slide-left'
    }
  },
  components: {
    HelloWorld
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-right';
      }else if(to.fullPath === "/"){
        this.transitionName = 'slide-right';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  },
}
</script>

<style lang="less">
  @import "common/css/reset.css";
 #app{
   width: 1080px;
   height: 1920px;
   text-align: center;
 }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0.7;
    transform: translate3d(0, -100%, 0);
  }
  .slide-right-leave-active {
    opacity: 0.7;
    transform: translate3d(0, 100%, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
 /* html,body{
    transform: scale(.5)
  }*/
</style>
