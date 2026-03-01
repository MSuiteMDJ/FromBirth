'use client';

import { FormEvent, Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSession = useAuthStore((state) => state.setSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const redirectTo = useMemo(
    () => searchParams?.get('redirect') || '/account',
    [searchParams]
  );

  const [email, setEmail] = useState('demo@frombirth.com');
  const [password, setPassword] = useState('frombirth-demo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [hasHydrated, isAuthenticated, redirectTo, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await authAPI.login({
        email,
        password,
      });

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Login failed');
      }

      setSession(response.data.token, response.data.user);
      router.push(redirectTo);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Unable to login'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-lg mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="account-card">
          <p className="text-[10px] tracking-widest uppercase text-fb-text-muted mb-3 text-center">
            My Account
          </p>
          <h1 className="font-serif text-3xl md:text-4xl mb-3 text-center">Local Demo Login</h1>
          <p className="text-sm text-fb-text-muted text-center mb-6">
            Sign in to view account details, appointments, and order history.
          </p>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
                required
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="fb-button w-full justify-center"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-3 bg-fb-lilac-soft rounded border border-fb-lilac-light">
            <p className="text-[11px] text-fb-text-muted leading-relaxed">
              Demo credentials pre-filled: <strong>demo@frombirth.com</strong> /{' '}
              <strong>frombirth-demo</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-fb-text-muted">Loading login...</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}
