import express from 'express';
import { addCategory, getCategories, getCategoriesByGoal } from '../controllers/categoryController';

const router = express.Router();

router.route('/').post(addCategory);
router.route('/').get(getCategories);
router.route('/categoriesbygoal/:goalId').get(getCategoriesByGoal);
export default router;
