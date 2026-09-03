import { Plan as PrismaPlan } from '@prisma/client';
import { Plan } from '../../../../domain/entities/plan.entity';

export class PlanModelMapper {
  static toEntity(prismaPlan: PrismaPlan) {
    return new Plan(
      prismaPlan.id,
      prismaPlan.name,
      prismaPlan.description,
      prismaPlan.price,
      prismaPlan.dataAllowance,
      prismaPlan.planType,
      prismaPlan.createdAt,
      prismaPlan.updatedAt,
    );
  }
}
