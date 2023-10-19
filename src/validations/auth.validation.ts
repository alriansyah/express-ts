import Joi from 'joi';
import { UserType } from 'src/types/user.type';

export const createUserValidation = (payload: UserType) => {
  // payload berupa req dari body yg dikirim oleh user
  const schema = Joi.object({
    _id: Joi.string().required(),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().allow('', null)
  });

  return schema.validate(payload);
};

export const createSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });

  return schema.validate(payload);
};

export const refreshSessionValidation = (payload: UserType) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  });

  return schema.validate(payload);
};
