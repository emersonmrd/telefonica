import { Plan } from '../../../../domain/entities/plan.entity';
import { PlanRepository } from '../../../../domain/repositories/plan.repository';
import { MockPlanRepository } from '../../../../domain/testing/helpers/plan-repository.mock';
import { ListPlansUseCase } from '../../list-plans.usecase';

describe('ListPlansUseCase', () => {
  let sut: ListPlansUseCase;
  let planRepositoryStub: PlanRepository;

  beforeEach(() => {
    planRepositoryStub = new MockPlanRepository();
    sut = new ListPlansUseCase(planRepositoryStub);
  });

  it('Should return a list of avaliable plans', async () => {
    const findAllSpy = jest
      .spyOn(planRepositoryStub, 'findAll')
      .mockResolvedValueOnce([
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
      ]);

    const plans = await sut.execute();

    expect(plans).toHaveLength(1);
    expect(plans[0].name).toBe('Vivo Controle 15GB');
    expect(plans[0].price).toBe(55.0);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });
});
