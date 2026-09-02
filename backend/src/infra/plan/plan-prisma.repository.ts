import { Injectable } from '@nestjs/common';
import { PlanRepository } from '../../domain/plan/plan.repository';
import { PrismaAdapter } from '../database/prisma.adapter';
import { Plan } from '../../domain/plan/plan.entity';

@Injectable()
export class PlanPrismaRepository implements PlanRepository {
  constructor(private readonly prisma: PrismaAdapter) {}

  async findAll(): Promise<Plan[]> {
    return this.prisma.plan.findMany();
  }

  async findById(id: string): Promise<Plan | null> {
    return this.prisma.plan.findUnique({ where: { id } });
  }

  async create(
    plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Plan> {
    return this.prisma.plan.create({ data: plan });
  }
}
