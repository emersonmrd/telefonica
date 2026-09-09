import { NotFoundError } from '../../../shared/domain/errors/not-found-error';
import { Plan } from '../../domain/entities/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';

export class DeletePlanUseCase {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(planId: string): Promise<void> {
    const existingPlan = await this.planRepository.findById(planId);

    if (!existingPlan) {
      throw new NotFoundError(`Plan with id ${planId} not found`);
    }

    await this.planRepository.delete(planId);
  }
}
