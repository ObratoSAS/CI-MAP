import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';

export const requestLogger = (): RequestHandler => (req, res, next) => {
  const traceId = randomUUID();
  res.locals.traceId = traceId;
  res.setHeader('X-Trace-Id', traceId);
  next();
};
