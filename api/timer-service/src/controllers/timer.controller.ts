import { Request, Response, NextFunction } from 'express';
import { TimerService } from '../services/timer.service';

export const getTimers = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    const { sortBy = 'time', order = 'asc', limit = 10 } = req.query;
    try {
        const timers = await TimerService.getTimers(userId as string, sortBy as string, order as string, parseInt(limit as string, 10));
        res.json(timers);
    } catch (err) {
        next(err);
    }
};

export const getBestTimers = async (req: Request, res: Response, next: NextFunction) => {
    const range = req.query.range ? parseInt(req.query.range as string) : 10;
    const userId = req.query.userId as string;
    try {
        const timers = await TimerService.getBestTimers(range, userId);
        res.json(timers);
    } catch (err) {
        next(err);
    }
};

export const getBestTimer = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    try {
        const timer = await TimerService.getBestTimer(userId as string);
        res.status(200).json(timer);
    } catch (err) {
        next(err);
    }
};

export const submitTimer = async (req: Request, res: Response, next: NextFunction) => {
   const { user_id, time } = req.body;
   try {
       const message = await TimerService.submitTimer(user_id, time);
       res.status(201).send(message);
   } catch (err) {
       next(err);
   }
};