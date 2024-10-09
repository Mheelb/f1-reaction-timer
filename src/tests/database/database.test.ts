import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

describe('Test de la route GET /', () => {
  it('devrait retourner 200 et vérifier que la base de données est connectée', async () => {
    // Attendre que la connexion soit établie
    await new Promise<void>((resolve) => {
      if (mongoose.connection.readyState === 1) {
        resolve();
      } else {
        mongoose.connection.once('connected', () => {
          resolve();
        });
      }
    });

    expect(mongoose.connection.readyState).toBe(1);

    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Hello World !');
  });
});