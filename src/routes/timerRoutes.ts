import { Router } from 'express';
import { getAllTimers, getBestTimer, getBestTimerByUserId, getBestTimers, getTimerByUserId, submitTimer } from '../controllers/TimerController';
import { authMiddleware } from '../middlewares/auhtMiddleware';

const router = Router();

router.get('/get-best-reaction-times', getBestTimers);

router.get('/get-best-reaction-time', authMiddleware, getBestTimer);

router.get('/get-reaction-times', getAllTimers);

router.get('/get-reaction-times/:userId', getTimerByUserId);

router.get('/get-best-reaction-time/:userId', getBestTimerByUserId);

router.post('/submit-reaction-time', authMiddleware, submitTimer);

export default router;