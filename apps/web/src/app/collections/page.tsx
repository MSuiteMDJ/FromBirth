'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@ui/components/ProductCard';
import { productAPI } from '@/lib/api';
import { useBasketStore } from '@/store/basket';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tag: string;
  sku: string;
  stock: number;
  category: string;
  createdAt: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2 md:space-y-3">
          <div className="aspect-[4/5] bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  </div>
);

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useBasketStore((state) => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAll() as any;
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          setError(response.error || 'Failed to load products');
        }
      } catch (err) {
        setError('Error connecting to API');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">⚠️ {error}</p>
          <p className="text-sm text-fb-text-muted">
            Make sure the API server is running: <code>pnpm dev:api</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-8 md:mb-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">The Collection</h1>
          <p className="text-fb-text-muted max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Curated skincare formulations combining stem cell technology with 
            botanical extracts, designed for the discerning individual.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : products.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-fb-text-muted">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={formatCurrency(product.price)}
                image={product.image}
                tag={product.tag}
                onAddToCart={() =>
                  addItem({
                    productId: product.id,
                    name: product.name,
                    image: product.image,
                    unitPrice: product.price,
                    tag: product.tag,
                  })
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
