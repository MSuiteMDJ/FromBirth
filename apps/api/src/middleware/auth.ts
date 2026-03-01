import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DemoUser, mockDatabase } from '../db.js';

const sessionStore = new Map<string, string>();

export interface PublicUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthenticatedRequest extends Request {
  authUser?: DemoUser;
  authToken?: string;
}

export const toPublicUser = (user: DemoUser): PublicUser => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
});

export const createSession = (userId: string) => {
  const token = uuidv4();
  sessionStore.set(token, userId);
  return token;
};

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }

  const token = authHeader.slice('Bearer '.length).trim();
  const userId = sessionStore.get(token);

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }

  const user = mockDatabase.users.find((item) => item.id === userId);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }

  req.authUser = user;
  req.authToken = token;
  next();
};
