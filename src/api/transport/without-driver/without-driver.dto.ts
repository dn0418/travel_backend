import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  name_ru: string;

  @IsString()
  @IsOptional()
  name_hy: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  freeCancellation: string;

  @IsOptional()
  @IsString()
  freeCancellation_ru: string;

  @IsOptional()
  @IsString()
  freeCancellation_hy: string;

  @IsOptional()
  @IsOptional()
  score: number;

  @IsOptional()
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

  @IsString()
  @IsNotEmpty()
  pickup: string;

  @IsOptional()
  @IsString()
  pickup_ru: string;

  @IsOptional()
  @IsString()
  pickup_hy: string;

  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsString()
  @IsOptional()
  fuel_ru: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  shortDescription_ru: string;

  @IsString()
  @IsOptional()
  shortDescription_hy: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  description_ru: string;

  @IsString()
  @IsOptional()
  description_hy: string;

  @IsArray()
  @IsOptional()
  images: Array<string>;

  @IsOptional()
  @IsArray()
  pricing: Array<CreateWithoutPricingDto>;
}

export class CreateWithoutPricingDto {
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
  @IsString()
  freeCancellation: string;

  @IsOptional()
  @IsString()
  freeCancellation_ru: string;

  @IsOptional()
  @IsString()
  freeCancellation_hy: string;

  @IsOptional()
  @IsOptional()
  score: number;

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



export class CreatePricingWithoutDriverDto extends CreateWithoutPricingDto {
  @IsNumber()
  @IsNotEmpty()
  carId: number;
}

export class UpdatePricingWithoutDriverDto extends CreateWithoutPricingDto { }

export class CreateImageDto {
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsString()
  @IsNotEmpty()
  url: string;
}