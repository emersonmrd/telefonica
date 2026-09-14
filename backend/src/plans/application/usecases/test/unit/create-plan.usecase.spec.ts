import { Plan } from '../../../../domain/entities/plan.entity';
import { PlanRepository } from '../../../../domain/repositories/plan.repository';
import { CreatePlanUseCase } from '../../create-plan.usecase';
import { MockPlanRepository } from '../../../../domain/testing/helpers/plan-repository.mock';
import { ConflictError } from '../../../../../shared/domain/errors/conflict-error';

describe('CreatePlanUseCase', () => {
  let sut: CreatePlanUseCase;
  let planRepositoryStub: PlanRepository;

  beforeEach(() => {
    planRepositoryStub = new MockPlanRepository();
    sut = new CreatePlanUseCase(planRepositoryStub);
  });

  it('Should throw an error if plan name already exists', async () => {
    const spyFindByName = jest
      .spyOn(planRepositoryStub, 'findByName')
      .mockResolvedValueOnce(
        new Plan(
          '1',
          'Vivo Controle 15GB',
          null,
          55.0,
          15,
          null,
          'CONTROLE',
          new Date(),
          new Date(),
        ),
      );

    const promise = sut.execute({
      name: 'Vivo Controle 15GB',
      description: null,
      price: 55.0,
      dataAllowance: 15,
      planType: 'CONTROLE',
    });

    await expect(spyFindByName).toHaveBeenCalledTimes(1);
    await expect(promise).rejects.toThrow(
      new ConflictError('Plan name already exists'),
    );
  });

  it('Should create and return a new plan', async () => {
    const spyFindByName = jest
      .spyOn(planRepositoryStub, 'findByName')
      .mockResolvedValueOnce(null);

    const spyCreate = jest
      .spyOn(planRepositoryStub, 'create')
      .mockResolvedValueOnce(
        new Plan(
          '1',
          'Vivo Controle 15GB',
          null,
          55.0,
          15,
          null,
          'CONTROLE',
          new Date(),
          new Date(),
        ),
      );

    const plan = await sut.execute({
      name: 'Vivo Controle 15GB',
      description: null,
      price: 55.0,
      dataAllowance: 15,
      planType: 'CONTROLE',
    });

    expect(spyFindByName).toHaveBeenCalledTimes(1);
    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(plan).not.toBeNull();
    expect(plan.name).toBe('Vivo Controle 15GB');
  });
});
