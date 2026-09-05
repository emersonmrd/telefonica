import { Plan } from '../entities/plan.entity';

export abstract class PlanRepository {
  abstract findAll(): Promise<Plan[]>;
  abstract findById(id: string): Promise<Plan | null>;
  abstract create(
    plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Plan>;
  abstract findByName(name: string): Promise<Plan | null>;
  abstract update(
    id: string,
    plan: Partial<Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Plan>;
  abstract delete(id: string): Promise<void>;
}
