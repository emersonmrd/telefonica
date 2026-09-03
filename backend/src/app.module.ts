import { Module } from '@nestjs/common';
import { PlanModule } from './plans/infrastructure/plan.module';

@Module({
  imports: [PlanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
