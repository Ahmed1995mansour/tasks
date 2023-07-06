import asyncHandler from 'express-async-handler';
import { verifyJwt } from '../auth';
import User from '../models/userModel';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyJwt(token);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized, faild token');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});
