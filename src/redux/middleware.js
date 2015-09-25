import config from '../config';
import history from '../history';

if (__SERVER__)
  var logger = require('../server/logger');

export function clientMiddleware(client) {
  return ({dispatch, getState}) => next => async action => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    // if (REQUEST === 'LOAD_PAGE')
    //   dispatch({type: 'START_LOADING'});

    next({...rest, type: REQUEST});

    try {
      const payload = await promise(client);
      next({...rest, payload, type: SUCCESS});

      if (SUCCESS === 'LOGIN_USER_SUCCESS')
        history.pushState(null, `${config.appContext}`);

    } catch (error) {
      next({
        ...rest,
        payload: error,
        error: true,
        type: FAILURE,
        meta: {
          entity: action.payload
        }
      });
    }
  };
}

export function loggingMiddleware({dispatch, getState}) {
  return next => action => {
    if (__DEVELOPMENT__) {
      console.log(`%cDispatch: %c${action.type}: %o`, 'color: #AAA', 'color: orange; font-weight: bold', action);
    }
    next(action);
  };
}

export function thunkMiddleware({ dispatch, getState }) {
  return next => async action => {
    if (typeof action === 'function') {
      await action(dispatch, getState);
    } else {
      next(action);
    }
  };
}