import asyncHandler from 'express-async-handler';
import { json } from 'stream/consumers';
import Goal from '../models/goalModel';
import Task from '../models/taskModel';

// @desc   Add Goal
// @route  POST
// @access Private

export const addGoal = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { user } = req;
  if (!title) {
    res.status(400).send('All fields are required!!');
  } else {
    const goal = new Goal({
      title,
      user: user._id,
    });

    const addedGoal = await goal.save();
    res.status(201).send(addedGoal);
  }
});

// @desc   Get Goals
// @route  GET
// @access Private

export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user });
  res.status(200).send(goals);
});

// @desc   Get Goal By Id
// @route  GET
// @access Private

export const getGoalById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(404).send('No Goal with this Id found');
  }
  res.status(200).json(goal);
});

// @desc   Delete Goal By Id
// @route  DELETE
// @access Private

export const deleteGoalById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(404).send('No Goal with this Id found');
  }

  // Delete all tasks associated with that goal
  await Task.deleteMany({ goal: id });

  await Goal.deleteOne({ _id: id });

  res.sendStatus(200);
});
