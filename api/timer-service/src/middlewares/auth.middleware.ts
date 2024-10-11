import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token.utils';
import { RequestAuth } from '../types/express';

export const authMiddleware = (req: RequestAuth, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).send('Accès refusé. Aucun token fourni.');
        return
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Token invalide.');
    }
};