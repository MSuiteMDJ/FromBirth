# FROM BIRTH App

A sophisticated luxury skincare e-commerce and medical consultation platform built with **Next.js + Express.js (Local Dev) + Tauri**, combining high-end retail with clinical-grade regenerative therapy booking.

## Quick Start

```bash
# 1. Clone & install
git clone <repo>
cd F├── api/                        🔧 Express.js Local Backend
│   │   ├── src/
│   │   │   ├── index.ts            → Server setup & routes
│   │   │   ├── db.ts               → Mock database
│   │   │   └── routes/             → API endpoints
│   │   │       ├── products.ts
│   │   │       ├── consultations.ts
│   │   │       └── public.ts
│   │   └── README.md               → API documentation
│   │
│   └── web/                        🌐 Next.js Frontend
│       ├── src/
│       │   ├── app/                → Pages
│       │   │   ├── layout.tsx      → Root layout
│       │   │   ├── page.tsx        → Home
│       │   │   ├── collections/    → Products
│       │   │   ├── science/        → Info pages
│       │   │   └── consult/        → Medical forms
│       │   ├── lib/
│       │   │   └── api.ts          → API client
│       │   └── styles/
│       │       └── globals.css     → Tailwind + custom
│       └── public/                 → Static assets
│
├── packages/
│   ├── ui/                         🎨 Shared Components
│   │   └── components/
│   │       ├── Layout.tsx          → Header/footer
│   │       └── ProductCard.tsx     → Product display
│   │
│   ├── medical/                    📋 HIPAA Forms
│   │   └── forms/
│   │       └── ConsultationForm.tsx
│   │
│   └── design-tokens/              🎭 Theme System
│       └── colors.ts               → Lilac palette
│
├── start.sh                        → Quick setup script
├── .env.example                    → Environment template
├── DEVELOPMENT.md                  → Dev guide & workflow
├── DEPLOYMENT.md                   → Production deployment
└── README.md                       → This file
```
FROM_BIRTH_App/
├── apps/
│   └── web/                 # Next.js web application
│       ├── src/
│       │   ├── app/         # Next.js App Router
│       │   ├── styles/      # Global styles
│       │   └── components/  # Page-specific components
│       ├── public/          # Static assets
│       ├── tailwind.config.ts
```bash
# 1. Clone & install
git clone <repo>
cd FROM_BIRTH_App
pnpm install

# 2. Start both servers
pnpm dev

# 3. Open browser
# 🌐 http://localhost:3000 (Frontend)
# 📡 http://localhost:3001 (API)
```

**Or run setup script:**
```bash
bash start.sh
```

### Alternative: Run Separately

```bash
# Terminal 1: API Server
pnpm dev:api
# RDevelopment Workflow

### Testing Products Page
```bash
curl http://localhost:3001/api/products
```

### Testing Consultation Submission
```bash
curl -X POST http://localhost:3001/api/consultations \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "treatmentInterest": "msc",
    "termsAccepted": true,
    "privacyAccepted": true
  }'
```

### API Health Check
```bash
curPages & Features

| Page | Path | Purpose |
|------|------|---------|
| **Landing** | `/` | Hero with tagline & "Discover Collection" CTA |
| **Products** | `/collections` | Product grid, fetches from API, add to cart |
| **Science** | `/science` | Stem cell & exosome technology info |
| **Craft** | `/craft` | Sourcing, formulation, & QA details |
| **Institute** | `/consult` | Medical consultation intake form with disclaimers |
1. **Update Environment Variables**
### Immediate (This Week)
- [ ] Run local dev: `pnpm dev`
- [ ] Test product listing: Visit `/collections`
- [ ] Test consultation form: Visit `/consult`
- [ ] Verify API responses: `curl http://localhost:3001/api/products`

### Short-Term (Next 1-2 Weeks)
- [ ] Design & add product images
- [ ] Set up Supabase PostgreSQL database
- [ ] Migrate from Express mock → Supabase
- [ ] Implement user authentication
- [ ] Set up Stripe test payments

### Medium-Term (Weeks 3-4)
- [ ] Connect to Cal.com/Calendly for scheduling
- [ ] Set up SendGrid for email confirmations
- [ ] Build user account dashboard
- [ ] Implement order history page
- [ ] Add product search & filtering

### Long-Term (Post-Launch)
- [ ] Deploy to Vercel (frontend)
- [ ] Deploy API to production
- [ ] Set up Tauri for desktop/mobile
- [ ] Implement analytics
- [ ] Scale infrastructure
3. **Update API Client**
   - Replace Express with Supabase/Firebase SDK
   - Add authentication headers

4. **Deploy**
   - Web: `vercel deploy` (Vercel)
   - API: Deploy to cloud (Render, Railway, AWS)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.
⚠️ **Both servers must be running for full functionality.**

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
cd FROM_BIRTH_App
pnpm install
```

### Development

```bash
# Run all dev servers
pnpm dev

# Or run individual workspace
cd apps/web
pnpm dev
```

The web app will be available at `http://localhost:3000`.

## Pages

- **/** — Hero landing page
- **/collections** — Product showcase & e-commerce
- **/science** — Scientific background on stem cell technology
- **/craft** — Formulation details and sourcing
- **/consult** — Medical consultation booking form (with disclaimers)

## Components

### Layout (`@ui/components/Layout`)
Main shell with header, footer, and navigation. Includes the FROM BIRTH monogram and luxury styling.

### ProductCard (`@ui/components/ProductCard`)
Luxury product display with hover animations, pricing, and "Add to Collection" CTA.

### MedicalConsultationForm (`@medical/forms/ConsultationForm`)
HIPAA-compliant intake form with:
- Personal information collection
- Medical history questionnaire
- Treatment interest selection
- Legal disclaimers (FDA warning, MSC therapy disclaimer, privacy consent)

## Styling

Uses **Tailwind CSS** with custom extensions for the FROM BIRTH aesthetic:
- Glass morphism headers
- Animated silk gradient backgrounds
- Editorial grain overlays
- Luxury typography spacing

## Next Steps

1. **Tauri Integration**: Wrap Next.js build in Tauri for desktop/mobile deployment
2. **Backend API**: Connect to Supabase or Firebase for:
   - Patient data management (HIPAA-compliant)
   - Stripe integration for e-commerce
   - Cal.com/Calendly for medical scheduling
3. **Authentication**: Implement user accounts with OAuth and SMS verification
4. **Product Management**: Set up product database and inventory system
5. **Email Templates**: Design consultation confirmation & follow-up sequences

---

**© 2026 FROM BIRTH. All rights reserved.**
