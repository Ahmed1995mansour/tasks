import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api';
import { signJwt } from '../auth';
import { hashPassword } from '../helpers/helpers';
import User from '../models/userModel';
import { ExpressHandler } from '../types';

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const existing = (await User.findOne({ email })) || (await User.findOne({ username }));
  if (existing) {
    return res.status(403).send({ error: 'User already Exists' });
  }

  const user = new User({
    firstName,
    lastName,
    email,
    username,
    password: hashPassword(password),
  });

  const addedUser = await user.save();

  const jwt = signJwt({ userId: addedUser._id });

  return res.status(201).send({ jwt });
};

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const existing =
    (await User.findOne({ email: login })) || (await User.findOne({ username: login }));

  if (!existing) {
    return res.status(401).send({ error: 'No user exists with these credentials' });
  }

  if (existing.password !== hashPassword(password)) {
    return res.status(401).send({ error: 'Password is Incorrect' });
  }

  const user = {
    firstName: existing.firstName,
    lastName: existing.lastName,
    username: existing.username,
    email: existing.email,
    id: existing._id,
  };

  const jwt = signJwt({ userId: existing._id });

  return res.status(200).send({ user, jwt });
};
