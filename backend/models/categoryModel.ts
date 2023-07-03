import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Goal',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
