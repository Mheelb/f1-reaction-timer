import { Router, Request, Response } from 'express';
import { comparePassword } from '../utils/passwordUtils';
import User from '../models/User';
import { 
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  removeUser
} from '../controllers/UserController';
import { authMiddleware } from '../middlewares/auhtMiddleware';

const router = Router();

router.post('/register', registerUser);

router.get('/get-users', getAllUsers);

router.get('/get-user/:id', getUserById);

router.post('/login', loginUser);

router.delete('/delete-user/:id', authMiddleware, removeUser);

export default router;