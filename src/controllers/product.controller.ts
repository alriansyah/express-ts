import { Request, Response } from 'express';
import { createProductValidation, updateProductValidation } from '../validations/product.validation';
import { logger } from '../utils/logger';
import { addProductToDB, getProductById, getProductFromDB, updateProductById } from '#services/product.services';
import { v4 as uuidv4 } from 'uuid';

export const createProduct = async (req: Request, res: Response) => {
  req.body._id = uuidv4();
  const { error, value } = createProductValidation(req.body);
  if (error) {
    logger.error('ER: product-create = ', error.details[0].message);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    });
  }

  try {
    await addProductToDB(value);
    logger.info('Success post product');
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Add product success'
    });
  } catch (error) {
    logger.error('ER: product-create = ', error);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;

  if (id) {
    const product = await getProductById(id);
    if (product) {
      logger.info('Success get product');
      return res.status(200).send({
        status: true,
        statusCode: 200,
        data: product
      });
    } else {
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Product Not Found',
        data: {}
      });
    }
  } else {
    const products: any = await getProductFromDB();
    logger.info('Success get product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: products
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;

  const { error, value } = updateProductValidation(req.body);
  if (error) {
    logger.error('ER: product-create = ', error.details[0].message);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    });
  }

  try {
    console.log(value);
    await updateProductById(id, value);
    logger.info('Success update product');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Update product success'
    });
  } catch (error) {
    logger.error('ER: product-create = ', error);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    });
  }
};
