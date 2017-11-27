import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store/store';
import App from './components/App';
import decodeToken from './utils/decodeToken';


const user = decodeToken();
if (user) {
  store.dispatch({
    type: 'SIGN_IN_USER',
    user
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
