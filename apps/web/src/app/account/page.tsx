'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AccountAppointment,
  AccountOrder,
  AccountProfile,
  accountAPI,
} from '@/lib/api';
import { useAuthStore } from '@/store/auth';

interface AccountViewModel {
  profile: AccountProfile;
  appointments: {
    due: AccountAppointment[];
    history: AccountAppointment[];
  };
  orders: {
    processing: AccountOrder[];
    history: AccountOrder[];
  };
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

export default function AccountPage() {
  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewModel, setViewModel] = useState<AccountViewModel | null>(null);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace('/login?redirect=/account');
    }
  }, [hasHydrated, isAuthenticated, router]);

  useEffect(() => {
    if (!hasHydrated || !token || !isAuthenticated) {
      return;
    }

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [profileResponse, appointmentsResponse, ordersResponse] =
          await Promise.all([
            accountAPI.profile(token),
            accountAPI.appointments(token),
            accountAPI.orders(token),
          ]);

        if (!profileResponse.success || !profileResponse.data) {
          throw new Error(profileResponse.error || 'Failed to load profile');
        }

        if (!appointmentsResponse.success || !appointmentsResponse.data) {
          throw new Error(
            appointmentsResponse.error || 'Failed to load appointments'
          );
        }

        if (!ordersResponse.success || !ordersResponse.data) {
          throw new Error(ordersResponse.error || 'Failed to load orders');
        }

        setViewModel({
          profile: profileResponse.data,
          appointments: appointmentsResponse.data,
          orders: ordersResponse.data,
        });
      } catch (loadError) {
        const message =
          loadError instanceof Error ? loadError.message : 'Failed to load account';

        if (message.toLowerCase().includes('unauthorized')) {
          logout();
          router.replace('/login?redirect=/account');
          return;
        }

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [hasHydrated, isAuthenticated, logout, router, token]);

  const customerName = useMemo(() => {
    if (viewModel?.profile) {
      return `${viewModel.profile.firstName} ${viewModel.profile.lastName}`;
    }
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return 'Customer';
  }, [user, viewModel?.profile]);

  if (!hasHydrated || (!isAuthenticated && !error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-fb-text">Loading account...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-fb-text">Preparing your account dashboard...</p>
      </div>
    );
  }

  if (error || !viewModel) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="text-red-700 mb-3">{error || 'Unable to load account data.'}</p>
          <Link href="/login?redirect=/account" className="fb-btn-primary">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
        <header className="account-card">
          <p className="text-[10px] tracking-widest uppercase text-fb-text mb-2">
            My Account
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-widest uppercase mb-2">Welcome back, {customerName}</h1>
          <p className="text-sm text-fb-text">
            Review your profile, appointments, and order progress.
          </p>
          <button
            className="mt-4 text-xs tracking-widest uppercase border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
            onClick={() => {
              logout();
              router.push('/login');
            }}
          >
            Log Out
          </button>
        </header>

        <section className="account-card">
          <h2 className="text-xs tracking-widest uppercase font-semibold mb-4">
            Customer Personal Info
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <p><strong>Name:</strong> {viewModel.profile.firstName} {viewModel.profile.lastName}</p>
            <p><strong>Email:</strong> {viewModel.profile.email}</p>
            <p><strong>Phone:</strong> {viewModel.profile.phone}</p>
            <p><strong>Date of Birth:</strong> {viewModel.profile.dateOfBirth}</p>
            <p className="md:col-span-2">
              <strong>Address:</strong> {viewModel.profile.address.line1},{' '}
              {viewModel.profile.address.city}, {viewModel.profile.address.state}{' '}
              {viewModel.profile.address.postalCode}, {viewModel.profile.address.country}
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="account-card">
            <h2 className="text-xs tracking-widest uppercase font-semibold mb-4">
              Appointments Due
            </h2>
            {viewModel.appointments.due.length === 0 ? (
              <p className="text-sm text-fb-text">No appointments due in the next 30 days.</p>
            ) : (
              <div className="space-y-3">
                {viewModel.appointments.due.map((appointment) => (
                  <article key={appointment.id} className="border border-gray-200 rounded p-3">
                    <p className="text-[10px] tracking-widest uppercase text-fb-text mb-1">
                      {appointment.status}
                    </p>
                    <h3 className="text-sm font-medium">{appointment.service}</h3>
                    <p className="text-xs text-fb-text">
                      {formatDate(appointment.scheduledDate)} • {appointment.location}
                    </p>
                    <p className="text-xs text-fb-text">
                      Clinician: {appointment.clinician}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="account-card">
            <h2 className="text-xs tracking-widest uppercase font-semibold mb-4">
              Appointments History
            </h2>
            {viewModel.appointments.history.length === 0 ? (
              <p className="text-sm text-fb-text">No past appointments yet.</p>
            ) : (
              <div className="space-y-3">
                {viewModel.appointments.history.map((appointment) => (
                  <article key={appointment.id} className="border border-gray-200 rounded p-3">
                    <p className="text-[10px] tracking-widest uppercase text-fb-text mb-1">
                      {appointment.status}
                    </p>
                    <h3 className="text-sm font-medium">{appointment.service}</h3>
                    <p className="text-xs text-fb-text">
                      {formatDate(appointment.scheduledDate)} • {appointment.location}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="account-card">
            <h2 className="text-xs tracking-widest uppercase font-semibold mb-4">
              Orders Processing
            </h2>
            {viewModel.orders.processing.length === 0 ? (
              <p className="text-sm text-fb-text">No processing orders at the moment.</p>
            ) : (
              <div className="space-y-3">
                {viewModel.orders.processing.map((order) => (
                  <article key={order.id} className="border border-gray-200 rounded p-3">
                    <p className="text-[10px] tracking-widest uppercase text-fb-text mb-1">
                      {order.status}
                    </p>
                    <h3 className="text-sm font-medium">Order #{order.id.slice(0, 8)}</h3>
                    <p className="text-xs text-fb-text">
                      Updated {formatDate(order.updatedAt)}
                    </p>
                    <p className="text-xs text-fb-text">
                      Total {formatCurrency(order.total)}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="account-card">
            <h2 className="text-xs tracking-widest uppercase font-semibold mb-4">
              Past Orders
            </h2>
            {viewModel.orders.history.length === 0 ? (
              <p className="text-sm text-fb-text">No past orders yet.</p>
            ) : (
              <div className="space-y-3">
                {viewModel.orders.history.map((order) => (
                  <article key={order.id} className="border border-gray-200 rounded p-3">
                    <p className="text-[10px] tracking-widest uppercase text-fb-text mb-1">
                      {order.status}
                    </p>
                    <h3 className="text-sm font-medium">Order #{order.id.slice(0, 8)}</h3>
                    <p className="text-xs text-fb-text">
                      Updated {formatDate(order.updatedAt)}
                    </p>
                    <p className="text-xs text-fb-text">
                      Total {formatCurrency(order.total)}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
