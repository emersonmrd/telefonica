import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from '../../../plans/domain/testing/helpers/setup-e2e-app.helper';
import { PrismaAdapter as PrismaService } from '../../../shared/infrastructure/database/prisma/prisma.adapter';
import * as argon2 from 'argon2';

describe('Login (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const setup = await createTestApp();
    app = setup.app;
    prisma = setup.prisma;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should authenticate and return a JWT token', async () => {
    const password = 'mySecretPassword123';
    const passwordHash = await argon2.hash(password);

    await prisma.user.create({
      data: {
        id: 'user-1',
        name: 'John Test',
        email: 'john@test.com',
        cpf: '12345678901',
        password: passwordHash,
      },
    });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        emailOrCpf: 'john@test.com',
        password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    expect(typeof response.body.access_token).toBe('string');
  });

  it('should return 401 Unauthorized for invalid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        emailOrCpf: 'invalid@test.com',
        password: 'wrong',
      });

    expect(response.status).toBe(401);
  });
});
