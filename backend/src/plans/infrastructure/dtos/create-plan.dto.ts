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
  ValidateIf,
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

  @ValidateIf((o) => o.planType !== 'FIBRA')
  @IsNotEmpty({ message: 'Franquia de dados é obrigatória para planos móveis' })
  @IsNumber()
  @IsPositive()
  @Min(1, { message: 'O limite de dados deve ser um valor positivo' })
  @Max(200, { message: 'O limite de dados deve ser menor do que 200' })
  dataAllowance?: number | null;

  @ValidateIf((o) => o.planType === 'FIBRA')
  @IsNotEmpty({ message: 'Velocidade é obrigatória para planos de fibra' })
  @IsNumber()
  @IsPositive()
  speed?: number | null;

  @IsNotEmpty()
  @IsString()
  @IsIn(['CONTROLE', 'POS', 'FIBRA', 'PRE'], {
    message: 'Tipo de plano inválido',
  })
  planType!: string;
}
