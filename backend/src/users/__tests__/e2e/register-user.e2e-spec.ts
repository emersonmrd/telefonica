import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from '../../../plans/domain/testing/helpers/setup-e2e-app.helper';
import { PrismaAdapter as PrismaService } from '../../../shared/infrastructure/database/prisma/prisma.adapter';
import * as argon2 from 'argon2';

describe('RegisterUser (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const setup = await createTestApp();
    app = setup.app;
    prisma = app.get(PrismaService);
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  it('should register a new user successfully', async () => {
    const payload = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678901',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(payload.name);
    expect(response.body.email).toBe(payload.email);
    expect(response.body.password).toBeUndefined(); // Should not return password

    const dbUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    expect(dbUser).toBeTruthy();
    expect(dbUser?.cpf).toBe(payload.cpf);

    const passwordMatch = await argon2.verify(
      dbUser!.password,
      payload.password,
    );
    expect(passwordMatch).toBe(true);
  });
});
