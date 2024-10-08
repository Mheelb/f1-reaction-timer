import { Router, Request, Response } from 'express';
import { comparePassword } from '../utils/passwordUtils';
import User from '../models/User';

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;
  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).send('Utilisateur enregistré avec succès');
  } catch (error) {
    res.status(400).send('Erreur lors de l\'inscription');
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
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
    res.status(500).send('Erreur lors de la connexion');
  }
});

export default router;