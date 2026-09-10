import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../../domain/testing/helpers/setup-e2e-app.helper';
import request from 'supertest';

describe('DeletePlan (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should delete a plan when a valid id is provided', async () => {
    const planA = await request(app.getHttpServer()).post('/plans').send({
      name: 'Plan A',
      description: 'Plano criado pelo teste end-to-end',
      price: 50.0,
      dataAllowance: 10,
      planType: 'CONTROLE',
    });

    const planId = planA.body.id;

    const deleteResponse = await request(app.getHttpServer()).delete(
      `/plans/${planId}`,
    );

    const findDeletedPlanA = await request(app.getHttpServer()).get(
      `/plans/${planId}`,
    );

    expect(deleteResponse.status).toBe(204);
    expect(findDeletedPlanA.status).toBe(404);
  });

  it('should return a not found error when a plan not exists', async () => {
    const planId = '1';

    const deleteResponse = await request(app.getHttpServer()).delete(
      `/plans/${planId}`,
    );

    expect(deleteResponse.status).toBe(404);
  });
});
