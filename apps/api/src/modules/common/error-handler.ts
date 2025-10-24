import type { ErrorRequestHandler } from 'express';
import createError from 'http-errors';
import { ZodError } from 'zod';

export const createErrorHandler = (): ErrorRequestHandler => {
  return (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    let details: unknown = err.details ?? undefined;

    if (err instanceof ZodError) {
      status = 400;
      message = 'Validation failed';
      details = err.flatten();
    }

    if (status === 500 && process.env.NODE_ENV !== 'production') {
      console.error(err);
    }

    const traceId = res.locals.traceId;

    res.status(status).json({
      code: status,
      message,
      details,
      traceId,
    });
  };
};

export const notFound = () => {
  throw createError(404, 'Resource not found');
};
