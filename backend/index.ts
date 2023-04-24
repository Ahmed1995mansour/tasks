import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const port = process.env.PORT;
const mode = process.env.NOD_ENV;
app.get('/', (req: any, res: any) => {
          res.send('Hello from backend server');
});

app.listen(port, () => {
          console.log(`Server is running ${mode} on port ${port}`);
});
