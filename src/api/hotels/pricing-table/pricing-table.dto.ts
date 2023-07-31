import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePricingTableDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @IsString()
  @IsNotEmpty()
  name_hy: string;

  @IsNumber()
  @IsNotEmpty()
  firstPart: number;

  @IsNumber()
  @IsNotEmpty()
  lastPart: number;

  @IsNotEmpty()
  @IsNumber()
  hotelId: number;
}

export class UpdatePricingTableDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  name_ru: string;

  @IsOptional()
  @IsString()
  name_hy: string;

  @IsOptional()
  @IsNumber()
  firstPart: number;

  @IsOptional()
  @IsNumber()
  lastPart: number;
}
