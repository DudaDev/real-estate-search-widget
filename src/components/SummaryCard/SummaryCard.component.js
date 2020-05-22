import React from 'react';
import Card, { CardMedia, CardContent } from '../Card';

import './summaryCard.css';
const noop = () => {};

export default function SummaryCard ({ property, onImageError = noop }) {
  const { page_item_url, data } = property;
  const {
    PrimaryPhoto: photo,
    ListingAddress: address,
    ListPrice_Formatted: price,
    BuildingAreaTotal_Formatted: area,
    BathsTotal: baths,
    BedsTotal: beds
  } = data;

  function handleImageError () {
    onImageError(page_item_url);
  }

  const filteredBeds = String(beds).replace(/^[*]+/, '');
  const filteredBaths = String(baths).replace(/^[*]+/, '');

  return (
      <Card>
        <a href={`/listing/${page_item_url}`}>
          <CardMedia
            image={photo}
            onImageError={handleImageError}
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
