// src/app.ts
import express, { Request, Response } from 'express';
import { connectDatabase } from './controller/database.controller';

const app = express();

app.use(express.json());

connectDatabase();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World !');
});

export default app;