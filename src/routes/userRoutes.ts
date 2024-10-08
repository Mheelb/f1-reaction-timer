import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// Route pour l'inscription
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).send('Utilisateur enregistré avec succès');
  } catch (error) {
    res.status(400).send('Erreur lors de l\'inscription');
  }
});

// Route pour la connexion
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).send('Connexion réussie');
    } else {
      res.status(401).send('Email ou mot de passe incorrect');
    }
  } catch (error) {
    res.status(500).send('Erreur lors de la connexion');
  }
});

export default router;