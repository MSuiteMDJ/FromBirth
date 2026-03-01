import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productsRouter from './routes/products.js';
import consultationsRouter from './routes/consultations.js';
import publicRouter from './routes/public.js';
import authRouter from './routes/auth.js';
import accountRouter from './routes/account.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3011;

// Middleware
app.use(express.json());
app.use(cors());

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/public', publicRouter);
app.use('/api/products', productsRouter);
app.use('/api/consultations', consultationsRouter);
app.use('/api/auth', authRouter);
app.use('/api/account', accountRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🌸 FROM BIRTH API (LOCAL DEV)        ║
╚════════════════════════════════════════╝

✅ Server running on http://localhost:${PORT}

📚 Endpoints:
  GET  /api/public/health          → Health check
  GET  /api/public/stats           → Database stats
  
  GET  /api/products               → List all products
  GET  /api/products/:id           → Get single product
  GET  /api/products/category/:cat → Get products by category
  POST /api/products               → Create product (dev only)

  GET  /api/consultations          → List all consultations
  GET  /api/consultations/:id      → Get single consultation
  POST /api/consultations          → Submit consultation form
  PATCH /api/consultations/:id     → Update consultation status

  POST /api/auth/login             → Demo login
  GET  /api/auth/me                → Get current demo user

  GET  /api/account/profile        → Account personal info
  GET  /api/account/appointments   → Appointments due/history
  GET  /api/account/orders         → Processing/history orders

⚠️  NOTE: This is a local mock database.
    Data will reset on server restart.
    Update to Supabase/Firebase for production.

`);
});
