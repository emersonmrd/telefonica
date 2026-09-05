import { Plan } from '../../entities/plan.entity';
import { PlanRepository } from '../../repositories/plan.repository';

export class MockPlanRepository implements PlanRepository {
  update(
    id: string,
    plan: Partial<Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Plan> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Plan[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Plan | null> {
    throw new Error('Method not implemented.');
  }
  async create(
    plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Plan> {
    throw new Error('Method not implemented.');
  }
  async findByName(name: string): Promise<Plan | null> {
    throw new Error('Method not implemented.');
  }
}
