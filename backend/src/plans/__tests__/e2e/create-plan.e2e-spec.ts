import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../../domain/testing/helpers/setup-e2e-app.helper';
import request from 'supertest';

describe('CreatePlan (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  it('should return status 201 and a empty array', () => {
    return request(app.getHttpServer())
      .post('/plans')
      .send({
        name: 'Plano E2E Teste',
        description: 'Plano criado pelo teste end-to-end',
        price: 50.0,
        dataAllowance: 10,
        planType: 'CONTROLE',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe('Plano E2E Teste');
        expect(res.body.id).toBeDefined(); // O banco de dados gerou um ID?
      });
  });

  it('should return 400 Bad Request when sending invalid or empty data', () => {
    return request(app.getHttpServer()).post('/plans').send({}).expect(400);
  });

  it('should return 409 Conflict if plan already exists', async () => {
    const planData = {
      name: 'Plano E2E Teste',
      description: 'Plano criado pelo teste end-to-end',
      price: 50.0,
      dataAllowance: 10,
      planType: 'CONTROLE',
    };

    await request(app.getHttpServer())
      .post('/plans')
      .send(planData)
      .expect(201);

    await request(app.getHttpServer())
      .post('/plans')
      .send(planData)
      .expect(409);
  });
});
