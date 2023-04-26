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

export { addCategory };
