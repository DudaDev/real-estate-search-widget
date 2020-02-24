import React from 'react';

import { useProperty } from '../../providers/Property';
import Results from '../Results';
import Skeleton from '../Skeleton'


export default function Properties ({ limit }) {
  const { loading, pristine, error, data } = useProperty();
  if (pristine || loading) return <Skeleton limit={limit} />
  if (error) return <div>Something went wrong</div>
  return <Results results={data} />
}

