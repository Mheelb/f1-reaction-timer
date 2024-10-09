import { Router, Request, Response } from 'express';
import { 
  getAllUsers,
  getUserById,
  removeUser
} from '../controllers/UserController';
import { authMiddleware } from '../middlewares/auhtMiddleware';

const router = Router();

router.get('/get-users', getAllUsers);

router.get('/get-user/:id', getUserById);

router.delete('/delete-user/:id', authMiddleware, removeUser);

export default router;