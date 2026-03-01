/**
 * Mock Database for Local Development
 * Replace with Supabase/Firebase when deploying to production
 */

import { v4 as uuidv4 } from 'uuid';

const daysFromNowIso = (days: number) => {
  const value = new Date();
  value.setDate(value.getDate() + days);
  return value.toISOString();
};

const daysAgoIso = (days: number) => {
  const value = new Date();
  value.setDate(value.getDate() - days);
  return value.toISOString();
};

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tag: string;
  sku: string;
  stock: number;
  category: 'skincare' | 'serum' | 'mask';
  createdAt: string;
}

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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

export interface Appointment {
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

export interface Consultation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  preferredConsultDate?: string;
  preferredConsultTime?: string;
  medicalHistory?: string;
  allergies?: string;
  medications?: string;
  treatmentInterest: string;
  clinicLocation?: string;
  hasBloodWork?: boolean;
  bloodWorkDate?: string;
  canTravelToClinic?: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
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

const DEMO_USER_ID = 'demo-user-1';

const seededProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Stem Cell Treatment Mask',
    price: 340,
    description: 'Clinical-grade regenerative mask with MSC extract and peptide complex',
    image: '/FB_Mask.png',
    tag: 'Bestseller',
    sku: 'FB-MASK-001',
    stock: 50,
    category: 'mask',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Exosome Ampoules',
    price: 225,
    description: 'Concentrated exosome serum for intensive skin regeneration',
    image: '/FB_Bottles.png',
    tag: 'Clinical Grade',
    sku: 'FB-AMP-001',
    stock: 75,
    category: 'serum',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Regenerative Night Serum',
    price: 280,
    description: 'Overnight repair serum with stem cell bioactives',
    image: '/FB_Serum.png',
    tag: 'New',
    sku: 'FB-SER-001',
    stock: 60,
    category: 'serum',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Bio-Restore Cream',
    price: 195,
    description: 'Lightweight moisturizer with cellular repair complex',
    image: '/FB_Boxed.png',
    tag: 'Essential',
    sku: 'FB-CRM-001',
    stock: 100,
    category: 'skincare',
    createdAt: new Date().toISOString(),
  },
];

const seededUsers: DemoUser[] = [
  {
    id: DEMO_USER_ID,
    email: 'demo@frombirth.com',
    password: 'frombirth-demo',
    firstName: 'Amelia',
    lastName: 'Hart',
    phone: '+1 (415) 555-0142',
    dateOfBirth: '1990-08-14',
    address: {
      line1: '2180 Union Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94123',
      country: 'USA',
    },
    createdAt: daysAgoIso(120),
    updatedAt: daysAgoIso(2),
  },
];

const seededAppointments: Appointment[] = [
  {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    service: 'MSC Therapy Follow-Up',
    status: 'scheduled',
    scheduledDate: daysFromNowIso(7),
    location: 'FROM BIRTH Institute - San Francisco',
    clinician: 'Dr. L. Moreno',
    notes: 'Review recovery markers and skin response.',
    createdAt: daysAgoIso(20),
    updatedAt: daysAgoIso(3),
  },
  {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    service: 'Exosome Protocol Session',
    status: 'scheduled',
    scheduledDate: daysFromNowIso(21),
    location: 'FROM BIRTH Institute - San Francisco',
    clinician: 'Dr. L. Moreno',
    createdAt: daysAgoIso(14),
    updatedAt: daysAgoIso(1),
  },
  {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    service: 'Regenerative Assessment',
    status: 'scheduled',
    scheduledDate: daysFromNowIso(45),
    location: 'FROM BIRTH Institute - San Francisco',
    clinician: 'Dr. K. Vale',
    createdAt: daysAgoIso(5),
    updatedAt: daysAgoIso(1),
  },
  {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    service: 'Initial Consultation',
    status: 'completed',
    scheduledDate: daysAgoIso(36),
    location: 'FROM BIRTH Institute - San Francisco',
    clinician: 'Dr. L. Moreno',
    createdAt: daysAgoIso(42),
    updatedAt: daysAgoIso(36),
  },
  {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    service: 'Biomarker Review',
    status: 'cancelled',
    scheduledDate: daysAgoIso(11),
    location: 'Virtual',
    clinician: 'Dr. K. Vale',
    createdAt: daysAgoIso(18),
    updatedAt: daysAgoIso(12),
  },
];

const seededOrders: Order[] = [
  {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    email: 'demo@frombirth.com',
    items: [
      {
        productId: seededProducts[0].id,
        quantity: 1,
        price: seededProducts[0].price,
      },
      {
        productId: seededProducts[1].id,
        quantity: 1,
        price: seededProducts[1].price,
      },
    ],
    total: seededProducts[0].price + seededProducts[1].price,
    status: 'pending',
    shippingAddress: {
      line1: '2180 Union Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94123',
      country: 'USA',
    },
    createdAt: daysAgoIso(2),
    updatedAt: daysAgoIso(1),
  },
  {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    email: 'demo@frombirth.com',
    items: [
      {
        productId: seededProducts[3].id,
        quantity: 2,
        price: seededProducts[3].price,
      },
    ],
    total: seededProducts[3].price * 2,
    status: 'shipped',
    shippingAddress: {
      line1: '2180 Union Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94123',
      country: 'USA',
    },
    createdAt: daysAgoIso(6),
    updatedAt: daysAgoIso(3),
  },
  {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    email: 'demo@frombirth.com',
    items: [
      {
        productId: seededProducts[2].id,
        quantity: 1,
        price: seededProducts[2].price,
      },
    ],
    total: seededProducts[2].price,
    status: 'delivered',
    shippingAddress: {
      line1: '2180 Union Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94123',
      country: 'USA',
    },
    createdAt: daysAgoIso(28),
    updatedAt: daysAgoIso(19),
  },
  {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    email: 'demo@frombirth.com',
    items: [
      {
        productId: seededProducts[1].id,
        quantity: 1,
        price: seededProducts[1].price,
      },
    ],
    total: seededProducts[1].price,
    status: 'cancelled',
    createdAt: daysAgoIso(49),
    updatedAt: daysAgoIso(47),
  },
];

// Mock Database
export const mockDatabase = {
  products: seededProducts,
  users: seededUsers,
  appointments: seededAppointments,
  consultations: [] as Consultation[],
  orders: seededOrders,
};
