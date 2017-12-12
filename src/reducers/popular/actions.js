import * as actionTypes from './../../actionTypes';
import ApiService from './../../api';

/**
 * 更新标签列表
 */
export function updatePopularTags() {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_POPULAR_TAGS }); // 更新标签列表
  };
}
