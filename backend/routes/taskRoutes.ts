import express from 'express';
import {
  addTask,
  completeTask,
  deleteTask,
  getCompletedTasksPercentage,
  getCompletedTasksPercentagePerGoal,
  getTaskByGoal,
  getTaskById,
  getTasks,
  getTasksbyDate,
} from '../controllers/taskController';

const router = express.Router();

router.route('/').post(addTask).get(getTasks);
router.route('/percentage').get(getCompletedTasksPercentage);
router.route('/:id').put(completeTask).delete(deleteTask).get(getTaskById);
router.route('/tasksbydate/:date').get(getTasksbyDate);
router.route('/goalpercentage/:goalId').get(getCompletedTasksPercentagePerGoal);
router.route(`/tasksbygoal/:goalId`).get(getTaskByGoal);
export default router;
