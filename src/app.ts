import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import timerRoutes from './routes/timerRoutes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string, {})
  .then(() => console.log("MongoDB connecté !"))
  .catch(err => console.log("Erreur de connexion à MongoDB :", err));

app.use('/api/users', userRoutes);
app.use('/api/timers', timerRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World !');
});

app.use(errorHandler);

export default app;