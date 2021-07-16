import React, { useEffect, useState } from 'react';

import PropertyProvider, { fetchProperties, useProperty } from '../../providers/Property';
import DudaProvider, { useDuda } from '../../providers/Duda';
import Search from '../SearchForm';
import Paginator from '../Paginator';
import Properties from '../Properties';

import './app.css';

function Layout ({ properties, searchButtonText, limit, pageNumber }) {
  const [params, setParams] = useState({
    pageLength: limit,
    pageNumber: pageNumber,
    minPrice: '',
    maxPrice: '',
    baths: '',
    beds: '',
  });

  const l = (properties) ? properties.length : limit;
  const { dispatch } = useProperty();

  function handleSearch (vals) {
    const cleaned = Object.keys(vals).reduce((acc, key) => {
      acc[key] = vals[key].replace(/[^\d]/g, '');
      return acc;
    }, {});

    setParams((prev) => { return {...prev, ...cleaned, pageNumber} });
  }

  function handlePageChange (newPageNumber) {
    setParams((prev) => { return {...prev, pageNumber: newPageNumber} });
  }

  useEffect(() => {
    fetchProperties(params, dispatch);
  }, [params, dispatch])

  return (
    <>
      { !properties && <Search searchButtonText={searchButtonText} onSearch={handleSearch} /> }
      <Properties limit={l} />
      <Paginator onPageChange={handlePageChange} />
    </>
  )
}

function SearchUI () {
  const { searchButtonText = "SEARCH" , pageLength = 9, pageNumber = 0, properties = undefined, mls = undefined } = useDuda();
  return (
    <PropertyProvider pageLength={pageLength} properties={properties} mls={mls}>
      <Layout searchButtonText={searchButtonText} limit={pageLength} properties={properties} pageNumber={pageNumber} />
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
