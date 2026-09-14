import { UnauthorizedError } from '../../../shared/domain/errors/unauthorized-error';
import { HashProvider } from '../../domain/providers/hash.provider';
import { TokenProvider } from '../../domain/providers/token.provider';
import { UserRepository } from '../../domain/repositories/user.repository';
import { LoginInput } from '../dtos/login.input';

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute(input: LoginInput): Promise<{ access_token: string }> {
    let user = await this.userRepository.findByEmail(input.emailOrCpf);

    if (!user) {
      user = await this.userRepository.findByCpf(input.emailOrCpf);
    }

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const passwordMatch = await this.hashProvider.compare(
      input.password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, name: user.name };
    const access_token = await this.tokenProvider.generate(payload);

    return { access_token };
  }
}
