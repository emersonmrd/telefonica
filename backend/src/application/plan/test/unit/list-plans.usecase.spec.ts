import { Plan } from '../../../../domain/plan/plan.entity';
import { PlanRepository } from '../../../../domain/plan/plan.repository';
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
  async create(plan: Partial<Plan>): Promise<Plan> {
    return null as any;
  }
}

describe('ListPlansUseCase', () => {
  let useCase: ListPlansUseCase;
  let repository: PlanRepository;

  beforeEach(() => {
    repository = new MockPlanRepository();
    useCase = new ListPlansUseCase(repository);
  });

  it('deve retornar uma lista de planos disponíveis', async () => {
    const plans = await useCase.execute();

    expect(plans).toHaveLength(1);
    expect(plans[0].name).toBe('Vivo Controle 15GB');
    expect(plans[0].price).toBe(55.0);
  });
});
