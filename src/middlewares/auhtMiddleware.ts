import { Request, Response, NextFunction } from 'express';
import '../types/express';
import { verifyToken } from '../utils/tokenUtils';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Accès refusé. Aucun token fourni.');
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Token invalide.');
    }
};