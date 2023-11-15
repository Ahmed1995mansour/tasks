import express from 'express';
import {
  addTask,
  completeTask,
  deleteTask,
  getCompletedTasksPercentage,
  getCompletedTasksPercentageByDate,
  getCompletedTasksPercentagePerGoal,
  getTaskByGoal,
  getTaskById,
  getTasks,
  getTasksCount,
  getTasksCountPerDay,
  getTasksCountPerGoal,
  getTasksbyDate,
  updateTask,
} from '../controllers/taskController';

const router = express.Router();

router.route('/').post(addTask).get(getTasks);
router.route('/count').get(getTasksCount);
router.route('/percentage').get(getCompletedTasksPercentage);
router.route('/percentage/:date').get(getCompletedTasksPercentageByDate);
router.route('/:id').put(completeTask).delete(deleteTask).get(getTaskById).put(updateTask);
router.route('/update/:id').put(updateTask);
router.route('/tasksbydate/:date').get(getTasksbyDate);
router.route('/goalpercentage/:goalId').get(getCompletedTasksPercentagePerGoal);
router.route(`/tasksbygoal/:goalId`).get(getTaskByGoal);
router.route(`/countpergoal/:goalId`).get(getTasksCountPerGoal);
router.route(`/countperday/:date`).get(getTasksCountPerDay);
export default router;
