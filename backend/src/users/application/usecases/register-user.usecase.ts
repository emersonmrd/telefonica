import { ConflictError } from '../../../shared/domain/errors/conflict-error';
import { HashProvider } from '../../domain/providers/hash.provider';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterUserInput } from '../dtos/register-user.input';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute(input: RegisterUserInput) {
    const emailExists = await this.userRepository.findByEmail(input.email);
    if (emailExists) {
      throw new ConflictError('E-mail already in use');
    }

    const cpfExists = await this.userRepository.findByCpf(input.cpf);
    if (cpfExists) {
      throw new ConflictError('CPF already in use');
    }

    const hashedPassword = await this.hashProvider.hash(input.password);

    const newUser = await this.userRepository.create({
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      passwordHash: hashedPassword,
    });

    return newUser;
  }
}
