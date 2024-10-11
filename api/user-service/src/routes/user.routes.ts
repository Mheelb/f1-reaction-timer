import { Router, Request, Response } from 'express';
import { 
  getAllUsers,
  getUserById,
  removeUser
} from '../controllers/user.controller';

const router = Router();

router.get('/get-users', getAllUsers);

router.get('/get-user/:id', getUserById);

router.delete('/delete-user/:id', removeUser);

export default router;