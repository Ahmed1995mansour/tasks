import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log('Uncaught Exception ', error);
  return res.status(500).send('Oops unexpected error occured, please try again');
};
