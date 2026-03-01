/**
 * API Client for Frontend
 * Automatically uses local API in development, server in production
 */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.frombirth.com';

interface RequestOptions {
  token?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const request = async <T>(
  endpoint: string,
  init: RequestInit,
  options?: RequestOptions
): Promise<ApiResponse<T>> => {
  const headers = new Headers(init.headers);

  if (options?.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...init,
      headers,
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const apiClient = {
  async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return request<T>(
      endpoint,
      {
        method: 'GET',
      },
      options
    );
  },

  async post<T>(
    endpoint: string,
    data: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return request<T>(
      endpoint,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
      options
    );
  },

  async patch<T>(
    endpoint: string,
    data: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return request<T>(
      endpoint,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
      options
    );
  },
};

// Product API
export const productAPI = {
  getAll: () => apiClient.get('/api/products'),
  getById: (id: string) => apiClient.get(`/api/products/${id}`),
  getByCategory: (category: string) =>
    apiClient.get(`/api/products/category/${category}`),
};

// Consultation API
export const consultationAPI = {
  submit: (data: any) => apiClient.post('/api/consultations', data),
  getById: (id: string) => apiClient.get(`/api/consultations/${id}`),
};

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AccountProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AccountAppointment {
  id: string;
  userId: string;
  service: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  scheduledDate: string;
  location: string;
  clinician: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountOrder {
  id: string;
  userId?: string;
  email: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'completed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const authAPI = {
  login: (data: { email: string; password: string }) =>
    apiClient.post<{ token: string; user: AuthUser }>('/api/auth/login', data),
  me: (token: string) =>
    apiClient.get<AuthUser>('/api/auth/me', {
      token,
    }),
};

export const accountAPI = {
  profile: (token: string) =>
    apiClient.get<AccountProfile>('/api/account/profile', {
      token,
    }),
  appointments: (token: string) =>
    apiClient.get<{
      due: AccountAppointment[];
      history: AccountAppointment[];
    }>('/api/account/appointments', {
      token,
    }),
  orders: (token: string) =>
    apiClient.get<{
      processing: AccountOrder[];
      history: AccountOrder[];
    }>('/api/account/orders', {
      token,
    }),
};

// Public API
export const publicAPI = {
  health: () => apiClient.get('/api/public/health'),
  stats: () => apiClient.get('/api/public/stats'),
};
