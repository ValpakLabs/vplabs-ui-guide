import Immutable, {Map, List} from 'immutable';
import {
  TOGGLE_APP_SIDEBAR,
  START_LOADING,
  STOP_LOADING
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  sidebar: {
    open: true
  }
};

function startLoading(state) {
  return state.set('loading', true);
}

function stopLoading(state) {
  return state.set('loading', false);
}

function toggleAppSidebar(state) {
  const sidebarIsOpen = !state.get('sidebar').get('open');
  return state.mergeIn(['sidebar'], {open: sidebarIsOpen});
}

export default function ui(state = initialState, action) {
  if (!Map.isMap(state) && !List.isList(state))
    state = Immutable.fromJS(state);

  const handlers = {
    TOGGLE_APP_SIDEBAR: toggleAppSidebar,
    START_LOADING: startLoading,
    STOP_LOADING: stopLoading
  };

  return handlers[action.type] ?
    handlers[action.type](state, action) :
    state;
}
