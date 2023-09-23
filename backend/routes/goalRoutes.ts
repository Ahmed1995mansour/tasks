import express from 'express';
import { addGoal, deleteGoalById, getGoalById, getGoals } from '../controllers/goalController';

const router = express.Router();

router.route('/').post(addGoal).get(getGoals);
router.route('/:id').get(getGoalById).delete(deleteGoalById);
export default router;
