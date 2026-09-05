import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error';
import { Plan } from '../../../../domain/entities/plan.entity';
import { PlanRepository } from '../../../../domain/repositories/plan.repository';
import { MockPlanRepository } from '../../../../domain/testing/helpers/plan-repository.mock';
import { DeletePlanUseCase } from '../../delete-plan.usecase';

describe('DeletePlanUseCase', () => {
  let sut: DeletePlanUseCase;
  let planReposioryStub: PlanRepository;

  beforeEach(() => {
    planReposioryStub = new MockPlanRepository();
    sut = new DeletePlanUseCase(planReposioryStub);
  });

  it('should throw NotFoundError if plan does not exist', async () => {
    const findByIdSpy = jest
      .spyOn(planReposioryStub, 'findById')
      .mockResolvedValueOnce(null);
    const planId = 'non-existent-id';

    const promise = sut.execute(planId);

    await expect(promise).rejects.toBeInstanceOf(NotFoundError);
    expect(findByIdSpy).toHaveBeenCalledWith(planId);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should delete the plan if it exists', async () => {
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
      .spyOn(planReposioryStub, 'findById')
      .mockResolvedValueOnce(existingPlan);
    const deleteSpy = jest
      .spyOn(planReposioryStub, 'delete')
      .mockResolvedValueOnce();

    const result = await sut.execute(existingPlan.id);

    expect(findByIdSpy).toHaveBeenCalledWith(existingPlan.id);
    expect(deleteSpy).toHaveBeenCalledWith(existingPlan.id);
    expect(result).toBeUndefined();
  });
});
