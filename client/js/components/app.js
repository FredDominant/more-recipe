import React from 'react';
import ReactDOM from 'react-dom';

import { Search } from './Search';
import { Navigation } from './Navigation';
import { Body } from './Body';

 export class App extends React.Component {
  render() {
    return (
      <div className="main-body">
        <Navigation />
				<div className="container-fluid">
					<Body />
				</div>
      </div>
    );
  }
};
