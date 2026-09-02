import { Plan } from '../../domain/plan/plan.entity';
import { PlanRepository } from '../../domain/plan/plan.repository';

export class ListPlansUseCase {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(): Promise<Plan[]> {
    return this.planRepository.findAll();
  }
}
