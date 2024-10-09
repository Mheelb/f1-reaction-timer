import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { users, message} = await UserService.getAllUsers();
        if (!users.length) {
            res.status(404).send(message);
            return;
        }
        res.json(users);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const { user, message } = await UserService.getUserById(id);
        if (!user) {
            res.status(404).send(message);
            return;
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const message = await UserService.removeUser(id);
        res.status(200).send(message);
    } catch (err) {
        next(err);
    }
};