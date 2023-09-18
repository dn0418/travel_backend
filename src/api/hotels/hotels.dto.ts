import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHotelDto {
  @IsOptional()
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  name_ru: string;

  @IsString()
  @IsOptional()
  name_hy: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  maps: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  fromAirport: string;

  @IsOptional()
  @IsString()
  fromAirport_ru: string;

  @IsOptional()
  @IsString()
  fromAirport_hy: string;

  @IsNotEmpty()
  @IsString()
  freeCancellation: string;

  @IsOptional()
  @IsString()
  freeCancellation_ru: string;

  @IsOptional()
  @IsString()
  freeCancellation_hy: string;

  @IsNumber()
  @IsOptional()
  score: number;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  country_ru: string;

  @IsString()
  @IsOptional()
  country_hy: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsOptional()
  city_ru: string;

  @IsString()
  @IsOptional()
  city_hy: string;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsOptional()
  @IsString()
  checkInTime: string;

  @IsString()
  @IsOptional()
  checkOutTime: string;

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
  longDescription: string;

  @IsString()
  @IsOptional()
  longDescription_ru: string;

  @IsString()
  @IsOptional()
  longDescription_hy: string;

  @IsArray()
  @IsOptional()
  images: Array<string>;

  @IsArray()
  @IsOptional()
  pricingData: Array<PricingTableDto>;
}


class PricingTableDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  name_ru: string;

  @IsOptional()
  @IsString()
  name_hy: string;

  @IsNumber()
  @IsNotEmpty()
  firstPart: number;

  @IsNumber()
  @IsNotEmpty()
  lastPart: number;
}

export class UpdateHotelDto {
  @IsOptional()
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

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
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsString()
  maps: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  fromAirport: string;

  @IsOptional()
  @IsString()
  fromAirport_ru: string;

  @IsOptional()
  @IsString()
  fromAirport_hy: string;

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
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  country_ru: string;

  @IsOptional()
  @IsString()
  country_hy: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  city_ru: string;

  @IsOptional()
  @IsString()
  city_hy: string;

  @IsOptional()
  @IsNumber()
  type: number;

  @IsOptional()
  @IsNumber()
  score: number;

  @IsOptional()
  @IsString()
  checkInTime: string;

  @IsOptional()
  @IsString()
  checkOutTime: string;

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
  longDescription: string;

  @IsOptional()
  @IsString()
  longDescription_ru: string;

  @IsOptional()
  @IsString()
  longDescription_hy: string;
}

export class CreateHotelImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  hotelId: number;
}