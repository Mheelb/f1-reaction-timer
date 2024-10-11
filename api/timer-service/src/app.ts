// src/app.ts
import express, { Request, Response } from 'express';
import { connectDatabase } from './controllers/database.controller';
import timerRoutes from './routes/timer.routes';

const app = express();

const PORT: number = parseInt(process.env.PORT as string, 10) || 9000;

app.use(express.json());

connectDatabase();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World !');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
app.use('/api/timers', timerRoutes);

export default app;