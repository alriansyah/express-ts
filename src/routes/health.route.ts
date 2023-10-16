import { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const HealthRouter = Router();

// http://localhost:3001/health
HealthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Health check');
  res.status(200).send({ status: 200, data: 'hello world' });
});
