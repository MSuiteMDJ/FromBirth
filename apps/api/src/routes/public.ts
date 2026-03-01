import express, { Request, Response } from 'express';
import { mockDatabase } from '../db.js';

const router = express.Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'FROM BIRTH API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Get stats
router.get('/stats', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      products: mockDatabase.products.length,
      consultations: mockDatabase.consultations.length,
      orders: mockDatabase.orders.length,
    },
  });
});

export default router;
