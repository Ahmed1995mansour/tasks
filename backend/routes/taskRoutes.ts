import express from 'express';
import { addTask } from '../controllers/taskController';

const router = express.Router();

router.route('/').post(addTask);

export default router;
