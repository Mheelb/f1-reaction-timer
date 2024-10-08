import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { comparePassword } from '../utils/passwordUtils';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        if (!users) {
            res.status(404).send('Aucun utilisateur trouvé');
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
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send('Utilisateur non trouvé');
            return;
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    try {
        const user = new User({ email, password, role });
        await user.save();
        res.status(201).send('Utilisateur enregistré avec succès');
    } catch (error) {
        res.status(400).send('Erreur lors de l\'inscription');
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).send('Email ou mot de passe incorrect');
        return;
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(401).send('Email ou mot de passe incorrect');
        return;
      }
      res.status(200).send('Connexion réussie');
    } catch (error) {
      next(error);
    }
};