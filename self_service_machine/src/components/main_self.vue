<template>
  <div class="hello">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="center">
        <div class="brainpower">
          <div>
            <img src="../common/imgs/brainpower.png" alt="">
          </div>
          <p>欢迎使用颐陆自由人</p>
        </div>
        <ul class="function">
          <li>
            <div style="margin: 0">
              <router-link :to = "{path:'/cin-type'}">
                <img id="iterateEffects" class="pt-touch-button" src="../common/imgs/ruzhu.png" alt="" >
              </router-link>
            </div>
          </li>
          <li>
            <div>
              <!--<router-link :to = "{name:'/cin-id-card',params:{flag:'ext'}}">-->
              <router-link :to = "{name:'/readinfo-type',params:{flag:'ext'}}">
                <img src="../common/imgs/xuzhu.png" alt="">
              </router-link>
            </div>
          </li>
          <li>
            <div>
              <!--<router-link :to = "{name:'/cin-id-card',params:{flag:'cut'}}">-->
              <router-link :to = "{name:'/readinfo-type',params:{flag:'cut'}}">
                <img src="../common/imgs/tuifang.png" alt="">
              </router-link>

            </div>
          </li>
          <li>
            <div>
              <router-link to="/inv-invoice">
                <img src="../common/imgs/fapiao.png" alt="">
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
  import crypto from 'crypto'
export default {
  name: 'main_self',
  data () {
    return {
        //url : this.api.api_9022 + '/v1/',  //目前是只有线上的接口  不存在线下的接口
        //存放公共的请求参数
        //url : this.api.api_login + '/v1/',
        data_obj : {},
    }
  },
  created : function () {
    //版本迭代信息
    console.info('当前版本：V2 更新内容：更新读卡操作、手机号获取、入住的时候房间号不存在的情况处理。')
    /**
     * 需要做一次模拟的登陆
     */
    console.info(this.url);
    sessionStorage.clear();
    localStorage.clear();
    this.simulated_landing();
    //setTimeout(this.close_camera(),5000);
    this.close_camera();
    this.close_card();
    setInterval(this.myrefresh,300000)
  },
  methods :{
    /**
     * @made_card  制卡
     */
    made_card(){
     let that = this

    },
    /**
     * @myrefresh 定时刷新页面
     */
    myrefresh()
    {
            window.location.reload();
    },
    /**
     * @simulated_landing 模拟登陆
     */
    simulated_landing(){
      let that = this; 
      let username = "terminal_01";
      let pwd = "123456";
      let code = "SHJKJD";
      this.$axios({
            method: 'post',
            //url: that.url + 'common/employee/login',
            //url : that.url + 'common/employee/login/',
            url : that.api.api_zt + 'common/employee/login/',
            data: {
              code: code,
              user_name: username,
              password: that.getmd5(pwd),
            }
          }).then((res) => {
            console.info(res);
            if(res.data.message === "success") {
               //that.$router.push({path:'/cin-face'}); //调试摄像头代码
               //that.$router.push({name:'/cin-id-card',params:{flag:'no_res'}});
               //that.hintInfo('success','自助机数据更新成功');
            } else {
               //that.$router.push({path:'/cin-face'}); //调试摄像头代码
               //that.$router.push({name:'/cin-id-card',params:{flag:'no_res'}});
               that.hintInfo('warning','自助机数据更新失败');
            }
          }).catch((e)=> {
               //that.$router.push({path:'/cin-face'}); //调试
               //that.$router.push({name:'/cin-id-card',params:{flag:'no_res'}});
               that.hintInfo('warning', e.toString());
               console.error(e);
          })
    },
    /**
     * @getmd5 加密密码使用
     */
    getmd5 : function(pwd){
      let md5 = crypto.createHash("md5");
      md5.update(pwd);
      let password = md5.digest('hex');
      return password;
    },
    /**
     * @close_camera 关闭摄像头
     */
    close_camera(){
      let that = this;
      let card = "close_camera"; //close_camera 打开摄像头
      //ios返回的数据
      that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
        responseCallback(data);
        //先将base64格式的文件转为file文件，作为file参数
        if(data){
          //alert('data:' + data);
        }else{
          //that.hintInfo('warning','读取失败');
        }
      });
      //给ios传数据  card是标示
      that.$bridge.callhandler('submitFromWeb',card, (data) => {
        // 处理返回数据 发送读取身份证读卡器的指令
        if(data === 'true'){
          //that.hintInfo('success','关闭摄像头');
          console.info("关闭摄像头");
          //判断interval 循环是否存在，存在的话直接将计时器删除
        }else{
          console.info('passing...');
        }
      })
    },
    /**
     * @close_camera 关闭摄像头
     */
    close_card(){
      let that = this;
      let card = "close_card"; //close_camera 打开摄像头
      //ios返回的数据
      that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
        responseCallback(data);
        //先将base64格式的文件转为file文件，作为file参数
        if(data){
          //alert('data:' + data);
        }else{
          //that.hintInfo('warning','读取失败');
        }
      });
      //给ios传数据  card是标示
      that.$bridge.callhandler('submitFromWeb',card, (data) => {
        // 处理返回数据 发送读取身份证读卡器的指令
        if(data === 'true'){
          //that.hintInfo('success','关闭摄像头');
          console.info("关闭读卡器");
          //判断interval 循环是否存在，存在的话直接将计时器删除
        }else{
          console.info('passing...');
        }
      })
    },
    /**
     * @hintInfo 操作提示信息
     * @param success  成功提示
     * @param warning 警告信息
     * @info 需要提示的信息
     */
    hintInfo : function(hint,info){
      let that = this;
      if(hint === "success"){
        that.$message({
          message: info,
          type: 'success'
        });
      }else if(hint === "warning"){
        that.$message({
          message: info,
          type: 'warning'
        });
      }else{
        this.$message.error('出错了！');
      }
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  body{
    margin: 0;
    padding: 0;
    font-size: 14px;
    overflow: hidden;
  }
  *{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }

  .hello {
    width: 1080px ;
    height: 1920px;
    overflow-x:hidden;
    overflow-y: hidden;
    /*background-image: url(../common/imgs/juxing.png) ;*/
    /*background-repeat: no-repeat;*/
    background:#fff url(../common/imgs/juxing.png)  no-repeat center;
    position: relative;
    .masking{
      width:1080px;
      height:1920px;
      background:rgba(7,13,32,0.9);
      overflow: hidden;


    }

  /*中间部分开始*/
  .center{
    width: 1080px;
  .brainpower{
    width: 1080px;
  div{
    width:106px;
    text-align: center;
    margin: auto;
  }
  img{
    width: 100%;
    margin-top: 95px;
    margin-bottom: 19px;
  }
  p{
    text-align: center;
    font-size:30px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,254,254,1);
    margin-bottom: 138px;
  }
  }
  .function{
    width: 900px;
    margin-left: 90px;
    margin-right: 90px;
    overflow: hidden;
  li{
    float: left;
  div{
    width: 200px;
    /*height: 353px;*/
    margin-left: 33px;
  }
  }
  }
  }

  footer{
    /*width:1080px;*/
    /*height:260px;*/
    /*margin-top: 125px;*/
    /*background:rgba(15,15,15,1);*/
  }


  }

</style>
