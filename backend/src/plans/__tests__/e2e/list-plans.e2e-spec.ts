import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../../domain/testing/helpers/setup-e2e-app.helper';
import request from 'supertest';

describe('ListPlans (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  it('should return status 200 and a empty array', () => {
    return request(app.getHttpServer()).get('/plans').expect(200).expect([]);
  });
});
