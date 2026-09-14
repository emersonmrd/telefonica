import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { RegisterUserUseCase } from '../application/usecases/register-user.usecase';
import { LoginUseCase } from '../application/usecases/login.usecase';
import { UserPrismaRepository } from './database/prisma/repositories/user-prisma.repository';
import { Argon2HashProvider } from './providers/argon2-hash.provider';
import { JwtTokenProvider } from './providers/jwt-token.provider';
import { JwtStrategy } from './guards/jwt.strategy';
import { PrismaAdapter } from '../../shared/infrastructure/database/prisma/prisma.adapter';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'ultra-secret-key-just-for-demo-purposes',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    PrismaAdapter,
    UserPrismaRepository,
    Argon2HashProvider,
    JwtTokenProvider,
    JwtStrategy,
    {
      provide: RegisterUserUseCase,
      useFactory: (
        userRepo: UserPrismaRepository,
        hashProv: Argon2HashProvider,
      ) => {
        return new RegisterUserUseCase(userRepo, hashProv);
      },
      inject: [UserPrismaRepository, Argon2HashProvider],
    },
    {
      provide: LoginUseCase,
      useFactory: (
        userRepo: UserPrismaRepository,
        hashProv: Argon2HashProvider,
        tokenProv: JwtTokenProvider,
      ) => {
        return new LoginUseCase(userRepo, hashProv, tokenProv);
      },
      inject: [UserPrismaRepository, Argon2HashProvider, JwtTokenProvider],
    },
  ],
  exports: [PassportModule, JwtModule],
})
export class UserModule {}
