import React from 'react';
import Card, { CardMedia, CardContent } from '../Card';

import './summaryCard.css';

export default function SummaryCard ({ property }) {
  const { page_item_url, data } = property;
  const {
    PrimaryPhoto: photo,
    ListingAddress: address,
    ListPrice_Formatted: price,
    BuildingAreaTotal_Formatted: area,
    BathsTotal: baths,
    BedsTotal: beds
  } = data;

  const filteredBeds = String(beds).replace(/^[*]+/, '');
  const filteredBaths = String(baths).replace(/^[*]+/, '');

  return (
      <Card>
        <a href={`/listing/${page_item_url}`}>
          <CardMedia
            image={photo}
            />
        </a>
        <CardContent>
          <div className="summaryMeta">
            <div className="summaryPrice">{ price }</div>
            <div className="summaryProps">{ filteredBeds || '-' } bd | { filteredBaths || '-' } ba | { area || '--' } sqft</div>
          </div>
          <div className="summaryAddress">{ address }</div>
        </CardContent>
      </Card>
  )
}
