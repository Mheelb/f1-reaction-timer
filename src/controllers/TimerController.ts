import { Request, Response } from 'express';
import Timer from '../models/Timer';

export const getAllTimers = async (req: Request, res: Response) => {
    try {
        const timers = await Timer.find();
        res.json(timers);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const getBestTimers = async (req: Request, res: Response) => {
    const range = req.query.range ? parseInt(req.query.range as string) : 10;
    console.log(range);
    
    try {
        const timers = await Timer.find().sort({ time: 1 }).limit(range);
        res.json(timers);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const getBestTimer = async (req: Request, res: Response) => {
    try {
        const timer = await Timer.findOne().sort({ time: 1 });
        res.json(timer);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const getTimerByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { sortBy = 'time', order = 'asc', limit = 10 } = req.query;
    try {
      const reactionTimes = await Timer.find({ user_id: userId })
        .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
        .limit(parseInt(limit as string, 10));
      res.status(200).json(reactionTimes);
    } catch (error) {
      res.status(500).send('Erreur lors de la récupération des temps de réaction');
    }
};

export const getBestTimerByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const timer = await Timer.findOne({ user_id: userId }).sort({ time: 1 });
        res.status(200).json(timer);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération du meilleur temps de réaction');
    }
};

export const submitTimer = async (req: Request, res: Response) => {
    const { user_id, time } = req.body;
    try {
      const timer = new Timer({ user_id, time });
      await timer.save();
      res.status(201).send('Temps de réaction soumis avec succès');
    } catch (error) {
      res.status(400).send('Erreur lors de la soumission du temps de réaction');
    }
};