import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel';

// @desc   Add Category
// @route  POST
// @access Public

const addCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).send('All fields are required!!');
  } else {
    const category = new Category({
      title,
    });

    const addedCategory = await category.save();
    res.status(201).send(addedCategory);
  }
});

// @desc   Fetch all categories
// @route  GET
// @access Public

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  if (!categories) {
    res.status(404).send('There are no categories');
  }
  res.status(200).json(categories);
});

export { addCategory, getCategories };
