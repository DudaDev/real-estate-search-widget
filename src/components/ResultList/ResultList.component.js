import React from 'react';

import './resultList.css';

export default function ResultList ({ children }) {
  return (
    <ul className="results">
      {children}
    </ul>
  )
}
