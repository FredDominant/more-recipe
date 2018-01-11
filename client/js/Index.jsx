import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import 'toastr/build/toastr.min.css';

import './utils/init';
import store from './store/store';
import App from './components/App';
import decodeToken from './utils/decodeToken';
import { SIGN_IN_USER, LOGOUT } from './actions/actionTypes';


const user = decodeToken();
if (user) {
  store.dispatch({
    type: SIGN_IN_USER,
    user
  });
}

if (!decodeToken()) {
  store.dispatch({
    type: LOGOUT
  });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
