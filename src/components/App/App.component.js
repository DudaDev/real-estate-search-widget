import React from 'react';

import PropertyProvider from '../../providers/Property';
import DudaProvider from '../../providers/Duda';
import Search from '../SearchForm';
import Properties from '../Properties';

import './app.css';

function App({ dudaConfig = {} }) {
  return (
    <DudaProvider config={dudaConfig}>
      <div className="app">
        <PropertyProvider>
          <Search />
          <Properties />
        </PropertyProvider>
      </div>
    </DudaProvider>
  );
}

export default App;
