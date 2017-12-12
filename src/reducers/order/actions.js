import * as actionTypes from './../../actionTypes';
import ApiService from './../../api';
import { NavigationActions } from 'react-navigation';

/**
 * 获取订单列表
 * @param {number} page 当前页
 * @param {number} status 订单状态 2: 进行中 3: 已完成 0: 已取消
 * @param {number} size 每页显示数据条数
 * @param {string} sort 排序方式
 * @param {number} type 订单类型
 */
export function getOrderList(page, status, size = 10, sort = 'id,desc', type = 1) {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_ORDER_LIST_START }); // 获取订单列表开始
      const data = await ApiService.Order.getOrderList(page, status, size, sort, type);
      dispatch({ type: actionTypes.GET_ORDER_LIST_SUCCESS, data }); // 获取订单列表成功
    } catch (err) {
      dispatch({ type: actionTypes.GET_ORDER_LIST_FAILD }); // 获取订单列表失败
      console.log('获取订单列表接口异常');
      console.log(err);
    }
  };
}
