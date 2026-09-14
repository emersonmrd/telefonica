import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'CPF must contain exactly 11 digits' })
  cpf!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password!: string;
}
