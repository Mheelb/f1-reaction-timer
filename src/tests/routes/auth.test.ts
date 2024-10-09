import request from 'supertest';
import app from '../../app';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

describe('Routes Authentification', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('POST /api/auth/register', () => {
        test('Devrait retourner 201 si l\'utilisateur a été enregistré', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: process.env.TEST_USER_EMAIL,
                    password: process.env.TEST_USER_PASSWORD,
                    role: process.env.TEST_USER_ROLE
                });
            expect(res.statusCode).toEqual(201);
            expect(res.text).toEqual('Utilisateur enregistré avec succès');
        });
    });

    describe('POST /api/auth/login', () => {
        test('Devrait retourner 200 si l\'utilisateur est connecté', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: process.env.TEST_USER_EMAIL,
                    password: process.env.TEST_USER_PASSWORD
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Connexion réussie');
            expect(res.body.token).toBeDefined();
        });
    });
});