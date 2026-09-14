import { UnauthorizedError } from '../../../../../shared/domain/errors/unauthorized-error';
import { User } from '../../../../domain/entities/user.entity';
import { HashProvider } from '../../../../domain/providers/hash.provider';
import { TokenProvider } from '../../../../domain/providers/token.provider';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { mockHashProvider } from '../../../../domain/testing/helpers/hash-provider.mock';
import { mockUserRepository } from '../../../../domain/testing/helpers/user-repository.mock';
import { LoginInput } from '../../../dtos/login.input';
import { LoginUseCase } from '../../login.usecase';

const mockTokenProvider = (): jest.Mocked<TokenProvider> => ({
  generate: jest.fn(),
  verify: jest.fn(),
});

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let hashProvider: jest.Mocked<HashProvider>;
  let tokenProvider: jest.Mocked<TokenProvider>;

  beforeEach(() => {
    userRepository = mockUserRepository();
    hashProvider = mockHashProvider();
    tokenProvider = mockTokenProvider();
    useCase = new LoginUseCase(userRepository, hashProvider, tokenProvider);
  });

  const validParam: LoginInput = {
    emailOrCpf: 'john@example.com',
    password: 'password123',
  };

  const mockUser = new User(
    'uuid',
    'John Doe',
    'john@example.com',
    '12345678901',
    'hashed_password_123',
    new Date(),
    new Date(),
  );

  it('should return a token if credentials are valid (email)', async () => {
    userRepository.findByEmail.mockResolvedValue(mockUser);
    hashProvider.compare.mockResolvedValue(true);
    tokenProvider.generate.mockResolvedValue('jwt-token');

    const result = await useCase.execute(validParam);

    expect(result).toEqual({ access_token: 'jwt-token' });
    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      validParam.emailOrCpf,
    );
    expect(hashProvider.compare).toHaveBeenCalledWith(
      validParam.password,
      mockUser.passwordHash,
    );
    expect(tokenProvider.generate).toHaveBeenCalledWith({
      sub: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
    });
  });

  it('should return a token if credentials are valid (cpf)', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.findByCpf.mockResolvedValue(mockUser);
    hashProvider.compare.mockResolvedValue(true);
    tokenProvider.generate.mockResolvedValue('jwt-token');

    const paramCpf = { ...validParam, emailOrCpf: '12345678901' };
    const result = await useCase.execute(paramCpf);

    expect(result).toEqual({ access_token: 'jwt-token' });
    expect(userRepository.findByCpf).toHaveBeenCalledWith(paramCpf.emailOrCpf);
  });

  it('should throw UnauthorizedError if user is not found', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.findByCpf.mockResolvedValue(null);

    await expect(useCase.execute(validParam)).rejects.toThrow(
      new UnauthorizedError('Invalid credentials'),
    );
  });

  it('should throw UnauthorizedError if password does not match', async () => {
    userRepository.findByEmail.mockResolvedValue(mockUser);
    hashProvider.compare.mockResolvedValue(false);

    await expect(useCase.execute(validParam)).rejects.toThrow(
      new UnauthorizedError('Invalid credentials'),
    );
  });
});
