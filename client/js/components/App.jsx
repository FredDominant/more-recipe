import React from 'react';

import Body from './Body';
import Errorboundary from '../components/Errorboundary';
import Navbar from './Navbar';

const App = () => (
  <div>
    <Navbar>
      <Errorboundary >
        <Body />
      </Errorboundary>
    </Navbar>
  </div>
);
export default App;
