'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from '@ui/components/Layout';
import { BasketDrawer } from '@/components/BasketDrawer';
import { useBasketStore } from '@/store/basket';
import { useAuthStore } from '@/store/auth';

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [basketOpen, setBasketOpen] = useState(false);

  const basketItems = useBasketStore((state) => state.items);
  const basketHydrated = useBasketStore((state) => state.hasHydrated);

  const authHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    setBasketOpen(false);
  }, [pathname]);

  const basketCount = basketHydrated
    ? basketItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const accountLabel =
    authHydrated && isAuthenticated ? 'My Account' : 'Login';
  const accountHref =
    authHydrated && isAuthenticated
      ? '/account'
      : '/login?redirect=/account';

  return (
    <>
      <Layout
        basketCount={basketCount}
        onBasketClick={() => setBasketOpen(true)}
        accountHref={accountHref}
        accountLabel={accountLabel}
      >
        {children}
      </Layout>
      <BasketDrawer open={basketOpen} onClose={() => setBasketOpen(false)} />
    </>
  );
}
