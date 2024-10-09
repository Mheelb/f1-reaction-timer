import { Router, Request, Response } from 'express';
import { comparePassword } from '../utils/passwordUtils';
import User from '../models/User';
import { 
  register,
  login,
} from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/auhtMiddleware';

const router = Router();

router.post('/register', register);

router.post('/login', login);

export default router;