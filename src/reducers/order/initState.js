import { Record } from 'immutable';

const OrderListState = Record({ // 订单列表
  isFetching: false,
  data: null,
});

const initialState = Record({
  orderList: new OrderListState(),
});

export default initialState;
