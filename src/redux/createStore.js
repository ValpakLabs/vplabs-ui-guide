import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';

import {
  loggingMiddleware,
  thunkMiddleware
} from './middleware';

export default function (data) {
  try {
    const middleware = applyMiddleware(
      thunkMiddleware,
      loggingMiddleware
    );

    const createCustomStore = compose(middleware)(createStore);
    const reducer = combineReducers(require('../reducers/index'));
    const store = createCustomStore(reducer, data);

    if (module.hot) {
      module.hot.accept('../reducers/index', () => {
        const nextReducer = combineReducers(require('../reducers/index'));
        store.replaceReducer(nextReducer);
      });
    }

    return store;

  } catch (error) {
    throw error;
  }
}
