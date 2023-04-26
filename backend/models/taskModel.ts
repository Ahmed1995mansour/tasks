import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
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
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
