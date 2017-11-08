import { createStore, combineReducers, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { App } from './components/App';

const initialValue = {
  value: 10,
  list: []
};
const values = {
  Name: 'Max',
  Age: 30
};
const loginState = {
	email: '',
	password: ''
};
const test = {
	value: ''
};
const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'ADD':
      state = {
        ...state,
        value: state.value + action.payload
      };
      break;
    case 'SUBTRACT':
      state = {
        ...state,
        value: state.value - action.payload,
        list: [...state.list, action.payload]
      };
      break;
    default:
      break;
  }
  return state;
};

const login = (state = loginState, action) => {
	switch (action.type) {
		case 'Login':       
			state = {
				...state,
				email: action.payload.email,
				password: action.payload.password
			}
			break;
		case 'user':
			state = {
				...state,
				email: action.payload,
				password: action.payload
			};
			/* console.log(state); */
			break;
		default:
			break;
	}
	console.log(state);
	return state;
}

const changer = (state = values, action) => {
  switch (action.type) {
    case 'Name':
      state = {
        ...state,
        Name: action.payload
      };
      break;
    case 'Age':
      state = {
        ...state,
        Age: action.payload
      };
      break;
    default:
      break;
  }
  return state;
};
const getValue = (state = test, action) => {
	switch (action.type) {
		case 'input':
			state = {
				...state,
				value: action.payload
			}
			break;
		default:
		break;
	}
	return state;
}
// Middleware
const logger = store => next => (action) => {
  console.log('I have been passed in this: ', action);
  return next(action);
};
const store = createStore(combineReducers({
  reducer,
	changer,
	login,
	getValue
}), {}, applyMiddleware(logger));

/* store.subscribe(() => {
  console.log('Store updated with', store.getState());
}); */

/* store.dispatch({
  type: 'ADD',
  payload: 100
}); // current state is 110

store.dispatch({
  type: 'SUBTRACT',
  payload: 40
}); // current state 120

store.dispatch({
  type: 'Name',
  payload: 'Fred'
});

store.dispatch({
  type: 'Age',
  payload: 23
});
 */

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
	, document.getElementById('root')
); 
