'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useBasketStore } from '@/store/basket';

interface BasketDrawerProps {
  open: boolean;
  onClose: () => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

export function BasketDrawer({ open, onClose }: BasketDrawerProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const items = useBasketStore((state) => state.items);
  const updateQuantity = useBasketStore((state) => state.updateQuantity);
  const removeItem = useBasketStore((state) => state.removeItem);
  const subtotal = useBasketStore((state) => state.getSubtotal());

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1200]">
      <button
        aria-label="Close basket"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col">
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-sm tracking-widest uppercase font-medium">Your Basket</h2>
          <button onClick={onClose} className="text-sm tracking-wide uppercase">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-sm text-fb-text-muted mb-4">Your basket is currently empty.</p>
              <Link href="/collections" className="fb-button" onClick={onClose}>
                Discover Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="grid grid-cols-[72px_1fr] gap-3 border border-gray-100 rounded p-3"
                >
                  <div className="w-[72px] h-[92px] bg-gray-50 rounded overflow-hidden">
                    <Image
                      src={
                        item.image.startsWith('/') &&
                        !item.image.startsWith(basePath)
                          ? `${basePath}${item.image}`
                          : item.image
                      }
                      alt={item.name}
                      width={72}
                      height={92}
                      sizes="72px"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-fb-text-muted mb-1">
                      {item.tag}
                    </p>
                    <h3 className="text-xs md:text-sm tracking-wide uppercase mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-fb-text-muted mb-2">
                      {formatCurrency(item.unitPrice)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 border border-gray-200 text-xs"
                        onClick={() =>
                          updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <span className="text-xs w-5 text-center">{item.quantity}</span>
                      <button
                        className="px-2 py-1 border border-gray-200 text-xs"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="ml-auto text-[11px] tracking-wide uppercase text-fb-text-muted"
                        onClick={() => removeItem(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-5 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <Link href="/basket" className="fb-button w-full text-center" onClick={onClose}>
            Go to Basket
          </Link>
        </div>
      </aside>
    </div>
  );
}
