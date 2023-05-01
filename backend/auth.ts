import jwt from 'jsonwebtoken';
import mongodb from 'mongodb';
import { getJwtSecret } from './helpers/helpers';

type Jwtobject = {
  userId: mongodb.ObjectId;
};

export const signJwt = (obj: Jwtobject): string => {
  return jwt.sign(obj, getJwtSecret(), {
    expiresIn: '7d',
  });
};

export const verifyJwt = (token: string): Jwtobject => {
  return jwt.verify(token, getJwtSecret()) as Jwtobject;
};
