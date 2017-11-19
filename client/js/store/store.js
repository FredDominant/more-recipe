import { createStore, compose, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';

import reducers from '../reducers/index';

const store = createStore(
  enableBatching(reducers),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

export default store;
