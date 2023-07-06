import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import { signInHandler, signUpHandler } from './controllers/authController';
import { errorHandler } from './middlewares/errorHandler';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { protect } from './middlewares/protectMiddleware';
import categoryRoutes from './routes/categoryRoutes';
import goalRoutes from './routes/goalRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();
const app = express();
app.use(cors());
connectDB();
const port = process.env.PORT;

const mode = process.env.NOD_ENV;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/goal', protect, goalRoutes);
app.use('/api/category', protect, categoryRoutes);

app.use('/api/tasks', protect, taskRoutes);
app.post('/api/signup', signUpHandler);
app.post('/api/signin', signInHandler);
app.get('/', (_req: any, res: any) => {
  res.send('Hello from backend server');
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running ${mode} on port ${port}`);
});
