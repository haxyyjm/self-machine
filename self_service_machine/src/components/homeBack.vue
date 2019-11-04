<template>
  <router-link to="/">
      <div class="homeBack">
        <span>主页</span>
        <img src="../common/imgs/zhuye.png" alt="">
      </div>
  </router-link>

</template>

<script>
    export default {
        name: "home-back",
    }
</script>

<style  lang="less" scoped>
  .homeBack{
    float: right;
    margin-right: 40px;
     span{
       height:25px;
       font-size:26px;
       font-family:PingFangSC-Regular;
       font-weight:400;
       color:rgba(255,255,255,1);
       line-height:35px;
       float: left;
       margin-right: 8px;
     }
    img{
      width: 30px;
      height: 30px;
      float: left;
    }
  }
</style>
