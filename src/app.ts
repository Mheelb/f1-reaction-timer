import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import timerRoutes from './routes/timerRoutes';
import authRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorHandlerMiddelware';

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string, {})
  .then(() => console.log("MongoDB connecté !"))
  .catch(err => console.log("Erreur de connexion à MongoDB :", err));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World !');
});
app.use('/api/users', userRoutes);
app.use('/api/timers', timerRoutes);
app.use('/api/auth', authRoutes)

app.use(errorHandler);

export default app;