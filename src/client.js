import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import history from './history';
import createStore from './redux/createStore';

const dest = document.getElementById('content');
const store = createStore();

const component = (
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>
);

ReactDOM.render(component, dest);

window.React = React; // enable debugger
