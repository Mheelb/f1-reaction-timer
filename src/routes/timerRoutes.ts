import { Router, Request, Response } from 'express';
import Timer from '../models/Timer';

const router = Router();

// Route pour soumettre un temps de réaction
router.post('/submit-reaction-time', async (req: Request, res: Response) => {
  const { user_id, time } = req.body;
  try {
    const timer = new Timer({ user_id, time });
    await timer.save();
    res.status(201).send('Temps de réaction soumis avec succès');
  } catch (error) {
    res.status(400).send('Erreur lors de la soumission du temps de réaction');
  }
});

// Route pour récupérer les temps de réaction d'un utilisateur
router.get('/get-reaction-times/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const reactionTimes = await Timer.find({ user_id: userId });
    res.status(200).json(reactionTimes);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des temps de réaction');
  }
});

export default router;