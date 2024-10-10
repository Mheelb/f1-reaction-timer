import { Request, Response, NextFunction } from 'express';
import { TimerService } from '../services/timer.service';

/**
 * @swagger
 * /api/timers/get-reaction-times:
 *   get:
 *     summary: Récupère tous les temps de réaction ou ceux d'un utilisateur spécifique
 *     tags: [Timer]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur (optionnel)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Champ de tri
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Ordre de tri
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite de résultats
 *     responses:
 *       200:
 *         description: Liste des temps de réaction
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Timer'
 *       500:
 *         description: Erreur serveur
 */
export const getTimers = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    const { sortBy = 'time', order = 'asc', limit = 10 } = req.query;
    try {
        const timers = await TimerService.getTimers(userId as string, sortBy as string, order as string, parseInt(limit as string, 10));
        res.json(timers);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /api/timers/get-best-reaction-times:
 *   get:
 *     summary: Récupère les meilleurs temps de réaction dans une range donnée
 *     tags: [Timer]
 *     parameters:
 *       - in: query
 *         name: range
 *         schema:
 *           type: integer
 *         description: Nombre de meilleurs temps à récupérer
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur (optionnel)
 *     responses:
 *       200:
 *         description: Liste des meilleurs temps de réaction
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Timer'
 *       500:
 *         description: Erreur serveur
 */
export const getBestTimers = async (req: Request, res: Response, next: NextFunction) => {
    const range = req.query.range ? parseInt(req.query.range as string) : 10;
    const userId = req.query.userId as string;
    try {
        const timers = await TimerService.getBestTimers(range, userId);
        res.json(timers);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /api/timers/get-best-reaction-time:
 *   get:
 *     summary: Récupère le meilleur temps de réaction
 *     tags: [Timer]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur (optionnel)
 *     responses:
 *       200:
 *         description: Meilleur temps de réaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Timer'
 *       500:
 *         description: Erreur serveur
 */
export const getBestTimer = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    try {
        const timer = await TimerService.getBestTimer(userId as string);
        res.status(200).json(timer);
    } catch (err) {
        next(err);
    }
};

/**
* @swagger
* /api/timers/submit-reaction-time:
*   post:
*     summary: Soumet un temps de réaction
*     tags: [Timer]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user_id:
*                 type: string
*               time:
*                 type: number
*     responses:
*       201:
*         description: Temps de réaction soumis avec succès
*       500:
*         description: Erreur serveur
*/
export const submitTimer = async (req: Request, res: Response, next: NextFunction) => {
   const { user_id, time } = req.body;
   try {
       const message = await TimerService.submitTimer(user_id, time);
       res.status(201).send(message);
   } catch (err) {
       next(err);
   }
};