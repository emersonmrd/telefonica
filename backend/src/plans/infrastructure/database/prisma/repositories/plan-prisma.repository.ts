import { Injectable } from '@nestjs/common';
import { PlanRepository } from '../../../../../plans/domain/repositories/plan.repository';
import { PrismaAdapter } from '../../../../../shared/infrastructure/database/prisma/prisma.adapter';
import { Plan } from '../../../../domain/entities/plan.entity';
import { PlanModelMapper } from '../models/plan-model.mapper';

@Injectable()
export class PlanPrismaRepository implements PlanRepository {
  constructor(private readonly prisma: PrismaAdapter) {}

  async findAll(): Promise<Plan[]> {
    const models = await this.prisma.plan.findMany();
    return models.map(PlanModelMapper.toEntity);
  }

  async findById(id: string): Promise<Plan | null> {
    const model = await this.prisma.plan.findUnique({ where: { id } });
    if (!model) return null;
    return PlanModelMapper.toEntity(model);
  }

  async create(
    plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Plan> {
    const model = await this.prisma.plan.create({ data: plan });
    return PlanModelMapper.toEntity(model);
  }

  async findByName(name: string): Promise<Plan | null> {
    const model = await this.prisma.plan.findUnique({ where: { name } });
    if (!model) return null;
    return PlanModelMapper.toEntity(model);
  }
}
