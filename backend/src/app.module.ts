import { Module } from '@nestjs/common';
import { PlanModule } from './infra/plan/plan.module';

@Module({
  imports: [PlanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
