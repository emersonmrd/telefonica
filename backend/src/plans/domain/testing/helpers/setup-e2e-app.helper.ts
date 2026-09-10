import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { PrismaAdapter } from '../../../../shared/infrastructure/database/prisma/prisma.adapter';
import { ConflictErrorFilter } from '../../../../shared/infrastructure/exception-filters/conflict-error.filter';
import { NotFoundErrorFilter } from '../../../../shared/infrastructure/exception-filters/not-found-error.filter';

export async function createTestApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ConflictErrorFilter());
  app.useGlobalFilters(new NotFoundErrorFilter());

  await app.init();
  const prisma = app.get(PrismaAdapter);
  await prisma.plan.deleteMany();
  return app;
}
