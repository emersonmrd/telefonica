import { User as PrismaUser } from '@prisma/client';
import { User } from '../../../../domain/entities/user.entity';

export class UserModelMapper {
  static toEntity(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.cpf,
      prismaUser.password,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }
}
