import { Controller, Module } from '@nestjs/common';
import { PlanController } from '../../presentation/plan/plan.controller';
import { PlanPrismaRepository } from './plan-prisma.repository';
import { PrismaAdapter } from '../database/prisma.adapter';
import { ListPlansUseCase } from '../../application/plan/list-plans.usecase';
import { PlanRepository } from '../../domain/plan/plan.repository';

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
