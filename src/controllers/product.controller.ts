import { Request, Response } from 'express';
import { createProductValidation } from '../validations/product.validation';
import { logger } from '../utils/logger';
import { getProductFromDB } from '#services/product.services';

interface ProductType {
  _id: String;
  name: String;
  price: Number;
  size: String;
}

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body);
  if (error) {
    logger.error('ER: product-create = ', error.details[0].message);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    });
  } else {
    logger.info('Success post product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Add product success',
      data: value
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDB();

  const {
    params: { name }
  } = req;

  if (name) {
    const filterProduct = products.filter((product: ProductType) => {
      if (product.name === name) {
        return product;
      }
    });

    if (filterProduct.length === 0) {
      logger.error('ER: product-not-found');
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Product not found',
        data: {}
      });
    }

    logger.info('Success get product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: filterProduct[0]
    });
  }

  logger.info('Success get product');
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: products
  });
};
