import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../../domain/testing/helpers/setup-e2e-app.helper';
import request from 'supertest';

describe('CreatePlan (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create and return the plan with status 201', () => {
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

  it('should return 400 when creating a plan with negative price', async () => {
    const response = await request(app.getHttpServer()).post('/plans').send({
      name: 'Plan A',
      description: 'Plano A criado pelo teste end-to-end',
      price: -50.0,
      dataAllowance: 10,
      planType: 'CONTROLE',
    });

    expect(response.status).toBe(400);
  });
  
  it('should return 400 when creating a plan with invalid plan type', async () => {
    const response = await request(app.getHttpServer()).post('/plans').send({
      name: 'Plan A',
      description: 'Plano A criado pelo teste end-to-end',
      price: 50.0,
      dataAllowance: 10,
      planType: 'TIPO DE PLANO INVALIDO',
    });

    expect(response.status).toBe(400);
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
