import { Router, Request, Response } from 'express';
import Timer from '../models/Timer';

const router = Router();

router.post('/submit-reaction-time', async (req: Request, res: Response): Promise<void> => {
  const { user_id, time } = req.body;
  try {
    const timer = new Timer({ user_id, time });
    await timer.save();
    res.status(201).send('Temps de réaction soumis avec succès');
  } catch (error) {
    res.status(400).send('Erreur lors de la soumission du temps de réaction');
  }
});

router.get('/get-reaction-times/:userId', async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { sortBy = 'submittedAt', order = 'desc', limit = 10 } = req.query;

  try {
    const reactionTimes = await Timer.find({ user_id: userId })
      .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
      .limit(parseInt(limit as string, 10));
    res.status(200).json(reactionTimes);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des temps de réaction');
  }
});

export default router;