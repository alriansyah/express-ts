import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { createUserValidation, createSessionValidation, refreshSessionValidation } from '#validations/auth.validation';
import { createUser, findUserByEmail } from '#services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { hashing, checkPassword } from '#utils/hashing';
import { signJWT, verifyJWT } from '#utils/jwt';
import { UserInfo } from 'src/types/user.type';
import moment from 'moment-timezone';
import jwtDecode from 'jwt-decode';

moment.tz.setDefault('Asia/Jakarta');

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4();
  const { error, value } = createUserValidation(req.body);
  if (error) {
    logger.error('ER: auth - register = ', error.details[0].message);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    });
  }

  try {
    value.password = `${hashing(value.password)}`;
    await createUser(value);
    logger.info('Success register user');
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'Success register user'
    });
  } catch (error) {
    logger.error('ER: auth - register = ', error);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    });
  }
};

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body);
  if (error) {
    logger.error('ER: auth - create session = ', error.details[0].message);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    });
  }
  try {
    const user: any = await findUserByEmail(value.email);
    const isValid = checkPassword(value.password, user.password);

    if (!isValid) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'Invalid email or password',
        data: {}
      });
    }

    const tokenPayload = {
      _id: user.id,
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const accessToken = signJWT(tokenPayload, { expiresIn: '1d' });
    const userInfo: UserInfo = jwtDecode(accessToken);

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Login success',
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        tokenCreated: moment.unix(userInfo.iat).format('DD-MM-YYYY HH:mm:ss'),
        tokenExpired: moment.unix(userInfo.exp).format('DD-MM-YYYY HH:mm:ss'),
        accessToken
      }
    });
  } catch (error: any) {
    logger.error('ER: auth - create session = ', error.message);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message,
      data: {}
    });
  }
};

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body);
  if (error) {
    logger.error('ER: auth - refresh session = ', error.details[0].message);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    });
  }

  try {
    const { decoded }: any = verifyJWT(value.refreshToken);

    const user = await findUserByEmail(decoded._doc.email);
    if (!user) return false;

    const tokenPayload = {
      _id: user.id,
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const accessToken = signJWT(tokenPayload, { expiresIn: '1d' });
    const userInfo: UserInfo = jwtDecode(accessToken);

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Refresh session success',
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        tokenCreated: moment.unix(userInfo.iat).format('DD-MM-YYYY HH:mm:ss'),
        tokenExpired: moment.unix(userInfo.exp).format('DD-MM-YYYY HH:mm:ss'),
        accessToken
      }
    });
  } catch (error: any) {
    logger.error('ER: auth - refresh session = ', error.message);
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message,
      data: {}
    });
  }
};
