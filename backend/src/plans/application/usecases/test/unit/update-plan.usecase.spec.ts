import { MockPlanRepository } from '../../../../domain/testing/helpers/plan-repository.mock';
import { PlanRepository } from '../../../../domain/repositories/plan.repository';
import { UpdatePlanUseCase } from '../../update-plan.usecase';
import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error';
import { Plan } from '../../../../domain/entities/plan.entity';
import { ConflictError } from '../../../../../shared/domain/errors/conflict-error';

describe('UpdatePlanUseCase', () => {
  let sut: UpdatePlanUseCase;
  let planReposioryStub: PlanRepository;
  beforeEach(() => {
    planReposioryStub = new MockPlanRepository();
    sut = new UpdatePlanUseCase(planReposioryStub);
  });

  it('should throw NotFoundError if plan does not exist', async () => {
    const findByIdSpy = jest
      .spyOn(planReposioryStub, 'findById')
      .mockResolvedValueOnce(null);
    const updateData = { id: 'non-existent-id', name: 'Updated Plan' };

    const promise = sut.execute(updateData);

    await expect(promise).rejects.toBeInstanceOf(NotFoundError);
    expect(findByIdSpy).toHaveBeenCalledWith(updateData.id);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw ConflictError if new name already belongs to another plan', async () => {
    const findByIdSpy = jest
      .spyOn(planReposioryStub, 'findById')
      .mockResolvedValueOnce(
        new Plan(
          '1',
          'PLANO A',
          null,
          55.0,
          15, null,
          'CONTROLE',
          new Date(),
          new Date(),
        ),
      );

    const findByNameSpy = jest
      .spyOn(planReposioryStub, 'findByName')
      .mockResolvedValueOnce(
        new Plan(
          '2',
          'PLANO A',
          null,
          55.0,
          15, null,
          'CONTROLE',
          new Date(),
          new Date(),
        ),
      );

    const updateData = { id: '1', name: 'PLANO A' };

    const promise = sut.execute(updateData);

    await expect(promise).rejects.toBeInstanceOf(ConflictError);
    expect(findByIdSpy).toHaveBeenCalledWith(updateData.id);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByNameSpy).toHaveBeenCalledWith(updateData.name);
    expect(findByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should update and return the plan', async () => {
    const existingPlan = new Plan(
      '1',
      'PLANO A',
      null,
      55.0,
      15, null,
      'CONTROLE',
      new Date(),
      new Date(),
    );

    const findByIdSpy = jest
      .spyOn(planReposioryStub, 'findById')
      .mockResolvedValueOnce(existingPlan);

    const findByNameSpy = jest
      .spyOn(planReposioryStub, 'findByName')
      .mockResolvedValueOnce(null);

    const updateData = { id: '1', name: 'Updated Plan' };

    const updatedPlan = new Plan(
      '1',
      'Updated Plan',
      null,
      55.0,
      15, null,
      'CONTROLE',
      new Date(),
      new Date(),
    );

    const updateSpy = jest
      .spyOn(planReposioryStub, 'update')
      .mockResolvedValueOnce(updatedPlan);

    const result = await sut.execute(updateData);

    expect(findByIdSpy).toHaveBeenCalledWith(updateData.id);
    expect(findByNameSpy).toHaveBeenCalledWith(updateData.name);
    expect(updateSpy).toHaveBeenCalledWith(updateData.id, updateData);
    expect(result.name).toBe(updatedPlan.name);
    expect(result.id).toBe(updatedPlan.id);
  });
});
