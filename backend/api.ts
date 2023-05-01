import { type } from 'os';
import { UserT } from './types';

export type SignUpRequest = Pick<
  UserT,
  'email' | 'firstName' | 'lastName' | 'password' | 'username'
>;
export type SignUpResponse = { jwt: string };

export type SignInRequest = { login: string; password: string };
export type SignInResponse = {
  user: Pick<UserT, 'firstName' | 'lastName' | 'email' | 'username' | 'id'>;
  jwt: string;
};
