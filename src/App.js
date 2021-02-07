import React from 'react';
import { Router } from 'react-router'

import history from './session-history.jsx';

import Root from './root';

function App() {
  return (
    <div className="App flex horizontal-center vertical-center">    
      <Router history={history}>
        <Root />
      </Router>
    </div>
  );
}

export default App;