import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, role } = req.body;

    try {
        const message = await AuthService.register(email, password, role);
        res.status(201).send(message);
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const result = await AuthService.login(email, password);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};