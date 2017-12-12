import * as actionTyps from './../../actionTypes';
import InitialState from './initState';

const initialState = new InitialState();

const popularReducer = (state = initialState, action) => {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state);
  }

  switch (action.type) {
    // 更新标签列表
    case actionTyps.UPDATE_POPULAR_TAGS:
      return state.setIn(['updatePopularTags', 'update'], true);
    default:
      return state;
  }
};

export default popularReducer;
