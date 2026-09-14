import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginUseCase } from '../../application/usecases/login.usecase';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute({
      emailOrCpf: loginDto.emailOrCpf,
      password: loginDto.password,
    });
  }
}
