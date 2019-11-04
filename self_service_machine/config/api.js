/**
 * 线下接口
 * @type {string}
 */
const api_9519 = process.env.api_9519;  //登陆的线下接口  徐哥的所有的线下接口
const api_9101 = process.env.api_9101;  //房价码的线下接口
const api_9102 = process.env.api_9102;  //会员的线下接口
const api_9103 = process.env.api_9103;  //codebase的线下接口
const api_9104 = process.env.api_9104;  //客房服务的线下接口
const api_8002 = process.env.api_8002;  //设备的线下接口
const api_9202 = process.env.api_9202;  //房型的线下接口
const api_8091 = process.env.api_8091;  //房间设置的线下接口
const api_9518 = process.env.api_9518;  //后端调用认证rpc服务接口
const api_9111 = process.env.api_9111;  //后端调用price房价，房态rpc服务接口
const api_9503 = process.env.api_9503;  //森哥的所有线下接口
const api_8094 = process.env.api_8094; //支付宝的支付线下接口

/**
 * 线上接口
 * @type {string}
 */

const api_9022 = process.env.api_9022;         //登陆的线上接口   徐哥所有的线下接口
const api_price = process.env.api_price;       //房价码的线上接口
const api_member = process.env.api_member;     //会员的线上接口
const api_code = process.env.api_code;         //codebase的线上接口
const api_service = process.env.api_service;   //客房服务的线上接口
const api_equipments = process.env.api_equipments; //设备的线上接口
const api_bill = process.env.api_bill;    //房型的线上接口
const api_room = process.env.api_room;    //房间设置的线上接口
const api_9021 = process.env.api_9021;    //后端调用认证rpc服务接口
const api_9019 = process.env.api_9019;    //后端调用price房价，房态rpc服务接口
const api_9530 = process.env.api_9530;    //森哥的所有线上接口
const api_pay = process.env.api_pay; //支付宝的支付线上接口
const api_sms = process.env.api_sms;//短信支付
const api_login = process.env.api_login ;//模拟登陆
const api_zt = process.env.api_zt; ;//中台的接口前缀

export default {
  /**
   * 线上接口
   */
  api_9022 : api_9022,
  api_price : api_price,
  api_member : api_member,
  api_code : api_code,
  api_service : api_service,
  api_equipments : api_equipments,
  api_bill : api_bill,
  api_room : api_room,
  api_9021 : api_9021,
  api_9019 : api_9019,
  api_9530 : api_9530,
  api_pay : api_pay,
  api_sms : api_sms,
  api_login : api_login,
  api_zt : api_zt
  /**
   * 线下接口
   */
  // api_9022 : api_9519,
  // api_price : api_9101,
  // api_member : api_9102,
  // api_code : api_9103,
  // api_service : api_9104,
  // api_equipments : api_8002,
  // api_bill : api_9202,
  // api_room : api_8091,
  // api_9021 : api_9518,
  // api_9019 : api_9111,
  // api_9530 : api_9503,
  // api_pay : api_8094,
}

