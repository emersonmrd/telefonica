import { Plan } from './plan.entity';

export abstract class PlanRepository {
  abstract findAll(): Promise<Plan[]>;
  abstract findById(id: string): Promise<Plan | null>;
  abstract create(plan: Partial<Plan>): Promise<Plan>;
}
