import productModel from '#models/product.model';
import { logger } from '#utils/logger';
import ProductType from 'src/types/product.type';

export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload);
};

export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      logger.info('Cannot get data from DB');
      logger.error(error);
    });
};

export const getProductById = async (id: String) => {
  return await productModel.findOne({ _id: id });
};
