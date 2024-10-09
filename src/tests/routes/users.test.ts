import request from 'supertest';
import app from '../../app';
import User from '../../models/User';
import { generateToken } from '../../utils/tokenUtils';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

describe('Routes Utilisateurs', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('POST /api/users/register', () => {
        test('Devrait retourner 201 si l\'utilisateur a été enregistré', async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send({
                    email: process.env.TEST_USER_EMAIL,
                    password: process.env.TEST_USER_PASSWORD,
                    role: process.env.TEST_USER_ROLE
                });
            expect(res.statusCode).toEqual(201);
            expect(res.text).toEqual('Utilisateur enregistré avec succès');
        });
    });

    describe('POST /api/users/login', () => {
        test('Devrait retourner 200 si l\'utilisateur est connecté', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: process.env.TEST_USER_EMAIL,
                    password: process.env.TEST_USER_PASSWORD
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Connexion réussie');
            expect(res.body.token).toBeDefined();
        });
    });


    describe('GET /api/users/get-users', () => {
        test('Devrait retourner 200 et tout les utilisateurs', async () => {
            const res = await request(app)
                .get('/api/users/get-users')
            expect(res.statusCode).toEqual(200)
            expect(res.body).toBeInstanceOf(Array)
        });
    });

    describe('GET /api/users/get-user/:id', () => {
        test('Devrait retourner 200 si l\'utilisateur a été trouvé', async () => {
            const user = await User.findOne({ email: process.env.TEST_USER_EMAIL });
            const res = await request(app)
                .get(`/api/users/get-user/${user?._id}`)
            expect(res.statusCode).toEqual(200)
            expect(res.body).toBeInstanceOf(Object)
        });
    });

    describe('DELETE /api/users/delete-user/:id', () => {
        test('Devrait retourner 200 si l\'utilisateur a été supprimé', async () => {
            const user = await User.findOne({ email: process.env.TEST_USER_EMAIL });
            const token = generateToken(user?._id as string);
            const res = await request(app)
                .delete(`/api/users/delete-user/${user?._id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.text).toEqual('Utilisateur supprimé avec succès');
        });
    });

});