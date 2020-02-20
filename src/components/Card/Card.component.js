import React from 'react';

import './card.css';

export function CardContent ({ children }) {
  return <div className="cardContent">{children}</div>
}

export function CardMedia ({ height = 150, alt = '', image }) {
  return <img src={image} height={height} alt={alt} className="cardMedia" />
}

export default function Card ({ children }) {
  return (
    <li className="card">
      <section className="paper">{children}</section>
    </li>
  )
}

