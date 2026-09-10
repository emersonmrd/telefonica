import { NotFoundError } from '../../../shared/domain/errors/not-found-error';
import { Plan } from '../../domain/entities/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';

export class FindPlanByIdUseCase {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(planId: string): Promise<Plan | null> {
    const existingPlan = await this.planRepository.findById(planId);

    if (!existingPlan) {
      throw new NotFoundError(`Plan with id ${planId} not found`);
    }

    return existingPlan;
  }
}
