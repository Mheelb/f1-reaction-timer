import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

/**
 * @swagger
 * /api/users/get-users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Aucun utilisateur trouvé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /api/users/get-user/{id}:
 *   get:
 *     summary: Récupère un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /api/users/delete-user/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const message = await UserService.removeUser(id);
        res.status(200).send(message);
    } catch (err) {
        next(err);
    }
};