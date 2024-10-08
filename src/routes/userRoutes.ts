import { Router, Request, Response } from 'express';
import { comparePassword } from '../utils/passwordUtils';
import User from '../models/User';
import { 
  registerUser,
  loginUser,
  getAllUsers,
  getUserById
} from '../controllers/UserController';

const router = Router();

router.post('/register', registerUser);

router.get('/get-users', getAllUsers);

router.get('/get-user/:id', getUserById);

router.post('/login', loginUser);

export default router;