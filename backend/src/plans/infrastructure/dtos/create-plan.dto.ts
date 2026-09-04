import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description!: string | null;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  dataAllowance!: number;

  @IsString()
  @IsNotEmpty()
  planType!: string;
}
