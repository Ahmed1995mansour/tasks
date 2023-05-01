import { RequestHandler } from 'express';
import mongoose from 'mongoose';

export type UserT = {
  id?: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export type Goal = {
  id: string;
  title: string;
  userId: string;
};

export type Category = {
  id: string;
  title: string;
  userId: string;
  goalId: string;
};

export type Task = {
  id: string;
  title: string;
  date: Date;
  userId: string;
  categoryId: string;
  goalId: string;
};

type WithError<T> = T & { error: string };

export type ExpressHandler<req, res> = RequestHandler<
  string,
  Partial<WithError<res>>,
  Partial<req>,
  any
>;
