import { Router, Request, Response } from 'express';
import Timer from '../models/Timer';
import { getAllTimers, getBestTimer, getBestTimerByUserId, getBestTimers, getTimerByUserId, submitTimer } from '../controllers/TimerController';

const router = Router();

router.get('/get-best-reaction-times', getBestTimers);

router.get('/get-best-reaction-time', getBestTimer);

router.get('/get-reaction-times', getAllTimers);

router.get('/get-reaction-times/:userId', getTimerByUserId);

router.get('/get-best-reaction-time/:userId', getBestTimerByUserId);

router.post('/submit-reaction-time', submitTimer);

export default router;