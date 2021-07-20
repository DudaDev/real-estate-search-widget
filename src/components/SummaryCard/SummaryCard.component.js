import React from 'react';
import Card, { CardMedia, CardContent } from '../Card';

import './summaryCard.css';
const noop = () => {};

export default function SummaryCard ({ property, onImageError = noop }) {
  const { page_item_url, data } = property;

  const {
    primaryImage,
    listPrice,
    buildingArea,
    address,
    baths,
    beds
  } = data;

  function handleImageError () {
    onImageError(page_item_url);
  }

  return (
      <Card>
        <a href={`/listings/${page_item_url}`}>
          <CardMedia
            image={primaryImage.replace("duda1.managebuilding.com","d39aa1l6bu2o7g.cloudfront.net")}
            onImageError={handleImageError}
            />
        </a>
        <CardContent>
          <div className="summaryMeta">
            <div className="summaryPrice">{ listPrice }</div>
            <div className="summaryProps">{ beds || '-' } bd | { baths || '-' } ba | { buildingArea || '' }</div>
          </div>
          <div className="summaryAddress">{ address }</div>
        </CardContent>
      </Card>
  )
}
