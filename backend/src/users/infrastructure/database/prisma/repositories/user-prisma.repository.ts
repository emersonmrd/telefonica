import { Injectable } from '@nestjs/common';
import { PrismaAdapter as PrismaService } from '../../../../../shared/infrastructure/database/prisma/prisma.adapter';
import { User } from '../../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../../domain/repositories/user.repository';
import { UserModelMapper } from '../models/user-model.mapper';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return UserModelMapper.toEntity(user);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { cpf } });
    if (!user) return null;
    return UserModelMapper.toEntity(user);
  }

  async create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: data.passwordHash,
      },
    });
    return UserModelMapper.toEntity(created);
  }
}
