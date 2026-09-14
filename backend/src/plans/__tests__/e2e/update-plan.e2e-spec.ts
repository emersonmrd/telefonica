import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../../domain/testing/helpers/setup-e2e-app.helper';
import request from 'supertest';

describe('UpdatePlan (e2e)', () => {
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

  it('should update a name when name is available and others fields are not provided', async () => {
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

    const updateResponse = await request(app.getHttpServer())
      .patch(`/plans/${planId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Plano E2E Teste',
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe('Plano E2E Teste');
    expect(updateResponse.body).toEqual({
      ...createResponse.body,
      name: 'Plano E2E Teste',
      updatedAt: expect.any(String),
    });
  });

  it('should throw a error when trying to update a not existing plan', async () => {
    const updatingANotExistingPlan = await request(app.getHttpServer())
      .patch(`/plans/not-existing-id`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Plano E2E Teste',
      });

    expect(updatingANotExistingPlan.status).toBe(404);
  });

  it('should throw a error when trying to update a existing plan with a name already used', async () => {
    await request(app.getHttpServer())
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Plan A',
        description: 'Plano A criado pelo teste end-to-end',
        price: 50.0,
        dataAllowance: 10,
        planType: 'CONTROLE',
      });

    const planB = await request(app.getHttpServer())
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Plan B',
        description: 'Plano B criado pelo teste end-to-end',
        price: 65.0,
        dataAllowance: 15,
        planType: 'CONTROLE',
      });

    const planBId = planB.body.id;

    const updatingPlanBWithPlanAName = await request(app.getHttpServer())
      .patch(`/plans/${planBId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Plan A',
      });

    expect(updatingPlanBWithPlanAName.status).toBe(409);
  });

  it('should throw a error when trying to update plan with invalid payload', async () => {
    const planA = await request(app.getHttpServer())
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Plan A',
        description: 'Plano A criado pelo teste end-to-end',
        price: 50.0,
        dataAllowance: 10,
        planType: 'CONTROLE',
      });

    const planAId = planA.body.id;

    const updatingPlanAWithInvalidPayload = await request(app.getHttpServer())
      .patch(`/plans/${planAId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: -50,
      });

    expect(updatingPlanAWithInvalidPayload.status).toBe(400);
  });

  it('should throw a error when trying to update plan with invalid type of plan', async () => {
    const planA = await request(app.getHttpServer())
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Plan A',
        description: 'Plano A criado pelo teste end-to-end',
        price: 50.0,
        dataAllowance: 10,
        planType: 'CONTROLE',
      });

    const planAId = planA.body.id;

    const updatingPlanAWithInvalidPlanType = await request(app.getHttpServer())
      .patch(`/plans/${planAId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        planType: 'TIPO DE PLANO INVALIDO',
      });

    expect(updatingPlanAWithInvalidPlanType.status).toBe(400);
  });
});
