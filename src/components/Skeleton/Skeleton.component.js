import React from 'react';
import ResultList from '../ResultList';
import Card from '../Card';

import './skeleton.css';

export default function Skeleton ({ limit }) {
  const empty = new Array(limit).fill({});

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
