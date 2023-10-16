import Joi from 'joi';
import ProductType from 'src/types/product.type';

export const createProductValidation = (payload: ProductType) => {
  // payload berupa req dari body yg dikirim oleh user
  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    size: Joi.string().allow('', null)
  });

  return schema.validate(payload);
};
