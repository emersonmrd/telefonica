import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error';
import { Plan } from '../../../../domain/entities/plan.entity';
import { PlanRepository } from '../../../../domain/repositories/plan.repository';
import { MockPlanRepository } from '../../../../domain/testing/helpers/plan-repository.mock';
import { FindPlanByIdUseCase } from '../../find-plan-by-id.usecase';

describe('FindPlanByIdUseCase', () => {
  let sut: FindPlanByIdUseCase;
  let planRepositoryStub: PlanRepository;

  beforeEach(() => {
    planRepositoryStub = new MockPlanRepository();
    sut = new FindPlanByIdUseCase(planRepositoryStub);
  });

  it('Should throw an not found error when plan not exist', async () => {
    const findByIdSpy = jest
      .spyOn(planRepositoryStub, 'findById')
      .mockResolvedValueOnce(null);

    const planId = '1';

    const promise = sut.execute(planId);

    await expect(promise).rejects.toBeInstanceOf(NotFoundError);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
  });

  it('Should return the plan when it exists', async () => {
    const existingPlan = new Plan(
      '1',
      'PLANO A',
      null,
      55.0,
      15,
      'CONTROLE',
      new Date(),
      new Date(),
    );

    const findByIdSpy = jest
      .spyOn(planRepositoryStub, 'findById')
      .mockResolvedValueOnce(existingPlan);

    const planId = existingPlan.id;

    const promise = await sut.execute(planId);

    expect(promise).toStrictEqual(existingPlan);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
  });
});
