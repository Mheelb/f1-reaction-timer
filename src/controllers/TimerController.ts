import { Request, Response, NextFunction } from 'express';
import { TimerService } from '../services/timer.service';

export const getAllTimers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timers = await TimerService.getAllTimers();
        res.json(timers);
    } catch (err) {
        next(err);
    }
};

export const getBestTimers = async (req: Request, res: Response, next: NextFunction) => {
    const range = req.query.range ? parseInt(req.query.range as string) : 10;
    try {
        const timers = await TimerService.getBestTimers(range);
        res.json(timers);
    } catch (err) {
        next(err);
    }
};

export const getBestTimer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timer = await TimerService.getBestTimer();
        res.json(timer);
    } catch (err) {
        next(err);
    }
};

export const getTimerByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { sortBy = 'time', order = 'asc', limit = 10 } = req.query;
    try {
        const reactionTimes = await TimerService.getTimerByUserId(userId, sortBy as string, order as string, parseInt(limit as string, 10));
        res.status(200).json(reactionTimes);
    } catch (err) {
        next(err);
    }
};

export const getBestTimerByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
        const timer = await TimerService.getBestTimerByUserId(userId);
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