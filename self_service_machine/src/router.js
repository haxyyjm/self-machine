import Vue from "vue"

import VueRouter from "vue-router"
//导入路由所需组件
import Main from "./components/main_self"
import Success from "./views/success"
import Error from "./views/error"
import Payment from "./views/payment"
import Makecard from "./views/make-card"
import Readcard from  "./views/read-card"
import Readinfocard from './views/readinfo-type'
import Checksucced from "./views/check-out-succeed"
import Checkerror from "./views/check-out-error"
import Phone from "./views/cin/cin-phone"
import Orderlist from "./views/cin/cin-orderlist"
import Teams from './views/cin/cin-team-type'
import Members from './views/cin/cin-phone-member'
import Qrcode from './views/cin/cin-qrcode-member'
import Roomlist from "./views/cin/cin-roomlist"
import Detal from "./views/cin/cin-detal"
import Type from "./views/cin/cin-type"
import Inquire from "./views/cin/cin-inquire"
import Card from "./views/cin/cin-id-card"
import Face from "./views/cin/cin-face"
import Scanface from "./views/cin/cin-scan-face"
import Affroom from "./views/cin/cin-sel-affroom"
import Selroom from "./views/cin/cin-selroom"
import Pri from "./views/cin/cin-detal-pri"
import Paytype from "./views/pay-type"
import Nores from "./views/cin/cin-nores"
import Roomsinfo from "./views/cut/cut-rooms-info"
import CutRoomnum from "./views/cut/cut-roomnum"
import Roomnum from "./views/ext/ext-roomnum"
import Info from "./views/ext/ext-sel-info"
import Invoice from "./views/inv/inv-invoice"
import Timer from "./views/cut/timer"

Vue.use(VueRouter);

const router = new VueRouter({
  //mode:'history',
  routes:[
    {
      path:"/",
      component:Main
    },
    {
      path:"/success",
      component:Success
    },
    {
      path:"/error",
      component:Error
    },
    {
      path:"/payment",
      component:Payment
    },
    {
      path:"/check-out-succeed",
      component:Checksucced
    },
    {
      path:"/check-out-error",
      component:Checkerror
    },
    {
      path:"/cin-type",
      component:Type
    },
    {
      path:"/cin-phone",
      name:"/cin-phone",
      component:Phone
    },
    {
      path:"/cin-orderlist",
      name:"/cin-orderlist",
      component:Orderlist
    },
    {
      path:"/cin-team-type",
      name:"/cin-team-type",
      component:Teams
    },
    {
      path:"/cin-member-phone",
      component:Members
    },
    {
      path:"/cin-qrcode-member",
      name:"/cin-qrcode-member",
      component:Qrcode
    },
    {
      path:"/cin-roomlist",
      name:"/cin-roomlist",
      component:Roomlist
    },
    {
      path:"/cin-detal",
      name:"/cin-detal",
      component:Detal
    },
    {
      path:"/cin-inquire",
      component:Inquire
    },
    {
      path:"/cin-id-card",
      component:Card,
      name:"/cin-id-card",
    },
    {
      path:"/cin-face",
      component:Face
    },
    {
      path:"/cin-scan-face",
      component:Scanface
    },

    {
      path:"/cin-nores",
      component:Nores
    },
    {
      path:"/cin-sel-affroom",
      component:Affroom
    },
    {
      path:"/cin-selroom",
      component:Selroom
    },
    {
      path:"/cin-detal-pri",
      component:Pri
    },
    {
      path:"/pay-type",
      component:Paytype
    },
    {
      path:"/timer",
      component:Timer
    },
    {
      path:"/cut-rooms-info",
      component:Roomsinfo
    },
    {
      path:"/cut-roomnum",
      component:CutRoomnum
    },

    {
      path:"/ext-roomnum",
      component:Roomnum
    },
    {
      path:"/ext-sel-info",
      name:"/ext-sel-info",
      component:Info
    },
    {
      path:"/inv-invoice",
      component:Invoice
    },{
      path:"/make-card",
      component:Makecard
    },{
      name : '/read-card',
      path:"/read-card",
      component:Readcard
    },{
      name :'/readinfo-type',
      path:"/readinfo-type",
      component:Readinfocard
    }
  ],
  //指定router-link被激活时使用的class名
  linkActiveClass:"active"
})
//导出路由器
export default router;
