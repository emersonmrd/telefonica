import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../../domain/testing/helpers/setup-e2e-app.helper';
import request from 'supertest';

describe('ListPlans (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const setup = await createTestApp();
    app = setup.app;
    token = setup.generateAuthToken();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return status 200 and a empty array', () => {
    return request(app.getHttpServer())
      .get('/plans')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect([]);
  });

  it('should return status 200 and an array with existing plans', async () => {
    const plans = [
      await request(app.getHttpServer())
        .post('/plans')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Plano PRE',
          description: 'Plano criado pelo teste end-to-end',
          price: 10.0,
          dataAllowance: 1,
          planType: 'PRE',
        }),
      await request(app.getHttpServer())
        .post('/plans')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Plano CONTROLE',
          description: 'Plano criado pelo teste end-to-end',
          price: 50.0,
          dataAllowance: 10,
          planType: 'CONTROLE',
        }),
      await request(app.getHttpServer())
        .post('/plans')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Plano POS',
          description: 'Plano criado pelo teste end-to-end',
          price: 100.0,
          dataAllowance: 50,
          planType: 'POS',
        }),
      await request(app.getHttpServer())
        .post('/plans')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Plano FIBRA',
          description: 'Plano criado pelo teste end-to-end',
          price: 100.0,
          speed: 300,
          planType: 'FIBRA',
        }),
    ];

    const findByIdResponse = await request(app.getHttpServer())
      .get(`/plans`)
      .set('Authorization', `Bearer ${token}`);

    expect(findByIdResponse.status).toBe(200);
    expect(findByIdResponse.body).toStrictEqual(plans.map((p) => p.body));
  });
});
