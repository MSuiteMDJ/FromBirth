'use client';

import React from 'react';
import Image from 'next/image';

export interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  tag: string;
  description?: string;
  ctaLabel?: string;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  tag,
  description,
  ctaLabel = 'Acquire',
  onAddToCart,
}) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resolvedImage =
    image.startsWith('/') && !image.startsWith(basePath)
      ? `${basePath}${image}`
      : image;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f2f2f2] mb-6">
        <Image
          src={resolvedImage}
          alt={name}
          width={400}
          height={500}
          priority={false}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute top-6 left-6">
          <span className="text-[9px] tracking-[0.2em] uppercase bg-white/90 px-3 py-1.5 shadow-sm">
            {tag}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-baseline mb-2 gap-3">
        <h3 className="text-lg font-light tracking-widest uppercase">{name}</h3>
        <p className="text-sm font-medium whitespace-nowrap">{price}</p>
      </div>

      {description && (
        <p className="text-xs text-gray-500 leading-relaxed mb-6 max-w-sm">
          {description}
        </p>
      )}

      <button
        onClick={onAddToCart}
        className="border border-black py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
      >
        {ctaLabel}
      </button>
    </article>
  );
};
