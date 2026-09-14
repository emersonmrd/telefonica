import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  emailOrCpf!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
