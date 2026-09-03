import { Controller, Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanPrismaRepository } from './database/prisma/repositories/plan-prisma.repository';
import { PrismaAdapter } from '../../shared/infrastructure/database/prisma/prisma.adapter';
import { ListPlansUseCase } from '../application/usecases/list-plans.usecase';
import { PlanRepository } from '../domain/repositories/plan.repository';

@Module({
  controllers: [PlanController],
  providers: [
    PrismaAdapter,
    PlanPrismaRepository,
    {
      provide: ListPlansUseCase,
      useFactory: (planRepository: PlanRepository): ListPlansUseCase => {
        return new ListPlansUseCase(planRepository);
      },
      inject: [PlanPrismaRepository],
    },
  ],
})
export class PlanModule {}
