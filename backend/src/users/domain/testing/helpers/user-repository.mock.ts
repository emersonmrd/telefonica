import { UserRepository } from '../../repositories/user.repository';

export const mockUserRepository = (): jest.Mocked<UserRepository> => ({
  findByEmail: jest.fn(),
  findByCpf: jest.fn(),
  create: jest.fn(),
});
