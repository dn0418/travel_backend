import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCurrencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  rate: number;
}
