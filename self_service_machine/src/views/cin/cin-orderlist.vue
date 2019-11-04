<template>
  <div class="cin-orderlist">
    <div class="masking">
      <!--引入上部分组件-->
      <head-view></head-view>
      <!--上半部分结束-->
      <!--中间部分开始-->
      <div class="return">
        <home-back></home-back>
        <span>请选择您要使用的订单</span>
        <back-view></back-view>
      </div>
      <!--订单列表开始-->
      <div class="indent">
        <div style="width: 100%; overflow: auto;padding-bottom: 50px;font-size: 26px;">
          <div style="height: 90px;width: 100%;color: #777777" class="z-fixed-c">
            <!--<div style="height:100%;width: 40%" class="z-fixed-c">手机号</div>-->
            <div style="height:100%;width: 40%" class="z-fixed-c">预订人</div>
            <div style="height:100%;width: 40%" class="z-fixed-c">房型</div>
            <div style="height:100%;width: 40%" class="z-fixed-c">总价</div>
            <div style="height:100%;width: 40%" class="z-fixed-c">入店时间</div>
            <div style="height:100%;width: 40%" class="z-fixed-c">离店时间</div>
            <div style="height:100%;width: 40%"></div>
          </div>

          <div v-for="(item,index) in order_list"
               style="border-radius:4px;overflow:hidden; color: white;
                 font-size:22px;height: 90px;width: 100%;border: 1px solid #CCCCCC;margin-bottom: 10px;"
               class="z-fixed-c"
               @click="openInfo(item)">
            <!--<div style="height:100%;width: 40%" class="z-fixed-c">{{item.telephone_master}}</div>-->
            <div style="height:100%;width: 40%" class="z-fixed-c">{{item.rsv_person_name}}</div>
            <div style="height:100%;width: 40%" class="z-fixed-c">{{item.rt_rate[0].room_type}}</div>
            <div style="height:100%;width: 40%" class="z-fixed-c">￥{{item.rt_rate[0].fix_rate}}</div>
            <div style="height:100%;width: 40%" class="z-fixed-c">
              {{item.arr_time ? item.arr_time.split('T')[0] : ''}}
            </div>
            <div style="height:100%;width: 350px" class="z-fixed-c">
              {{item.leave_time ? item.leave_time.split('T')[0] : ''}}
            </div>
            <div style="height:100%;width: 40%;font-size: 26px;">
              <div style="background: #007BDB;height: 90px;line-height: 90px;color:rgba(255,255,255,1);"
                   @click="checkin_now(item,item.id,index,order_list)">确定入住
              </div>
            </div>
          </div>
        </div>

      </div>
      <!--订单列表结束-->
      <!--中间部分结束-->
      <!--引入底部组件底部开始-->
      <footer-view></footer-view>
      <!--底部结束-->
    </div>

    <el-dialog :visible.sync="dialogTableVisible">
      <slot>
        <div>
          <!--<div style="line-height: 50px;height: 50px;">订单详情</div>-->
          <div style="height: 50px;font-size: 17px;">
            <span>手机号：{{infoData.telephone_master}}</span>
            <span style="margin-left: 5px;"><span style="color: #9D9D9D">预订人：</span>{{infoData.rsv_person_name}}</span>
            <span style="margin-left: 5px;"><span style="color: #9D9D9D">入住时间：</span>{{infoData.arr_time ? infoData.arr_time.split('T')[0] : ''}}</span>
            <span style="margin-left: 5px;"><span style="color: #9D9D9D">离店时间：</span>{{infoData.leave_time ? infoData.leave_time.split('T')[0] : ''}}</span>
          </div>

          <div style="width: 100%;height: 400px;">
            <div
              style="width: 48%;float: left;height: 400px;color: white;height: 400px;border: 1px solid #3a8ee6;border-radius: 10px;overflow: hidden;">
              <div style="width: 100%;height: 50px;background: #3a8ee6;" class="z-fixed-c">房间详情</div>

              <div class="z-fixed-c" style="color: black;height: 50px;border-bottom:1px solid #c1c1c1">
                <div style="width: 33.33%">房间号</div>
                <div style="width: 33.33%">房间类型</div>
                <div style="width: 33.33%">房价</div>
              </div>
              <div style="height:300px;overflow-y: scroll;"
                   v-if="infoData && infoData.rt_rate && infoData.rt_rate.length>0">
                <div style="height:300px;overflow-y: scroll;">
                  <div class="z-fixed-c" style="color: black;height: 40px;border-bottom:1px solid #c1c1c1;"
                       v-for="(roomItem,roomIndex) in infoData.rt_rate" :key="roomIndex">
                    <div style="width: 33.33%">{{roomItem.room_number ? roomItem.room_number : '未排房'}}</div>
                    <div style="width: 33.33%">{{roomItem.room_type}}</div>
                    <div style="width: 33.33%">￥{{roomItem.fix_rate}}</div>
                  </div>
                </div>
              </div>
              <div v-else class="z-fixed-c" style="height:300px;">
                <span style="color: black">房间详情</span>
              </div>

            </div>
            <div
              style="width: 48%;float: right;height: 400px;color: white;margin-left: 4%;height: 400px;border: 1px solid #3a8ee6;border-radius: 10px;overflow: hidden;">
              <div style="width: 100%;height: 50px;background: #3a8ee6;" class="z-fixed-c">入住人信息</div>
              <div class="z-fixed-c" style="color: black;height: 50px;border-bottom:1px solid #c1c1c1">
                <div style="width: 40%">姓名</div>
                <div style="width: 10%">性别</div>
                <div style="width: 50%">身份证号</div>
              </div>

              <div style="height:300px;overflow-y: scroll;"
                   v-if="infoData && infoData.reserve_guest && infoData.reserve_guest.length>0">
                <div class="z-fixed-c" style="color: black;height: 40px;border-bottom:1px solid #c1c1c1"
                     v-for="(reserveVal,reserveIndex) in infoData.reserve_guest"
                     :key="reserveIndex">
                  <div style="width: 40%">{{reserveVal.name}}</div>
                  <div style="width: 10%">{{reserveVal.sex}}</div>
                  <div style="width: 50%">{{reserveVal.id_no}}</div>
                </div>
              </div>

              <div v-else class="z-fixed-c" style="height:300px;">
                <span style="color: black">暂无入住人信息</span>
              </div>

            </div>
          </div>
        </div>
      </slot>


    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "cin-orderlist",
    data() {
      return {
        //可用房间列表
        order_list: [],
        //请求的url
        url: this.api.api_price + '/v1/room/machine/can_live_room_list/',
        //接收的参数
        params: {},
        //flag 判断来源
        flag: '',
        expands: [],
        arr_time: '',
        leave_time: '',
        code_name: '',
        order_list_data: [],
        dialogTableVisible: false,
        infoData: {}
      };
    },

    created: function () {
      /*
        这是有预定的时候，展示的客人的预定单的信息
       */
      let that = this;
      that.close_camera();
      that.show_orderlist();
    },
    methods: {
      /**
       * @openInfo 打开弹框信息
       */
      openInfo(val) {
        console.info(val)
        this.infoData = val
        this.dialogTableVisible = true
      },

      /**
       * @show_orderlist
       * @param no
       * 有预定的时候展示可用的预定单的信息
       */
      show_orderlist() {
        let that = this;
        //console.info(JSON.parse(sessionStorage.getItem('results')))
        for (let item of JSON.parse(sessionStorage.getItem('results'))) {
          //console.log(item.arr_time)
          if ((Date.parse(item.arr_time.split('T')[0])) < (Date.parse(new Date()))) {
            that.order_list.push(item);
          } else {
            //that.order_list.push(item);
          }
        }
        //that.order_list = JSON.parse(sessionStorage.getItem('results'));
      },
      /**
       * @checkin_now  立即入住
       * @param row 当前行的数据
       * No reservation
       */
      checkin_now(row) {
        let that = this;
        console.info(row);
        sessionStorage.setItem('rsv_person_name', row.rsv_person_name) //预定人
        sessionStorage.setItem('booking_flag', 'booking') //有预定的时候将进行有预定转入住的操作
        sessionStorage.setItem('code_src_id', row.code_src_id)  //是否手机订单
        sessionStorage.setItem('order_no', row.order_no) //预定单号
        sessionStorage.setItem('rate_code', row.rate_code) //房价码
        sessionStorage.setItem('code_name',row.rt_rate[0].code_name) //房型code
        sessionStorage.setItem('code_market_id',row.code_market_id) //市场码
        sessionStorage.setItem('code_src_id',row.code_src_id) //来源吗
        sessionStorage.setItem('telephone_master',row.telephone_master) //预定人手机号
        sessionStorage.setItem('id',row.id) //预定单id
        sessionStorage.setItem('modify_date',row.modify_date) //更新时间
        sessionStorage.setItem('modify_user_id',row.modify_user_id) //更新id
        //sessionStorage.setItem('room_no',row.reserve_guest[0].room_number);
        if (row.reserve_guest.length > 0) {
          sessionStorage.setItem('room_no', row.reserve_guest[0].room_number) //房间号
          sessionStorage.setItem('lock_no', row.reserve_guest[0].lock_no) //房间号
          //这里需要拿到锁号
        } else {
          that.arr_time = row.arr_time
          that.leave_time = row.leave_time
          that.code_name = row.rt_rate[0].code_name
          that.get_room_list()
        }
        sessionStorage.setItem('room_type', row.rt_rate[0].room_type);  //房间类型
        sessionStorage.setItem('begin_date', row.arr_time.split('T')[0] + " " + row.arr_time.split('T')[1]);  //入住时间
        sessionStorage.setItem('end_date', row.leave_time.split('T')[0]);  //离店时间
        let data_rt_rate = row.rt_rate;
        let count_price = 0;
        for (let i in data_rt_rate) {
          count_price = count_price + data_rt_rate[i].fix_rate;
        }
        sessionStorage.setItem('day_price', count_price);  //总价格
        //sessionStorage.setItem('room_type',row.)
        that.$router.push({name: '/cin-id-card', params: {flag: 'yes_res'}});
      },
      /**
       * @get_room_list 获取可用的房间号 防止预定的时候没有选择房间号
       */
      get_room_list() {
        let that = this;
        that.$axios({
          method: 'post',
          url: that.url,
          data: {
            room_type: that.code_name,
            start_time: that.arr_time.split('T')[0] + " " + that.arr_time.split('T')[1],
            end_time: that.leave_time.split('T')[0] + " " + that.leave_time.split('T')[1] //这里是需要将带有默认下午两点的时间给到后端，这样才可以查出来对应的房间号
          }
        }).then((res) => {
          console.info(res);
          that.order_list_data = res.data.data.data;
          sessionStorage.setItem('room_no', that.order_list_data[0].room_no)  //房间号
          sessionStorage.setItem('lock_no', that.order_list_data[0].lock_no)  //房间号
          //将对应的锁号获取到，缓存下来
          console.log(sessionStorage.getItem('room_no'));
        }).catch((err) => {
          console.error(err);
        })
      },
      expandSelect: function (row, expandedRows) {
        let that = this
        if (expandedRows.length > 1) {
          that.expands = []
          if (row) {
            that.expands.push(row);
          }
          this.$refs.refTable.toggleRowExpansion(expandedRows[0]);
        } else {
          that.expands = [];
        }
      },

      /**
       * @close_camera 关闭摄像头
       */
      close_camera() {
        let that = this;
        let card = "close_camera"; //close_camera 打开摄像头
        //ios返回的数据
        that.$bridge.registerhandler('functionInJs', (data, responseCallback) => {
          responseCallback(data);
          //先将base64格式的文件转为file文件，作为file参数
          if (data) {
            //alert('data:' + data);
          } else {
            //that.hintInfo('warning','读取失败');
          }
        });
        //给ios传数据  card是标示
        that.$bridge.callhandler('submitFromWeb', card, (data) => {
          // 处理返回数据 发送读取身份证读卡器的指令
          if (data === 'true') {
            //that.hintInfo('success','关闭摄像头');
            //判断interval 循环是否存在，存在的话直接将计时器删除
          } else {
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
      hintInfo: function (hint, info) {
        let that = this;
        if (hint === "success") {
          that.$message({
            message: info,
            type: 'success'
          });
        } else if (hint === "warning") {
          that.$message({
            message: info,
            type: 'warning'
          });
        } else {
          this.$message.error('出错了！');
        }
      },
    },
  }
</script>
<style>
  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    width: 900px;
  }
</style>
<style lang="less" scoped>

  .z-fixed-c {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /*隐藏滚动条*/
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    -webkit-overflow-scrolling: touch;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .cin-orderlist {
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
          margin-left: -84px;
        }
      }

      .indent {
        width: 1000px;
        height: 600px;
        overflow: auto;
        background: rgba(15, 15, 15, 1);
        margin: auto;
        margin-top: 69px;

        .title {
          padding-top: 48px;
          font-size: 20px;

          span {
            font-size: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
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

    }
  }


</style>
