'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useBasketStore } from '@/store/basket';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

export default function BasketPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const items = useBasketStore((state) => state.items);
  const hasHydrated = useBasketStore((state) => state.hasHydrated);
  const updateQuantity = useBasketStore((state) => state.updateQuantity);
  const removeItem = useBasketStore((state) => state.removeItem);
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const subtotal = useBasketStore((state) => state.getSubtotal());

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-fb-text">Loading basket...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase mb-3 md:mb-4">
            Your Basket
          </h1>
          <p className="text-sm md:text-base text-fb-text">
            Review items from your collection selection.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-xl border border-white">
            <p className="text-sm text-fb-text mb-4">Your basket is empty.</p>
            <Link href="/collections" className="fb-btn-primary">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-10 items-start">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.productId}
                  className="grid grid-cols-[96px_1fr] gap-4 border border-gray-200 bg-white/80 rounded-xl p-4"
                >
                  <div className="w-24 h-28 rounded overflow-hidden bg-gray-50">
                    <Image
                      src={
                        item.image.startsWith('/') &&
                        !item.image.startsWith(basePath)
                          ? `${basePath}${item.image}`
                          : item.image
                      }
                      alt={item.name}
                      width={96}
                      height={112}
                      sizes="96px"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>

                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-fb-text mb-1">
                      {item.tag}
                    </p>
                    <h2 className="text-sm md:text-base tracking-wide uppercase mb-1">
                      {item.name}
                    </h2>
                    <p className="text-sm text-fb-text mb-3">
                      {formatCurrency(item.unitPrice)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1.5 border border-gray-200 text-xs"
                        onClick={() =>
                          updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs">{item.quantity}</span>
                      <button
                        className="px-3 py-1.5 border border-gray-200 text-xs"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="ml-auto text-[11px] tracking-wide uppercase text-fb-text hover:text-black"
                        onClick={() => removeItem(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="basket-summary">
              <h3 className="text-xs tracking-widest uppercase font-semibold mb-4">
                Order Summary
              </h3>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-xs text-fb-text mb-6">
                Shipping and taxes are calculated at checkout.
              </p>
              <button
                className="fb-btn-primary w-full justify-center mb-3 opacity-70 cursor-not-allowed"
                disabled
              >
                Checkout (Demo)
              </button>
              <button
                className="w-full border border-black py-3 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                onClick={clearBasket}
              >
                Clear Basket
              </button>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
