import express from 'express';
import {
  addTask,
  completeTask,
  deleteTask,
  getCompletedTasksPercentage,
  getTaskById,
  getTasks,
  getTasksbyDate,
} from '../controllers/taskController';

const router = express.Router();

router.route('/').post(addTask).get(getTasks);
router.route('/percentage').get(getCompletedTasksPercentage);
router.route('/:id').put(completeTask).delete(deleteTask).get(getTaskById);
router.route('/tasksbydate/:date').get(getTasksbyDate);
export default router;
