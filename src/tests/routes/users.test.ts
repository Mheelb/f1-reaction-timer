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