import { Request, Response, NextFunction } from 'express';
import { TimerService } from '../services/timer.service';

/**
 * @swagger
 * /api/timers/get-reaction-times:
 *   get:
 *     summary: Récupère tous les temps de réaction
 *     tags: [Timer]
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
export const getAllTimers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timers = await TimerService.getAllTimers();
        res.json(timers);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /api/timers/get-best-reaction-times:
 *   get:
 *     summary: Récupère les meilleurs temps de réaction
 *     tags: [Timer]
 *     parameters:
 *       - in: query
 *         name: range
 *         schema:
 *           type: integer
 *         description: Nombre de meilleurs temps à récupérer
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
    try {
        const timers = await TimerService.getBestTimers(range);
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
    try {
        const timer = await TimerService.getBestTimer();
        res.json(timer);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /api/timers/get-reaction-times/{userId}:
 *   get:
 *     summary: Récupère les temps de réaction d'un utilisateur par ID
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
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
 *         description: Liste des temps de réaction de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Timer'
 *       500:
 *         description: Erreur serveur
 */
export const getTimerByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { sortBy = 'time', order = 'asc', limit = 10 } = req.query;
    try {
        const reactionTimes = await TimerService.getTimerByUserId(userId, sortBy as string, order as string, parseInt(limit as string, 10));
        res.status(200).json(reactionTimes);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /api/timers/get-best-reaction-time/{userId}:
 *   get:
 *     summary: Récupère le meilleur temps de réaction d'un utilisateur par ID
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Meilleur temps de réaction de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Timer'
 *       500:
 *         description: Erreur serveur
 */
export const getBestTimerByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
        const timer = await TimerService.getBestTimerByUserId(userId);
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