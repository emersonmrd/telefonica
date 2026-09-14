import { ConflictError } from '../../../shared/domain/errors/conflict-error';
import { NotFoundError } from '../../../shared/domain/errors/not-found-error';
import { Plan } from '../../domain/entities/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { UpdatePlanInput } from '../dtos/update-plan.input';

export class UpdatePlanUseCase {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(input: UpdatePlanInput): Promise<Plan> {
    const plan: Plan | null = await this.planRepository.findById(input.id);
    if (!plan) {
      throw new NotFoundError('Plan not found');
    }
    if (input.name) {
      const existingPlanWithName: Plan | null =
        await this.planRepository.findByName(input.name);
      if (existingPlanWithName && existingPlanWithName.id !== input.id) {
        throw new ConflictError('Plan name already exists');
      }
    }
    return await this.planRepository.update(input.id, input);
  }
}
