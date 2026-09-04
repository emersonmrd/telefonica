import { ConflictError } from '../../../shared/domain/errors/conflict-error';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { CreatePlanInput } from '../dtos/create-plan.input';

export class CreatePlanUseCase {
  constructor(private readonly planRepository: PlanRepository) {}
  async execute(input: CreatePlanInput) {
    const planExists = await this.planRepository.findByName(input.name);
    if (planExists) {
      throw new ConflictError('Plan name already exists');
    }
    const newPlan = await this.planRepository.create(input);
    return newPlan;
  }
}
