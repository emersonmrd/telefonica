import { ConflictError } from '../../../../../shared/domain/errors/conflict-error';
import { User } from '../../../../domain/entities/user.entity';
import { HashProvider } from '../../../../domain/providers/hash.provider';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { mockHashProvider } from '../../../../domain/testing/helpers/hash-provider.mock';
import { mockUserRepository } from '../../../../domain/testing/helpers/user-repository.mock';
import { RegisterUserInput } from '../../../dtos/register-user.input';
import { RegisterUserUseCase } from '../../register-user.usecase';

describe('RegisterUserUseCase (unit)', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let hashProvider: jest.Mocked<HashProvider>;

  beforeEach(() => {
    userRepository = mockUserRepository();
    hashProvider = mockHashProvider();
    useCase = new RegisterUserUseCase(userRepository, hashProvider);
  });

  const validParam: RegisterUserInput = {
    name: 'John Doe',
    email: 'john@example.com',
    cpf: '12345678901',
    password: 'password123',
  };

  it('should register a new user successfully', async () => {
    const hashedPassword = 'hashed_password_123';
    const mockUser = new User(
      'uuid',
      validParam.name,
      validParam.email,
      validParam.cpf,
      hashedPassword,
      new Date(),
      new Date(),
    );

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.findByCpf.mockResolvedValue(null);
    hashProvider.hash.mockResolvedValue(hashedPassword);
    userRepository.create.mockResolvedValue(mockUser);

    const result = await useCase.execute(validParam);

    expect(result).toEqual(mockUser);
    expect(hashProvider.hash).toHaveBeenCalledWith(validParam.password);
    expect(userRepository.create).toHaveBeenCalledWith({
      name: validParam.name,
      email: validParam.email,
      cpf: validParam.cpf,
      passwordHash: hashedPassword,
    });
  });

  it('should throw ConflictError if email is already in use', async () => {
    userRepository.findByEmail.mockResolvedValue({} as User); // Mock finding a user

    await expect(useCase.execute(validParam)).rejects.toThrow(
      new ConflictError('E-mail already in use'),
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(validParam.email);
    expect(hashProvider.hash).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should throw ConflictError if cpf is already in use', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.findByCpf.mockResolvedValue({} as User); // Mock finding a user

    await expect(useCase.execute(validParam)).rejects.toThrow(
      new ConflictError('CPF already in use'),
    );
    expect(userRepository.findByCpf).toHaveBeenCalledWith(validParam.cpf);
    expect(hashProvider.hash).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
