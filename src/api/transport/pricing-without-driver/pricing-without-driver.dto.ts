import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePricingWithoutDriverDto {
  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsOptional()
  @IsNumber()
  sedan_3seat: number;

  @IsOptional()
  @IsNumber()
  minivan_7seat: number;

  @IsOptional()
  @IsNumber()
  minibus_18seat: number;

  @IsOptional()
  @IsNumber()
  bus_35seat: number;
}

export class UpdatePricingWithoutDriverDto {
  @IsOptional()
  @IsString()
  destination: string;

  @IsOptional()
  @IsNumber()
  sedan_3seat: number;

  @IsOptional()
  @IsNumber()
  minivan_7seat: number;

  @IsOptional()
  @IsNumber()
  minibus_18seat: number;

  @IsOptional()
  @IsNumber()
  bus_35seat: number;
}
