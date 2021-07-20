import React, { useEffect, useState } from 'react';

import './card.css';

export function CardContent ({ children }) {
  return <div className="cardContent">{children}</div>
}

const noop = () => {};
const previewSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 100 100'><defs><symbol id='a' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></symbol></defs><use xlink:href='#a' width='20%' x='40%'/></svg>")}`;

export function CardMedia ({ height = 270, alt = '', onImageError = noop, onImageLoad = noop, image }) {
  const [src, setSrc] = useState(previewSrc);

  useEffect(() => {
    const img = new Image();
    img.onerror = onImageError;
    img.onload = function() {
      setSrc(image);
      onImageLoad();
    }

    img.src = image;
  }, [image, onImageError, onImageLoad]);

  return <img src={src.replace("duda1.managebuilding.com","d39aa1l6bu2o7g.cloudfront.net")} height={height} alt={alt} className="cardMedia" />
}

export default function Card ({ children }) {
  return (
    <li className="card">
      <section className="paper">{children}</section>
    </li>
  )
}

