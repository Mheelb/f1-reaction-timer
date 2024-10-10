import request from 'supertest';
import express, { Request, Response } from 'express';
import { authMiddleware } from '../../middlewares/auhtMiddleware';
import { generateToken } from '../../utils/tokenUtils';

const app = express();

app.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.status(200).send('Accès autorisé');
});

describe('Auth Middleware', () => {
  it("Devrait retourner 401 si aucun token n'est donné", async () => {
    const response = await request(app).get('/protected');
    expect(response.status).toBe(401);
    expect(response.text).toBe('Accès refusé. Aucun token fourni.');
  });

  it('Devrait retourner 400 si le token est invalide', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalidtoken');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Token invalide.');
  });

  it('Devrait retourner 200 si le token est valide', async () => {
    const token = generateToken(process.env.TEST_USERID as string);
    const response = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Accès autorisé');
  });
});