import { Controller, Get } from '@nestjs/common';
import { ListPlansUseCase } from '../../application/plan/list-plans.usecase';

@Controller()
export class PlanController {
  constructor(private readonly listPlanUseCase: ListPlansUseCase) {}

  @Get('/plans')
  async listPlans() {
    return this.listPlanUseCase.execute();
  }
}
