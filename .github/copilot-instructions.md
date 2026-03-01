# FROM BIRTH App - Copilot Instructions

AI coding agents should understand this codebase as a **luxury skincare e-commerce + medical consultation platform**. Both local dev and production workflows must function correctly.

## Architecture Overview

**pnpm Monorepo Structure**
```
apps/
  ├── web/          # Next.js 14 frontend (port 3010)
  └── api/          # Express.js local dev backend (port 3011)
packages/
  ├── ui/           # Reusable components (ProductCard, Layout)
  ├── medical/      # HIPAA-compliant consultation forms
  └── design-tokens/ # Theme colors, typography
```

**Data Flow:**  
Browser → Next.js (3010) → Express API (3011) → Mock DB (dev) | Supabase (prod)

## Critical Development Workflows

### Starting Development
Both servers are **required** to run simultaneously:
```bash
pnpm dev                    # Runs web + api in parallel
# OR separately in two terminals:
pnpm dev:api                # Express on localhost:3011
pnpm dev:web                # Next.js on localhost:3010
```

**Verification:** Type-check must pass before code review:
```bash
pnpm type-check             # Must output 0 errors
```

### Testing Integration Points
- Products endpoint: `curl http://localhost:3011/api/products`
- Web accessibility: `curl http://localhost:3010/` (should return HTML)
- Both servers must be responsive or form submissions will fail

## Project-Specific Conventions

### File & Type System
1. **All components use `.tsx` extension** (no `.jsx`)
2. **All TypeScript configs must have `"jsx": "preserve"`** (Next.js requirement)
   - This includes root `tsconfig.json`, `packages/*/tsconfig.json`, and `apps/web/tsconfig.json`
   - Different from React-only projects which use `"jsx": "react-jsx"`
3. Type-check is **strict** - no `any` without justification

### Import Path Aliases
Use workspace aliases; never use relative `../../../` imports:
```tsx
import { ProductCard } from '@ui/components/ProductCard'       // ✅
import { ConsultationForm } from '@medical/forms/ConsultationForm'  // ✅
import { colorPalette } from '@design/colors'                  // ✅
```

### API Communication Pattern
- **Client:** Use centralized [apps/web/src/lib/api.ts](../apps/web/src/lib/api.ts) (NOT fetch directly)
- **Auto-routing:** `API_URL` env var selects local (dev) vs Supabase (prod)
- **Response format:** All endpoints return `{ success: boolean, data?: T, error?: string }`

### Styling Rules
1. **Vanilla CSS only** - No Tailwind, no utility frameworks
2. **All styles centralized in globals.css** – Single source of truth for design system
3. **CSS utility classes** for layout/spacing – Defined as semantic classes (`.w-full`, `.flex`, `.mb-3`, `.justify-center`, etc.)
4. **Semantic component classes** for UI patterns – `.fb-btn-primary`, `.fb-input`, `.fb-product-card`, `.consult-panel`, etc.
5. **CSS variables** for colors/tokens – Updated in `:root` section (e.g., `--fb-lilac`, `--fb-dark`, `--fb-hit-pink`)
6. **Responsive breakpoints in CSS media queries** – Mobile-first, with `@media (min-width: 768px)` for tablet and up

### Typography System
- **Font stack (serif):** `'Playfair Display', serif` for all headings (h1, h2, h3)
- **Font stack (text):** `'PT Mono', monospace` for all body text, buttons, inputs, forms
- **Text hierarchy:** Headings use `font-family: var(--fb-font-serif)` automatically via CSS reset
- **Responsive sizing:** Use `font-size: clamp(2.5rem, 8vw, 5.5rem)` for hero headings (scales with viewport)

### Component Architecture
- **Shared UI:** [packages/ui/components/](../packages/ui/components/) (Layout.tsx, ProductCard.tsx)
  - Imported by web pages via `@ui/*` alias
  - Must accept responsive props (mobile-first design patterns)
- **Medical forms:** [packages/medical/forms/ConsultationForm.tsx](../packages/medical/forms/ConsultationForm.tsx)
  - HIPAA compliance required - never log PII
  - Multi-step form with Framer Motion animations
  - Form validation must happen before submission

## Critical Integration Points

### Frontend-Backend Contract
Backend API endpoints must match types in `apps/web/src/lib/api.ts`. When adding endpoints:
1. Define response shape in backend route
2. Update `apiClient` methods in [api.ts](../apps/web/src/lib/api.ts)
3. Update TypeScript interfaces in consuming components
4. Test with curl before using in frontend

### Environment Configuration
- `.env.local` in [apps/web/](../apps/web/) controls `NEXT_PUBLIC_API_URL` (defaults to local:3011)
- `.env` in [apps/api/](../apps/api/) controls database selection (currently mock, will be Supabase)
- Production build requires all env vars set

## Common Gotchas & Solutions

| Issue | Root Cause | Solution |
|-------|-----------|----------|
| "Cannot find module" errors after refactoring | Path alias misconfiguration | Verify `tsconfig.json` paths match `pnpm-workspace.yaml` structure |
| Tailwind classes not applied | Content glob doesn't match new file location | Check `tailwind.config.ts` content array - must explicitly list package paths |
| Type-check fails after styling changes | Undefined Tailwind color references | Use `pnpm -r run type-check` to find specific errors, then update globals.css CSS variables |
| API calls return 404 | Backend server not running | Verify `pnpm dev` shows both "web" and "api" processes |
| Monorepo builds are slow | Broad file scanning in Tailwind | Narrow content globs to specific component directories |
| JSX import/export errors | Incorrect jsx compiler setting | Ensure ALL tsconfig.json files have `"jsx": "preserve"` |

## When Refactoring Large Components

1. **Run type-check frequently** - catches breaking changes early
2. **Update all usages together** - use `list_code_usages` tool to find all consumers
3. **Test both servers** - frontend changes may need API updates
4. **Check Tailwind config** if adding new component locations - content glob may need adjustment
5. **Verify env vars** - different behavior in dev (local:3011) vs prod (Supabase)

## Key Files & When to Edit Them

| File | Purpose | How Often |
|------|---------|-----------|
| [apps/web/src/styles/globals.css](../apps/web/src/styles/globals.css) | Design system CSS variables + component layer | Design changes, color updates |
| [packages/design-tokens/colors.ts](../packages/design-tokens/colors.ts) | Palette definition | Brand color updates |
| [apps/web/tailwind.config.ts](../apps/web/tailwind.config.ts) | Tailwind theme + content globs | Typography, spacing system changes |
| [apps/web/src/lib/api.ts](../apps/web/src/lib/api.ts) | API client methods | New backend endpoints |
| [apps/api/src/routes/](../apps/api/src/routes/) | REST endpoints (dev only) | Testing new features locally |
| [packages/ui/components/](../packages/ui/components/) | Shared components | UI improvements, responsive fixes |
| [packages/medical/forms/](../packages/medical/forms/) | HIPAA forms | Medical flow changes |

---

**Questions?** Check DEVELOPMENT.md for detailed setup or README.md for architecture overview.
