import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel';

// @desc   Add new task
// @route  POST /api/tasks
// @acess  Public

const addTask = asyncHandler(async (req, res) => {
  const { title, goal, date } = req.body;
  const { user } = req;
  const convertedDate = new Date(date);

  if (!title && !date && !goal) {
    res.status(400).send('All fields are required!');
  } else {
    const task = new Task({
      goal,
      user: user._id,
      title,
      date: convertedDate,
      done: false,
    });
    const addedTask = await task.save();
    res.status(201).send(addedTask);
  }
});

// @desc   delete existing task
// @route  DELETE /api/tasks
// @acess  Private

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.body;
  const { user } = req;

  if (!user) {
    res.status(401).send('Not Authorized');
  }

  await Task.deleteOne(taskId);

  res.sendStatus(200);
});

// @desc   Fetch all tasks
// @route  GET /api/tasks
// @access Private

const getTasks = asyncHandler(async (req, res) => {
  const { user } = req;

  if (!user) {
    res.status(401).send('Not Authorized');
  }

  const tasks = await Task.find({ user: user._id }).populate('goal');

  if (!tasks) {
    res.status(404).send('No task found');
  } else {
    res.status(200).json(tasks);
  }
});

// @desc   Fetch tasks of certain date
// @route  GET /api/tasks
// @access Public

const getTasksbyDate = asyncHandler(async (req, res) => {
  const date = new Date(req.params.date);
  const { user } = req;

  if (!user) {
    res.status(401).send('Not Authorized');
  }
  const tasks = await Task.find({ user: user._id, date }).populate('goal');

  if (!tasks) {
    res.status(404).send('No task found');
  } else {
    res.status(200).json(tasks);
  }
});

// @desc   Complete task
// @route  PUT /api/tasks
// @access Public

const completeTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndUpdate(id, { done: req.body.done }, { new: true });

  res.json(task);
});

// @desc   Get completed tasks percentage
// @route  GET /api/tasks/percentage
// @access Private

const getCompletedTasksPercentage = asyncHandler(async (req, res) => {
  let count = 0;
  let totalNumber = 0;
  const { user } = req;
  if (!user) {
    res.status(401).send('Not Authorized');
  }

  const tasks = await Task.find({ user: user._id });
  tasks.forEach((element: any) => {
    totalNumber++;
    if (element.done) {
      count++;
    }
  });
  res.json((count / totalNumber) * 100);
});

export { addTask, getTasksbyDate, completeTask, getCompletedTasksPercentage, getTasks, deleteTask };
