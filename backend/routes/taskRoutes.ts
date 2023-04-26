import express from 'express';
import {
  addTask,
  completeTask,
  getCompletedTasksPercentage,
  getTasksbyDate,
} from '../controllers/taskController';

const router = express.Router();

router.route('/').post(addTask);
router.route('/percentage').get(getCompletedTasksPercentage);
router.route('/:date').get(getTasksbyDate);
router.route('/:id').put(completeTask);
export default router;
