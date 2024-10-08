import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string, {})
  .then(() => console.log("MongoDB connecté !"))
  .catch(err => console.log("Erreur de connexion à MongoDB :", err));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World !');
});

export default app;