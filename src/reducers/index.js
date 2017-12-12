import nav from './navReducer';
import popularReducer from './popular/reducer';
import orderReducer from './order/reducer';

const rootReducer = {
  nav,
  popular: popularReducer,
  order: orderReducer,
};

export default rootReducer;
