import express, { Request, Response } from 'express';
import { createSession, requireAuth, toPublicUser, AuthenticatedRequest } from '../middleware/auth.js';
import { mockDatabase } from '../db.js';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required',
    });
  }

  const user = mockDatabase.users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase()
  );

  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials',
    });
  }

  const token = createSession(user.id);

  res.json({
    success: true,
    data: {
      token,
      user: toPublicUser(user),
    },
  });
});

router.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    data: toPublicUser(req.authUser!),
  });
});

export default router;
