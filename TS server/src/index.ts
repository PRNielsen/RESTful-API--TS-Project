import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './database/connection';
import router from './routes/productRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// db connectivity
connectDB();

//cors
app.use(cors());

//request payload middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use('/api/v1/product', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running in a new src folder!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

//error handler middleware
app.use(function (err: Error, req: Request, res: Response, next: NextFunction){
  console.error(err.stack)
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {}
  });
});