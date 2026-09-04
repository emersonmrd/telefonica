import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { ListPlansUseCase } from '../application/usecases/list-plans.usecase';
import { CreatePlanUseCase } from '../application/usecases/create-plan.usecase';
import { CreatePlanDto } from './dtos/create-plan.dto';

@Controller()
export class PlanController {
  constructor(
    private readonly listPlanUseCase: ListPlansUseCase,
    private readonly createPlanUseCase: CreatePlanUseCase,
  ) {}

  @Get('/plans')
  async listPlans() {
    return this.listPlanUseCase.execute();
  }

  @Post('/plans')
  async createPlan(@Body() createPlanDto: CreatePlanDto) {
    return this.createPlanUseCase.execute(createPlanDto);
  }
}
