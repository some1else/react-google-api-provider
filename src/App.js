import React from 'react';
import logo from './logo.svg';
import './App.css';

import GAPIProvider from './GAPIProvider'

function App() {
  return (
    <div className="App">
      <GAPIProvider>
        <p>Loaded</p>
      </GAPIProvider>
    </div>
  );
}

export default App;
