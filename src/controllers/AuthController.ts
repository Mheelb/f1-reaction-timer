import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { comparePassword } from '../utils/passwordUtils';
import { generateToken } from '../utils/tokenUtils';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;
    try {
        const user = new User({ email, password, role });
        await user.save();
        res.status(201).send('Utilisateur enregistré avec succès');
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }) as { _id: string, password: string };
        if (!user) {
            res.status(401).send('Email ou mot de passe incorrect');
            return;
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            res.status(401).send('Email ou mot de passe incorrect');
            return;
        }
        const token = generateToken(user._id.toString());
        res.status(200).json({ message: 'Connexion réussie', token });
    } catch (err) {
        next(err);
    }
};