import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCarDto {
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
  price: number;

  @IsOptional()
  @IsBoolean()
  freeCancellation: boolean;

  @IsBoolean()
  isRu: boolean;

  @IsBoolean()
  isHy: boolean;

  @IsString()
  @IsNotEmpty()
  pickup: string;

  @IsString()
  @IsNotEmpty()
  pickup_ru: string;

  @IsString()
  @IsNotEmpty()
  pickup_hy: string;

  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsString()
  @IsNotEmpty()
  fuel_ru: string;

  @IsString()
  @IsNotEmpty()
  fuel_hy: string;

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
  shortDescription_ru: string;

  @IsString()
  @IsNotEmpty()
  shortDescription_hy: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  description_ru: string;

  @IsString()
  @IsNotEmpty()
  description_hy: string;

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
  @IsString()
  name_ru: string;

  @IsOptional()
  @IsString()
  name_hy: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  freeCancellation: boolean;

  @IsOptional()
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

  @IsOptional()
  @IsString()
  pickup: string;

  @IsOptional()
  @IsString()
  pickup_ru: string;

  @IsOptional()
  @IsString()
  pickup_hy: string;

  @IsOptional()
  @IsString()
  fuel: string;

  @IsOptional()
  @IsString()
  fuel_ru: string;

  @IsOptional()
  @IsString()
  fuel_hy: string;

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
  shortDescription_ru: string;

  @IsOptional()
  @IsString()
  shortDescription_hy: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  description_ru: string;

  @IsOptional()
  @IsString()
  description_hy: string;

}

class CreatePricingDto {
  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsString()
  destination_hy: string;

  @IsNotEmpty()
  @IsString()
  destination_ru: string;

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

export class CreatePricingWithoutDriverDto extends CreatePricingDto {
  @IsNumber()
  @IsNotEmpty()
  carId: number;
}