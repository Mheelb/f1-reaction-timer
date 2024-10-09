import { Router } from 'express';
import { getTimers, getBestTimer, getBestTimers, submitTimer } from '../controllers/TimerController';
import { authMiddleware } from '../middlewares/auhtMiddleware';

const router = Router();

router.get('/get-best-reaction-times/:userId', getBestTimers);

router.get('/get-reaction-times/:userId', getTimers);

router.get('/get-best-reaction-time/:userId', getBestTimer);

router.post('/submit-reaction-time', authMiddleware, submitTimer);

export default router;