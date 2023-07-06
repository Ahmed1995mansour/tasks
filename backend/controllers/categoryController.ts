import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel';

// @desc   Add Category
// @route  POST
// @access Public

const addCategory = asyncHandler(async (req, res) => {
  const { title, goal } = req.body;
  const { user } = req;
  if (!title) {
    res.status(400).send('All fields are required!!');
  } else {
    const category = new Category({
      title,
      goal,
      user,
    });

    const addedCategory = await category.save();
    res.status(201).send(addedCategory);
  }
});

// @desc   Fetch all categories
// @route  GET
// @access Public

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user });

  if (!categories) {
    res.status(404).send('There are no categories');
  }
  res.status(200).json(categories);
});

const getCategoriesByGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const { user } = req;

  const categories = await Category.find({ user, goal: goalId });

  if (!categories) {
    res.status(404).send('There are no categories under this goal');
  }

  res.status(200).json(categories);
});

export { addCategory, getCategories, getCategoriesByGoal };
