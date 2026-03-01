# FROM BIRTH Local API Server

A lightweight Express.js server for local development. This API serves mock data for products and consultations, allowing you to test the frontend without external dependencies.

**Status:** ⚠️ **LOCAL DEVELOPMENT ONLY**  
When deploying to production, replace this with Supabase, Firebase, or another secure backend.

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm

### Installation

From the project root:

```bash
cd apps/api
pnpm install
```

### Development

From the project root:

```bash
# Start API only
pnpm dev:api

# Or start everything (API + Web)
pnpm dev
```

API will run on **http://localhost:3011**

## API Endpoints

### Public

```
GET /api/public/health        → Health check & status
GET /api/public/stats         → Database statistics
```

### Products

```
GET  /api/products            → List all products
GET  /api/products/:id        → Get single product
GET  /api/products/category/:category  → Filter by category
POST /api/products            → Create product (test only)
```

**Example:** Get all products
```bash
curl http://localhost:3011/api/products
```

### Consultations

```
GET  /api/consultations       → List all consultations
GET  /api/consultations/:id   → Get single consultation
POST /api/consultations       → Submit consultation form
PATCH /api/consultations/:id  → Update status (admin)
```

**Example:** Submit a consultation
```bash
curl -X POST http://localhost:3011/api/consultations \
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

## Mock Database

All data is stored in memory and resets when the server restarts. This is intentional for local development.

### Current Mock Data

**Products:**
- Stem Cell Treatment Mask ($340)
- Exosome Ampoules ($225)
- Regenerative Night Serum ($280)
- Bio-Restore Cream ($195)

**Consultations:**
- Starts empty; submissions are logged to console

## Configuration

Create `.env` file in `apps/api/`:

```env
PORT=3011
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3011
```

## Frontend Configuration

The Next.js app reads the API URL from `NEXT_PUBLIC_API_URL` environment variable.

**Development (localhost):**
```env
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Production (replace with secure backend):**
```env
NEXT_PUBLIC_API_URL=https://api.frombirth.com
```

## Migration to Production

When you're ready to deploy:

1. **Backend Options:**
   - **Supabase** (Recommended - PostgreSQL + Auth)
   - Firebase (Firestore)
   - AWS (RDS + Lambda)
   - Custom Node.js solution

2. **Update Frontend API Client:**
   - Edit [apps/web/src/lib/api.ts](../web/src/lib/api.ts)
   - Change API_URL to production endpoint
   - Add authentication headers (JWT, Firebase token, etc.)

3. **Database Migration:**
   - Export mock data if needed
   - Set up proper authentication & authorization
   - Implement proper error handling
   - Add rate limiting

4. **Security Checklist:**
   - ✅ Enable HTTPS
   - ✅ Implement API key authentication
   - ✅ Add CORS restrictions (no `*`)
   - ✅ Enable HIPAA compliance (for medical data)
   - ✅ Set up database encryption
   - ✅ Add request validation & sanitization

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3011
lsof -ti:3011 | xargs kill -9
```

### CORS errors
Make sure API is running on http://localhost:3001 and `NEXT_PUBLIC_API_URL` is set correctly.

### API not responding
1. Check that API server is running: `pnpm dev:api`
2. Check logs for errors
3. Verify endpoint URL is correct
4. Check network tab in browser DevTools

## Development Workflow

1. **Add new endpoint to API:**
   ```bash
   # 1. Create route in apps/api/src/routes/
   # 2. Import in apps/api/src/index.ts
   # 3. Test with curl or Insomnia
   ```

2. **Use in frontend:**
   ```bash
   # 1. Add method to apps/web/src/lib/api.ts
   # 2. Call from components using the client
   # 3. Handle loading/error states
   ```

3. **Test before production:**
   - Manual testing in browser
   - Automated tests (when added)
   - Performance testing

---

**Last Updated:** 2026-02-28
