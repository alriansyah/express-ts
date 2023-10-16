import { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { createProductValidation } from '../validation/product.validation';

export const ProductRouter = Router();

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get product');
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: [
      { id: 1, name: 'Sepatu Nike', price: 200000 },
      { id: 2, name: 'Tas Converse', price: 500000 }
    ]
  });
});

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body);
  if (error) {
    logger.error('ER: product-create = ', error.details[0].message);
    res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} });
  } else {
    logger.info('Success post product');
    return res.status(200).send({ status: true, statusCode: 200, message: 'Add product success', data: value });
  }
});
