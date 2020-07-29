import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface Payload {
  iat: number;
  exp: number;
  sub: string;
}

export default function provideAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is not found', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as Payload;

    request.user = { id: sub };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
