import express from 'express';
import { addCategory, getCategories } from '../controllers/categoryController';

const router = express.Router();

router.route('/').post(addCategory);
router.route('/').get(getCategories);
export default router;
