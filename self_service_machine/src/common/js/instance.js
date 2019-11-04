import {Toast} from 'mint-ui';

/**
 * @instance mint-ui 提示语句
 * @param val 需要传递的话
 */
export function instance(val) {
  let instance = Toast(val);
  setTimeout(() => {
    instance.close();
  }, 2000);
}



