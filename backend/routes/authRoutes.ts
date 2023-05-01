import express from 'express';
import { signUpHandler } from '../controllers/authController';

const router = express.Router();

router.route('/').post(signUpHandler);
