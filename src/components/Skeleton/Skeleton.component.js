import React from 'react';
import ResultList from '../ResultList';
import Card from '../Card';

import './skeleton.css';

export default function Skeleton ({ items = 9 }) {
  const empty = new Array(items).fill({});

  return (
    <ResultList>
      { empty.map((_, idx) => (
        <Card key={idx}>
          <div className="bone" />
        </Card>
      )) }
    </ResultList>
  );
}
