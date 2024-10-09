import request from 'supertest';
import app from '../../app';
import { generateToken } from '../../utils/tokenUtils';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

describe('Routes timer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/timers/get-best-reaction-times', () => {
        test('Devrait retourner 200 et une liste de meilleurs temps de réaction', async () => {
            const res = await request(app).get('/api/timers/get-best-reaction-times');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    describe('GET /api/timers/get-best-reaction-time', () => {
        test('Devrait retourner 200 et le meilleur temps de réaction pour l\'utilisateur authentifié', async () => {
            const token = generateToken(process.env.TEST_USER_ID as string);
            const res = await request(app)
                .get('/api/timers/get-best-reaction-time')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('time');
        });
    });

    describe('GET /api/timers/get-reaction-times', () => {
        test('Devrait retourner 200 et une liste de tous les temps de réaction', async () => {
            const res = await request(app).get('/api/timers/get-reaction-times');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    describe('GET /api/timers/get-reaction-times/:userId', () => {
        test('Devrait retourner 200 et une liste de temps de réaction pour un utilisateur spécifique', async () => {
            const userId = process.env.TEST_USER_ID as string;
            const res = await request(app).get(`/api/timers/get-reaction-times/${userId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array || null);
        });
    });

    describe('GET /api/timers/get-best-reaction-time/:userId', () => {
        test('Devrait retourner 200 et le meilleur temps de réaction pour un utilisateur spécifique', async () => {
            const userId = process.env.TEST_USER_ID as string;
            const res = await request(app).get(`/api/timers/get-best-reaction-time/${userId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Object || null);
        });
    });

    describe('POST /api/timers/submit-reaction-time', () => {
        test('Devrait retourner 201 si le temps de réaction est soumis avec succès', async () => {
            console.log(process.env.TEST_USER_ID);
            
            const token = generateToken(process.env.TEST_USER_ID as string);
            const res = await request(app)
                .post('/api/timers/submit-reaction-time')
                .set('Authorization', `Bearer ${token}`)
                .send({ user_id: process.env.TEST_USER_ID, time: 123 });
            expect(res.statusCode).toEqual(201);
            expect(res.text).toEqual('Temps de réaction soumis avec succès');
        });
    });
});