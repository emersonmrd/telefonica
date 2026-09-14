import { Module } from '@nestjs/common';
import { PlanModule } from './plans/infrastructure/plan.module';
import { UserModule } from './users/infrastructure/user.module';

@Module({
  imports: [PlanModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
