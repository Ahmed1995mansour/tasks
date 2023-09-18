import express from 'express';
import { addGoal, getGoalById, getGoals } from '../controllers/goalController';

const router = express.Router();

router.route('/').post(addGoal).get(getGoals);
router.route('/:id').get(getGoalById);
export default router;
