import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModel';

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
