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

export const updateProductById = async (id: String, payload: ProductType) => {
  const result = await productModel.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: payload
    }
  );
  return result;
};

export const deleteProductById = async (id: String) => {
  const result = await productModel.findOneAndDelete({ _id: id });
  return result;
};
