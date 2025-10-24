import type { Express } from 'express';
import { healthRouter } from './system/health.router';
import { authRouter } from './auth/auth.router';
import { coursesRouter } from './courses/courses.router';
import { notFound } from './common/error-handler';

export const registerRoutes = (app: Express) => {
  app.use('/health', healthRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/courses', coursesRouter);
  app.use('*', () => notFound());
};
