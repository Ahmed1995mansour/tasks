import express from 'express';
import { addGoal, getGoals } from '../controllers/goalController';

const router = express.Router();

router.route('/').post(addGoal).get(getGoals);

export default router;
