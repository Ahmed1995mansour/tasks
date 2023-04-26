import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel';

// @desc   Add new task
// @route  POST /api/tasks
// @acess  Public

const addTask = asyncHandler(async (req, res) => {
  const { title, category, date } = req.body;
  if (!title && !category && !date) {
    res.status(400).send('All fields are required!');
  } else {
    const task = new Task({
      category,
      title,
      date: new Date(date),
    });
    const addedTask = await task.save();
    res.status(201).send(addedTask);
  }
});

export { addTask };
