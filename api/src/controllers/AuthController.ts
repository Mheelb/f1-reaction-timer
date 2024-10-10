import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Enregistre un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       500:
 *         description: Erreur serveur
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, role } = req.body;

    try {
        const message = await AuthService.register(email, password, role);
        res.status(201).send(message);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Email ou mot de passe incorrect
 *       500:
 *         description: Erreur serveur
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const result = await AuthService.login(email, password);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};