import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { PrismaAdapter } from '../../../../shared/infrastructure/database/prisma/prisma.adapter';
import { ConflictErrorFilter } from '../../../../shared/infrastructure/exception-filters/conflict-error.filter';
import { NotFoundErrorFilter } from '../../../../shared/infrastructure/exception-filters/not-found-error.filter';
import { UnauthorizedErrorFilter } from '../../../../shared/infrastructure/exception-filters/unauthorized-error.filter';
import { AuthGuard } from '../../../../users/infrastructure/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

export async function createTestApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ConflictErrorFilter());
  app.useGlobalFilters(new NotFoundErrorFilter());
  app.useGlobalFilters(new UnauthorizedErrorFilter());

  await app.init();
  const prisma = app.get(PrismaAdapter);
  const jwtService = app.get(JwtService);
  await prisma.plan.deleteMany();

  const generateAuthToken = () => {
    return jwtService.sign({ sub: 'test-user', email: 'test@test.com' });
  };

  return { app, prisma, generateAuthToken };
}
