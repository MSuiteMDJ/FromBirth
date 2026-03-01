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

const describeProduct = (product: Product) => {
  const name = product.name.toLowerCase();

  if (name.includes('mask')) {
    return 'Advanced bioactive complex utilizing cellular signaling technology for intensive cosmetic recovery.';
  }

  if (name.includes('exosome')) {
    return 'Couture science formula with peptide complexes for high-performance skin conditioning.';
  }

  if (name.includes('serum')) {
    return 'A precision blend designed to support visible skin renewal and refined texture.';
  }

  return 'Regenerative-inspired cosmetic formulation developed for luxury ritual use.';
};

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="aspect-[4/5] bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
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
      <section id="skincare" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase mb-4">
            The Boutique
          </h1>
          <div className="w-12 h-px bg-fb-lilac-mid"></div>
          <p className="text-fb-text-muted max-w-2xl mx-auto leading-relaxed text-sm md:text-base mt-5">
            Couture science skincare shaped with advanced cosmetic actives and
            elevated sensorial design.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : products.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-fb-text-muted">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={formatCurrency(product.price)}
                image={product.image}
                tag={product.tag}
                description={describeProduct(product)}
                ctaLabel="Acquire"
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

        {!loading && products.length > 0 && (
          <div className="mt-14 md:mt-20 p-6 md:p-8 border border-dashed border-fb-lilac-mid/30 text-center">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 italic leading-relaxed">
              Regenerative-inspired cosmetic skincare only. No live stem cells,
              and no therapeutic or disease treatment claims.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
