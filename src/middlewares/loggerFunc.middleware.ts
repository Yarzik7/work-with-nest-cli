import { Request, Response, NextFunction } from 'express';

export function loggerFuncMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Request...`);
  next();
}
