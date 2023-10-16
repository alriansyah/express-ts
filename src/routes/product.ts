import { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const ProductRouter = Router();

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get product');
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [
      { id: 1, name: 'Sepatu Nike', price: 200000 },
      { id: 2, name: 'Tas Converse', price: 500000 }
    ]
  });
});

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success post product');
  res.status(200).send({ status: true, statusCode: 200, data: req.body });
});
