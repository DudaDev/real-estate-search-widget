import React from 'react';

import PropertyProvider from '../../providers/Property';
import DudaProvider, { useDuda } from '../../providers/Duda';
import Search from '../SearchForm';
import Properties from '../Properties';

import './app.css';

function Layout ({ properties, searchButtonText, limit }) {
  const l = (properties) ? properties.length : limit;

  return (
    <>
      { !properties && <Search searchButtonText={searchButtonText} /> }
      <Properties limit={l} />
    </>
  )
}

function SearchUI () {
  const { searchButtonText = "SEARCH" , limit = 12, properties = undefined, mls = undefined } = useDuda();

  return (
    <PropertyProvider limit={limit} properties={properties} mls={mls}>
      <Layout searchButtonText={searchButtonText} limit={limit} properties={properties} />
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
