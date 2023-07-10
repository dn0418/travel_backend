import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsBoolean()
  freeCancellation: boolean;

  @IsString()
  @IsNotEmpty()
  pickup: string;

  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  seatNo: number;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  description: string;


  @IsArray()
  @IsOptional()
  images: Array<string>;

  @IsOptional()
  @IsArray()
  pricing: Array<CreatePricingDto>;
}

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  freeCancellation: boolean;

  @IsOptional()
  @IsString()
  pickup: string;

  @IsOptional()
  @IsString()
  fuel: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNumber()
  seatNo: number;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  description: string;
}

class CreatePricingDto {
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

  @IsNumber()
  @IsNotEmpty()
  carId: number;
}