import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListPlansUseCase } from '../application/usecases/list-plans.usecase';
import { CreatePlanUseCase } from '../application/usecases/create-plan.usecase';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { UpdatePlanDto } from './dtos/update-plan-dto';
import { DeletePlanUseCase } from '../application/usecases/delete-plan.usecase';
import { UpdatePlanUseCase } from '../application/usecases/update-plan.usecase';
import { FindPlanByIdUseCase } from '../application/usecases/find-plan-by-id.usecase';

@Controller()
export class PlanController {
  constructor(
    private readonly listPlanUseCase: ListPlansUseCase,
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly updatePlanUseCase: UpdatePlanUseCase,
    private readonly deletePlanUseCase: DeletePlanUseCase,
    private readonly findByIdUseCase: FindPlanByIdUseCase,
  ) {}

  @Get('/plans')
  async listPlans() {
    return this.listPlanUseCase.execute();
  }

  @Get('/plans/:id')
  async findPlanById(@Param('id') id: string) {
    return this.findByIdUseCase.execute(id);
  }

  @Post('/plans')
  async createPlan(@Body() createPlanDto: CreatePlanDto) {
    return this.createPlanUseCase.execute(createPlanDto);
  }

  @Patch('/plans/:id')
  async updatePlan(
    @Body() updatePlanDto: UpdatePlanDto,
    @Param('id') id: string,
  ) {
    return this.updatePlanUseCase.execute({ id, ...updatePlanDto });
  }

  @Delete('/plans/:id')
  @HttpCode(204)
  async deletePlan(@Param('id') id: string) {
    return this.deletePlanUseCase.execute(id);
  }
}
