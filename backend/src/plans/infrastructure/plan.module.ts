import { Controller, Module } from '@nestjs/common';
import { UserModule } from '../../users/infrastructure/user.module';
import { PlanController } from './plan.controller';
import { PlanPrismaRepository } from './database/prisma/repositories/plan-prisma.repository';
import { PrismaAdapter } from '../../shared/infrastructure/database/prisma/prisma.adapter';
import { ListPlansUseCase } from '../application/usecases/list-plans.usecase';
import { PlanRepository } from '../domain/repositories/plan.repository';
import { CreatePlanUseCase } from '../application/usecases/create-plan.usecase';
import { UpdatePlanUseCase } from '../application/usecases/update-plan.usecase';
import { DeletePlanUseCase } from '../application/usecases/delete-plan.usecase';
import { FindPlanByIdUseCase } from '../application/usecases/find-plan-by-id.usecase';

@Module({
  imports: [UserModule],
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
    {
      provide: CreatePlanUseCase,
      useFactory: (repo: PlanRepository) => new CreatePlanUseCase(repo),
      inject: [PlanPrismaRepository],
    },

    {
      provide: UpdatePlanUseCase,
      useFactory: (repo: PlanRepository) => new UpdatePlanUseCase(repo),
      inject: [PlanPrismaRepository],
    },
    {
      provide: DeletePlanUseCase,
      useFactory: (repo: PlanRepository) => new DeletePlanUseCase(repo),
      inject: [PlanPrismaRepository],
    },

    {
      provide: FindPlanByIdUseCase,
      useFactory: (repo: PlanRepository) => new FindPlanByIdUseCase(repo),
      inject: [PlanPrismaRepository],
    },
  ],
})
export class PlanModule {}
