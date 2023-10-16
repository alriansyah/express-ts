import Joi from 'joi';

interface ProductInterface {
  name: String;
  price: Number;
}

export const createProductValidation = (payload: ProductInterface) => {
  // payload berupa req dari body yg dikirim oleh user
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', null)
  });

  return schema.validate(payload);
};
