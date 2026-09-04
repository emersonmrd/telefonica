import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConflictErrorFilter } from './shared/infrastructure/exception-filters/conflict-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ConflictErrorFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
