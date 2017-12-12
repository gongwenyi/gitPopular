import { Record } from 'immutable';

const UpdatePopularTags = Record({ // 更新标签列表
  update: false,
});

const initialState = Record({
  updatePopularTags: new UpdatePopularTags(),
});

export default initialState;
