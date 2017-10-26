import React from 'react';
import ReactDOM from 'react-dom';

import { Search } from './Search';

export class Home extends React.Component {
  render() {
    return (
      <div>
				<Search />
        <h3>All recipes page - Home page</h3>
      </div>
    );
  }
}