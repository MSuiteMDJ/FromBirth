'use client';

import React from 'react';
import Image from 'next/image';

export interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  tag: string;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  tag,
  onAddToCart,
}) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resolvedImage =
    image.startsWith('/') && !image.startsWith(basePath)
      ? `${basePath}${image}`
      : image;

  return (
    <div className="fb-product-card">
      <div className="fb-product-card-image">
        <Image
          src={resolvedImage}
          alt={name}
          width={400}
          height={500}
          priority={false}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
        <span className="fb-product-tag">{tag}</span>
      </div>
      <h3 className="fb-product-title">{name}</h3>
      <p className="fb-product-price">{price}</p>
      <button
        onClick={onAddToCart}
        className="fb-product-button fb-button"
      >
        Add to Collection
      </button>
    </div>
  );
};
