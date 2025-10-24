import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import pinoHttp from 'pino-http';
import { createErrorHandler } from './modules/common/error-handler';
import { registerRoutes } from './modules';
import { requestLogger } from './modules/common/request-logger';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));
app.use(pinoHttp());
app.use(requestLogger());

registerRoutes(app);

app.use(createErrorHandler());

const port = Number(process.env.PORT || 3001);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`NovaLMS API listening on port ${port}`);
  });
}

export default app;
