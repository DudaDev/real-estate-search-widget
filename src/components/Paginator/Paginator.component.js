import React from 'react';

import { useProperty } from '../../providers/Property';
import './paginator.css';


function Page ({ current, page, onPageChange }) {
  const classNames = `pageButton${(current === page) ? ' active' : ''}`;

  return (
    <button className={classNames} type="button" onClick={() => { onPageChange(page) }}>{page + 1}</button>
  )
}

function PageList ({page, total, onPageChange}) {
  const pageArray = new Array(parseInt(total));
  pageArray.fill(page);
  

  return (
    <>
      {pageArray.map((_, idx) => <Page key={idx} current={parseInt(page)} page={idx} onPageChange={onPageChange}/>)}
    </>
  )
}

export default function Paginator ({ onPageChange }) {
  const { loading, pristine, error, data } = useProperty();
  if (pristine || loading) return null
  if (error) return <div>Something went wrong</div>
  return <div className="pageList"><PageList page={data.page} total={data.totalPages} onPageChange={onPageChange} /></div>

}

