import React from 'react';

import Body from './Body';
import Errorboundary from '../components/Errorboundary';

const App = () => (
  <div>
    <Errorboundary >
      <Body />
    </Errorboundary>
  </div>
);
export default App;
