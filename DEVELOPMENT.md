# Development Guide

## Project Overview

FROM BIRTH is a **next-generation luxury skincare platform** combining:
- **E-commerce** for high-end skincare products (DTC model)
- **Medical Consultation Portal** for regenerative therapies with HIPAA compliance

## Tech Stack

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Backend (Local Dev):** Express.js (mock/in-memory database)
- **Mobile/Desktop:** Tauri (wraps Next.js)
- **State Management:** Zustand + TanStack Query
- **Production Backend:** Supabase (PostgreSQL + Auth) or Firebase
- **Payments:** Stripe
- **Scheduling:** Cal.com or Calendly API
- **Email:** SendGrid
- **Monorepo:** pnpm workspaces

## Architecture

```
FROM_BIRTH_App/
├── apps/
│   ├── api/            → Local Express.js backend (dev only)
│   │   └── src/routes/ → Products, Consultations endpoints
│   └── web/            → Next.js web application
├── packages/
│   ├── ui/             → Reusable UI components
│   ├── medical/        → HIPAA forms & workflows
│   └── design-tokens/  → Theme colors, typography
└── README.md           → Project overview
```

Each package is independently deployable and testable.

## Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Up Environment Variables
```bash
# Copy template
cp .env.example apps/web/.env.local

# Copy API template (optional, already has defaults)
cp .env.example apps/api/.env

# Edit with your API keys (for later integration)
# NEXT_PUBLIC_API_URL defaults to http://localhost:3011
```

### 3. Start Development Servers

**Option A: Everything together**
```bash
pnpm dev
# Runs API on localhost:3011 AND Web on localhost:3010
```

**Option B: Start separately**
```bash
# Terminal 1
pnpm dev:api
# Runs on http://localhost:3011

# Terminal 2
pnpm dev:web
# Runs on http://localhost:3010
```

VisiAPI Server (`apps/api/`)
Express.js backend for local development with:
- Mock database (products & consultations)
- RESTful endpoints for frontend
- Request logging & error handling
- Easily replaceable with production backend

See [apps/api/README.md](apps/api/README.md) for endpoints and configuration.

### t `http://localhost:3000`

⚠️ **Important:** Both servers must be running for the app to work correctly.

## Key Components

### Layout (`packages/ui/components/Layout.tsx`)
- Glass-morphism header with FROM BIRTH monogram
- Navigation to Boutique (e-commerce) and Institute (medical)
- Centered logo, navigation menu, account link
- Animated silk gradient background with grain overlay

### ProductCard (`packages/ui/components/ProductCard.tsx`)
- Luxury 4:5 aspect ratio gallery cards
- Hover scale animation (105%)
- Tag badge (e.g., "Bestseller", "Clinical Grade")
- Price & CTA button ("Add to Collection")

### MedicalConsultationForm (`packages/medical/forms/ConsultationForm.tsx`)
- Multi-section intake form:
  - Personal information (name, email, DOB)
  - Medical history & allergies
  - Treatment interest (MSC, Exosome, Combination)
  - Legal disclaimers with checkboxes
- FDA warning about investigational treatments
- HIPAA privacy consent
- Form validation + success/error messages

## Pages

| Page | Route | Purpose |
|------|-------|---------|
| Landing | `/` | Hero with tagline & CTA |
| Collections | `/collections` | Product grid + add to cart |
| Science | `/science` | Technical info on MSC/Exosome |
| Craft | `/craft` | Sourcing & formulation details |
| Consult | `/consult` | Medical intake & booking |

## Design System

### Colors
```ts
// Primary Brand
lilac-light: #e2d9f0    // (Most Used)
lilac-mid:   #c7b6de    // (Buttons, Gradients)
lilac-dark:  #6b4d91    // (Hover, Accents)

// Text
text-dark:   #1a1a1a    // Primary
text-muted:  #6a6670    // Secondary
```Local Testing (Week 1) ✅
- [x] Set up Express API server with mock data
- [x] Create product & consultation endpoints
- [x] Connect frontend to local API
- [ ] Test product listing page
- [ ] Test consultation form submission
- [ ] Manual QA in browser

### 2. Backend Setup (Week 2

### Typography
```ts
serif:  'Playfair Display'   → Headings (editorial luxury)
sans:   'Montserrat'         → Body & UI (modern)

letter-spacing: 0.07em       → Uppercase nav & buttons
```

### Components
All components use Tailwind utilities + Tailwind `@layer` CSS for consistency.

## Next Steps

### 1. Backend Setup (Week 1)
- [ ] Create Supabase project
- [ ] Set up database schema for users, products, consultations
- [ ] Implement authentication (phone + password)
- [ ] Create API routes (`/api/products`, `/api/consultations`)

### 2. Stripe Integration (Week 2)
- [ ] Configure Stripe account
- [ ] Implement payment flow
- [ ] Create order tracking
- [ ] Email receipts via SendGrid

### 3. Calendar Integration (Week 2)
- [ ] Connect Cal.com or Calendly
- [ ] Sync availability from doctor calendar
- [ ] Send consultation confirmation emails

### 4. User Accounts (Week 3)
- [ ] Order history page
- [ ] Saved payment methods
- [ ] Consultation history & reports
- [ ] Profile management

### 5. Tauri Packaging (Week 3)
- [ ] Initialize Tauri project
- [ ] Build desktop app for macOS/Windows
- [ ] Set up app signing & distribution
- [ ] Test iOS/Android builds

### 6. Go Live
- [ ] Deploy web to Vercel
- [ ] Release desktop apps
- [ ] Analytics setup (Plausible or Mixpanel)
- [ ] Customer support (Intercom or Drift)

## Development Workflow

### Creating a New Component
```tsx
// 1. Add to packages/ui/components/MyComponent.tsx
export interface MyComponentProps {
  // ...
}

export const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <div>{/* ... */}</div>;
};

// 2. Export from packages/ui/index.ts
export { MyComponent } from './components/MyComponent';

// 3. Use in apps/web/src/app/page.tsx
import { MyComponent } from '@ui';
```

### Adding a Medical Form
```tsx
// 1. Create in packages/medical/forms/
// 2. Include disclaimers & HIPAA language
// 3. Export from packages/medical/index.ts
// 4. Use in apps/web/src/app/consult/page.tsx
```

## Testing Strategy

- **Unit Tests:** Vitest for utilities
- **Component Tests:** React Testing Library
- **E2E Tests:** Playwright for critical flows (checkout, booking)
- **API Tests:** Postman/Insomnia

## Deployment

### Web (Vercel)
```bash
git push origin main
# Auto-deploys to vercel.app
```

### Desktop (Tauri)
```bash
npm run tauri build
# Outputs: /target/release
```

## Support

For questions about:
- **Design System:** See `packages/design-tokens/colors.ts`
- **Medical Compliance:** Consult with your legal & medical advisors
- **API Integration:** Check `.env.example` for required keys

---

**Last Updated:** 2026-02-28
