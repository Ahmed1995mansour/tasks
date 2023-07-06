import express from 'express';
import {
  addTask,
  completeTask,
  getCompletedTasksPercentage,
  getTasks,
  getTasksbyDate,
} from '../controllers/taskController';

const router = express.Router();

router.route('/').post(addTask).get(getTasks);
router.route('/percentage').get(getCompletedTasksPercentage);
router.route('/:date').get(getTasksbyDate);
router.route('/:id').put(completeTask);
export default router;
