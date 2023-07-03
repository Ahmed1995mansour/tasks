import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import connectDB from './config/db';
import { signInHandler, signUpHandler } from './controllers/authController';
import { errorHandler } from './middlewares/errorHandler';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import categoryRoutes from './routes/categoryRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();
const app = express();
app.use(cors());
connectDB();
const port = process.env.PORT;

const mode = process.env.NOD_ENV;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/tasks', taskRoutes);
app.use('/api/category', categoryRoutes);
app.post('/api/signup', signUpHandler);
app.post('/api/signin', signInHandler);
app.get('/', (req: any, res: any) => {
  res.send('Hello from backend server');
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running ${mode} on port ${port}`);
});
