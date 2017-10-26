import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import { Home } from './Home';
import { Profile } from './Profile';
import { Recipe } from './Recipe'

export class Body extends React.Component {
  render() {
    return (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/recipe' component={Recipe} />
				<Route path='/profile' component={Profile} />
			</Switch>
    );
  }
}
