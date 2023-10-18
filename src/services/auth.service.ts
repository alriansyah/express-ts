import userModel from '#models/user.model';
import { UserType } from 'src/types/user.type';

export const createUser = async (payload: UserType) => {
  return await userModel.create(payload);
};

export const findUserByEmail = async (email: string) => {
  return await userModel.findOne({ email });
};
