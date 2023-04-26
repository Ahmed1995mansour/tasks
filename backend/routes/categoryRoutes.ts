import express from 'express';
import { addCategory } from '../controllers/categoryController';

const router = express.Router();

router.route('/').post(addCategory);
export default router;
