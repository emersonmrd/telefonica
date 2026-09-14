import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { RegisterUserUseCase } from '../../application/usecases/register-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  async register(@Body() dto: RegisterUserDto) {
    const user = await this.registerUserUseCase.execute(dto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
