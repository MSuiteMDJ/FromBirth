# FROM BIRTH Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    FROM BIRTH Stack                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend Layer (Next.js)                                   │
│  ├── Product Catalog                                        │
│  ├── Shopping Cart (Stripe)                                │
│  ├── Medical Consultation Forms                            │
│  └── User Account Management                               │
│                                                              │
│  API Layer (Express.js → Supabase/Firebase)                │
│  ├── Product Management                                    │
│  ├── Consultation Processing                              │
│  ├── Order Processing                                     │
│  └── Patient Data (HIPAA Compliant)                       │
│                                                              │
│  Data Layer (Supabase PostgreSQL)                           │
│  ├── Users & Authentication                               │
│  ├── Products & Inventory                                 │
│  ├── Consultations & Medical Records                      │
│  ├── Orders & Payments                                    │
│  └── Row-Level Security (RLS) Policies                    │
│                                                              │
│  3rd Party Services                                         │
│  ├── Stripe (Payments)                                    │
│  ├── SendGrid (Email)                                     │
│  ├── Cal.com (Scheduling)                                │
│  ├── Tauri (Desktop/Mobile)                              │
│  └── Vercel (Hosting)                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Development vs Production

### Development (Current)
- **API:** Local Express.js server (in-memory mock database)
- **Database:** None (resets on restart)
- **Frontend:** Next.js dev server
- **Authentication:** None yet
- **Payments:** Stripe test mode

### Production (Next Phase)

#### Phase 1: Backend Migration
1. **Supabase Setup**
   - Create PostgreSQL database
   - Set up authentication (phone + password)
   - Configure Row-Level Security (RLS)
   - Enable HTTPS & TLS

2. **Update API Client**
   - Replace Express with Supabase client
   - Add JWT authentication
   - Implement error handling

3. **Test Integration**
   - Run E2E tests against Supabase
   - Verify HIPAA compliance
   - Load testing

#### Phase 2: Deployment
1. **Web Hosting (Vercel)**
   ```bash
   cd apps/web
   vercel deploy
   ```

2. **Database Backups**
   - Enable Supabase backups
   - Test restore procedures

3. **Monitoring**
   - Set up error tracking (Sentry)
   - Analytics (Plausible/Mixpanel)
   - Performance monitoring (Vercel Analytics)

#### Phase 3: Scaling
1. **CDN** (Cloudflare)
2. **Caching** (Redis)
3. **Auto-scaling** (Supabase Vector for ML)

## Environment Variables Transfer

### Development (Local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3011
```

### Production (Supabase)
```env
NEXT_PUBLIC_API_URL=https://api.frombirth.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
SUPABASE_SERVICE_ROLE_KEY=xxxx

STRIPE_SECRET_KEY=sk_live_xxxx
SENDGRID_API_KEY=SG.xxxx
CAL_API_KEY=cal_live_xxxx
```

## Database Schema Reference

Once you migrate to Supabase, create these tables:

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  stock INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Consultations
CREATE TABLE consultations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  medical_history TEXT,
  allergies TEXT,
  medications TEXT,
  treatment_interest TEXT,
  status TEXT DEFAULT 'pending',
  scheduled_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total DECIMAL(10, 2),
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER,
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## HIPAA Compliance

For production deployment:

1. **Data Encryption**
   - Enable encryption at rest (Supabase handles this)
   - Use HTTPS/TLS for all communication
   - Encrypt sensitive fields in database

2. **Access Control**
   - Implement role-based access (admin, doctor, patient)
   - Enable Row-Level Security (RLS) in Supabase
   - Audit logging for medical data access

3. **Data Retention**
   - Define retention periods for medical records
   - Implement secure deletion procedures
   - Regular backups with encryption

4. **Compliance Training**
   - Team training on HIPAA rules
   - Data breach response plan
   - Regular security audits

## Rollout Strategy

1. **Alpha** (Week 1)
   - Internal testing with mock API
   - Frontend/backend integration testing

2. **Beta** (Week 2)
   - Limited user access (50 users)
   - Monitor for bugs & performance

3. **Launch** (Week 3)
   - Full deployment to production
   - Customer acquisition starts

4. **Monitor** (Ongoing)
   - Health checks & alerts
   - Performance optimization
   - Feature rollouts via feature flags

---

**Last Updated:** 2026-02-28
