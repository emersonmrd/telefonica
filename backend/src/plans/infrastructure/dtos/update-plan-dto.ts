import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsIn,
  Max,
  Min,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  @Length(2, 100, { message: 'O nome deve ter entre 2 e 100 caracteres' })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'A descrição não pode passar de 255 caracteres' })
  description?: string | null;

  @IsOptional()
  @IsNumber()
 
  @Min(0, { message: 'O preço não pode ser negativo' })
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1, { message: 'O limite de dados deve ser um valor positivo' })
  @Max(200, { message: 'O limite de dados deve ser menor do que 200' })
  dataAllowance?: number;

  @IsOptional()
  @IsString()
  @IsIn(['CONTROLE', 'POS', 'FIBRA'], { message: 'Tipo de plano inválido' })
  planType?: string;
}
