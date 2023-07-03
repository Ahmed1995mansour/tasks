import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
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
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    done: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
