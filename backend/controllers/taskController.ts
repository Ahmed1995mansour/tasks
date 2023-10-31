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

// @desc   Update existing task
// @route  PUT /api/tasks
// @acess  Private

const updateTask = asyncHandler(async (req, res) => {
  const { title, goal, date } = req.body;
  const convertedDate = new Date(date);
  const { id } = req.params;

  const task = await Task.findById(id);
  console.log(task);

  if (task) {
    // task.title = title;
    // task.goal = goal;
    // task.date = convertedDate;
    const updatedTask = await Task.findByIdAndUpdate(id, {
      goal: goal,
      date: convertedDate,
      title: title,
    });
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task Not Found');
  }
});

// @desc   delete existing task
// @route  DELETE /api/tasks
// @acess  Private

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  if (!user) {
    res.status(401).send('Not Authorized');
  }

  await Task.deleteOne({ _id: id });

  res.sendStatus(200);
});

// @desc   Fetch all tasks
// @route  GET /api/tasks
// @access Private

const getTasks = asyncHandler(async (req, res) => {
  const { page = 0, pageSize = 12, q }: any = req.query;

  const query = new RegExp(q, 'i');
  const { user } = req;

  if (!user) {
    res.status(401).send('Not Authorized');
  }

  const tasks = await Task.find({ user: user._id, title: query }, null, {
    skip: parseInt(page) * pageSize,
    limit: pageSize,
  }).populate('goal');

  if (!tasks) {
    res.status(404).send('No task found');
  } else {
    res.status(200).json(tasks);
  }
});

// @desc   Get total number of tasks
// @route  GET /api/tasks/count
// @access Private

const getTasksCount = asyncHandler(async (req, res) => {
  const { user } = req;
  const { q }: any = req.query;
  const query = new RegExp(q, 'i');

  if (!user) {
    res.status(401).send('Not Authorized');
  }

  const tasksCount = await Task.count({ user: user._id, title: query });

  res.status(200).json(tasksCount);
});

// @desc   Get total number of tasks per goal
// @route  GET /api/tasks/countpergoal/:goalId
// @access Private

const getTasksCountPerGoal = asyncHandler(async (req, res) => {
  const { user } = req;
  const { goalId } = req.params;
  const { q }: any = req.query;
  const query = new RegExp(q, 'i');

  if (!user) {
    res.status(401).send('Not Authorized');
  }

  const tasksCount = await Task.count({ user: user._id, goal: goalId, title: query });

  res.status(200).json(tasksCount);
});

// @desc   Fetch tasks of certain date
// @route  GET /api/tasks
// @access Private

const getTasksbyDate = asyncHandler(async (req, res) => {
  const date = new Date(req.params.date);
  const { user } = req;
  const { filter } = req.query;

  if (!user) {
    res.status(401).send('Not Authorized');
  }

  if (filter === 'pending') {
    const tasks = await Task.find({ user: user._id, date, done: false }).populate('goal');
    res.status(200).json(tasks);
  } else if (filter === 'done') {
    const tasks = await Task.find({ user: user._id, date, done: true }).populate('goal');
    res.status(200).json(tasks);
  } else {
    const tasks = await Task.find({ user: user._id, date }).populate('goal');
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

// @desc   Get completed tasks percentage by date
// @route  GET /api/tasks/percentage/:date
// @access Private

const getCompletedTasksPercentageByDate = asyncHandler(async (req, res) => {
  let count = 0;
  let totalNumber = 0;
  const { date } = req.params;
  const { user } = req;
  if (!user) {
    res.status(401).send('Not Authorized');
  }

  const tasks = await Task.find({ user: user._id, date });
  tasks.forEach((element: any) => {
    totalNumber++;
    if (element.done) {
      count++;
    }
  });
  res.json((count / totalNumber) * 100);
});

// @desc   Get completed tasks percentage per goal
// @route  GET /api/tasks/percentage
// @access Private

const getCompletedTasksPercentagePerGoal = asyncHandler(async (req, res) => {
  let count = 0;
  let totalNumber = 0;
  const { user } = req;
  const { goalId } = req.params;
  if (!user) {
    res.status(401).send('Not Authorized');
  }

  const tasks = await Task.find({ user: user._id, goal: goalId });
  tasks.forEach((element: any) => {
    totalNumber++;
    if (element.done) {
      count++;
    }
  });
  res.json((count / totalNumber) * 100);
});

// @desc   Get task by id
// @route  GET /api/tasks/:id
// @access Private

const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate('goal');

  if (!task) {
    res.status(404).send('No Task with this Id found');
  }

  res.json(task);
});

// @desc   Get task by id
// @route  GET /api/tasks/:id
// @access Private

const getTaskByGoal = asyncHandler(async (req, res) => {
  const { page = 0, pageSize = 12, q }: any = req.query;
  const { goalId } = req.params;
  const query = new RegExp(q, 'i');
  const { user } = req;

  if (!user) {
    res.status(401).send('Not Authorized');
  }

  const tasks = await Task.find({ user: user._id, goal: goalId, title: query }, null, {
    skip: parseInt(page) * pageSize,
    limit: pageSize,
  }).populate('goal');

  if (!tasks) {
    res.status(404).send('No task found');
  } else {
    res.status(200).json(tasks);
  }
});

export {
  addTask,
  getTasksbyDate,
  completeTask,
  getCompletedTasksPercentage,
  getCompletedTasksPercentageByDate,
  getTasks,
  deleteTask,
  getTaskById,
  getCompletedTasksPercentagePerGoal,
  getTaskByGoal,
  updateTask,
  getTasksCount,
  getTasksCountPerGoal,
};
