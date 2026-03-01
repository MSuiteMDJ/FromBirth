import express, { Request, Response } from 'express';
import { mockDatabase, Product } from '../db.js';

const router = express.Router();

// GET all products
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: mockDatabase.products,
    count: mockDatabase.products.length,
  });
});

// GET single product
router.get('/:id', (req: Request, res: Response) => {
  const product = mockDatabase.products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

// GET products by category
router.get('/category/:category', (req: Request, res: Response) => {
  const products = mockDatabase.products.filter(
    (p) => p.category === req.params.category
  );

  res.json({
    success: true,
    data: products,
    count: products.length,
  });
});

// POST create product (admin only in production)
router.post('/', (req: Request, res: Response) => {
  const { name, price, description, image, tag, category, sku, stock } =
    req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, price, category',
    });
  }

  const newProduct: Product = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    price,
    description: description || '',
    image: image || '/images/placeholder.jpg',
    tag: tag || 'New',
    sku: sku || `FB-${Date.now()}`,
    stock: stock || 0,
    category,
    createdAt: new Date().toISOString(),
  };

  mockDatabase.products.push(newProduct);

  res.status(201).json({
    success: true,
    data: newProduct,
  });
});

export default router;
