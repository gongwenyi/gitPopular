import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './../reducers';

// 定义中间件数组，默认包括thunk middleware
const middlewares = [thunk.withExtraArgument()];

// 只有开发环境才使用logger middleware
if (__DEV__) {
  middlewares.push(logger);
}

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}

// 将中间件柯里化
const middleware = applyMiddleware(...middlewares);

export default (preloadedState = {}) => {
  const rootReducer = combineReducers({
    ...reducers,
  });
  return createStore(rootReducer, preloadedState, middleware);
};
