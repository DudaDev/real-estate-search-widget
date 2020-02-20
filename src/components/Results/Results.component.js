import React from 'react';
import ResultList from '../ResultList';
import SummaryCard from '../SummaryCard';

import './results.css';

function NotFound () {
  return (
    <section className="notFound">
      <h4>Sorry, we couldn't find any properties for your search.</h4>
      <p>Try changing some filters and searching again.</p>
    </section>
  )
}

export default function Results ({ results }) {
  return !results.length
    ? <NotFound />
    : <ResultList>
      { results.map(result => <SummaryCard property={result} key={result.page_item_url} />) }
    </ResultList>
}
