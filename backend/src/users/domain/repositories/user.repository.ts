import { User } from '../entities/user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
}
