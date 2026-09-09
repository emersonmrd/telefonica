import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsIn,
  Min,
  Max,
  MaxLength,
  Length,
} from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100, { message: 'O nome deve ter entre 2 e 100 caracteres' })
  name!: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'A descrição não pode passar de 255 caracteres' })
  description!: string | null;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'O preço não pode ser negativo' })
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1, { message: 'O limite de dados deve ser um valor positivo' })
  @Max(200, { message: 'O limite de dados deve ser menor do que 200' })
  dataAllowance!: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['CONTROLE', 'POS', 'FIBRA'], { message: 'Tipo de plano inválido' })
  planType!: string;
}
