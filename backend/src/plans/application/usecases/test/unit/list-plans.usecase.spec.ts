import { Plan } from '../../../../domain/entities/plan.entity';
import { PlanRepository } from '../../../../domain/repositories/plan.repository';
import { ListPlansUseCase } from '../../list-plans.usecase';

// Criando um Mock (banco de dados falso)
class MockPlanRepository implements PlanRepository {
  async findAll(): Promise<Plan[]> {
    return [
      new Plan(
        '1',
        'Vivo Controle 15GB',
        null,
        55.0,
        15,
        'CONTROLE',
        new Date(),
        new Date(),
      ),
    ];
  }
  async findById(id: string): Promise<Plan | null> {
    return null;
  }
  async create(plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>) {
    return null as any;
  }
}

describe('ListPlansUseCase', () => {
  let sut: ListPlansUseCase;
  let planRepositoryStub: PlanRepository;

  beforeEach(() => {
    planRepositoryStub = new MockPlanRepository();
    sut = new ListPlansUseCase(planRepositoryStub);
  });

  it('Should return a list of avaliable plans', async () => {
    const findAllSpy = jest.spyOn(planRepositoryStub, 'findAll');

    const plans = await sut.execute();

    expect(plans).toHaveLength(1);
    expect(plans[0].name).toBe('Vivo Controle 15GB');
    expect(plans[0].price).toBe(55.0);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });
});
