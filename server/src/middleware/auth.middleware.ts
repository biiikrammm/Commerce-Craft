import type { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service.js';

export interface AuthRequest extends Request {
  userId?: string;
  sessionId?: string;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No auth token, check for session ID in headers or generate one
      req.sessionId = req.headers['x-session-id'] as string || generateSessionId();
      return next();
    }

    const token = authHeader.substring(7);
    const { userId } = authService.verifyToken(token);
    req.userId = userId;
    next();
  } catch (error) {
    // If token is invalid, treat as guest with session
    req.sessionId = req.headers['x-session-id'] as string || generateSessionId();
    next();
  }
}

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const token = authHeader.substring(7);
    const { userId } = authService.verifyToken(token);
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}
