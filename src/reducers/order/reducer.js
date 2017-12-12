import * as actionTyps from './../../actionTypes';
import InitialState from './initState';

const initialState = new InitialState();

const orderReducer = (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state);
  }

  switch (action.type) {
    // 获取订单列表
    case actionTyps.GET_ORDER_LIST_START:
      return state.setIn(['orderList', 'isFetching'], true)
        .setIn(['orderList', 'data'], null);
    case actionTyps.GET_ORDER_LIST_SUCCESS:
      return state.setIn(['orderList', 'isFetching'], false)
        .setIn(['orderList', 'data'], action.data);
    case actionTyps.GET_ORDER_LIST_FAILD:
      return state.setIn(['orderList', 'isFetching'], false)
        .setIn(['orderList', 'data'], null);
    default:
      return state;
  }
};

export default orderReducer;
