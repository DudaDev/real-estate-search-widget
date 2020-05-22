import React from 'react';

import PropertyProvider from '../../providers/Property';
import DudaProvider, { useDuda } from '../../providers/Duda';
import Search from '../SearchForm';
import Properties from '../Properties';

import './app.css';

function SearchUI () {
  const { searchButtonText = "SEARCH" , limit = 12 } = useDuda();

  return (
    <PropertyProvider limit={limit}>
      <Search searchButtonText={searchButtonText} />
      <Properties limit={limit}/>
    </PropertyProvider>
  )
}
function App({ dudaConfig = {} }) {
  return (
    <DudaProvider config={dudaConfig}>
      <div className="app">
        <SearchUI />
      </div>
    </DudaProvider>
  );
}

export default App;
