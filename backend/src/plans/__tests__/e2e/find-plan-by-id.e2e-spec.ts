import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../../domain/testing/helpers/setup-e2e-app.helper';
import request from 'supertest';

describe('FindById (e2e)', () => {
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

  it('should return an plan when a valid id is provided', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Plano E2E',
        description: 'Plano criado pelo teste end-to-end',
        price: 50.0,
        dataAllowance: 10,
        planType: 'CONTROLE',
      });

    const planId = createResponse.body.id;

    const findByIdResponse = await request(app.getHttpServer()).get(
      `/plans/${planId}`,
    );

    expect(findByIdResponse.status).toBe(200);
    expect(findByIdResponse.body).toStrictEqual(createResponse.body);
  });

  it('should return an not found error when an invalid id is provided', async () => {
    const planId = '1';

    const findByIdResponse = await request(app.getHttpServer()).get(
      `/plans/${planId}`,
    );

    expect(findByIdResponse.status).toBe(404);
  });
});
