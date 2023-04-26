import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import categoryRoutes from './routes/categoryRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();
const app = express();

connectDB();
const port = process.env.PORT;

const mode = process.env.NOD_ENV;

app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/category', categoryRoutes);
app.get('/', (req: any, res: any) => {
  res.send('Hello from backend server');
});

app.listen(port, () => {
  console.log(`Server is running ${mode} on port ${port}`);
});
