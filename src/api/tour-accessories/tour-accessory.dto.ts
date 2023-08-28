import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTourAccessoryDto {
  @IsOptional()
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @IsString()
  @IsNotEmpty()
  title_hy: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsOptional()
  perPax: string;

  @IsString()
  @IsOptional()
  perPax_ru: string;

  @IsString()
  @IsOptional()
  perPax_hy: string;

  @IsNumber()
  @IsNotEmpty()
  type: number;

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
  rentFrom: string;

  @IsString()
  @IsNotEmpty()
  rentFrom_ru: string;

  @IsString()
  @IsNotEmpty()
  rentFrom_hy: string;

  @IsString()
  @IsNotEmpty()
  available: string;

  @IsString()
  @IsNotEmpty()
  available_ru: string;

  @IsString()
  @IsNotEmpty()
  available_hy: string;

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
  longDescription: string;

  @IsString()
  @IsNotEmpty()
  longDescription_ru: string;

  @IsString()
  @IsNotEmpty()
  longDescription_hy: string;

  @IsArray()
  @IsOptional()
  images: Array<string>;

  @IsArray()
  @IsOptional()
  pricing: Array<Pricing>;
}

class Pricing {
  @IsString()
  duration: string;

  @IsNumber()
  price: number;
}

export class UpdateTourAccessoryDto {
  @IsOptional()
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  title_ru: string;

  @IsOptional()
  @IsString()
  title_hy: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsString()
  perPax: string;

  @IsOptional()
  @IsString()
  perPax_ru: string;

  @IsOptional()
  @IsString()
  perPax_hy: string;

  @IsOptional()
  @IsNumber()
  type: number;

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
  @IsString()
  rentFrom: string;

  @IsOptional()
  @IsString()
  rentFrom_ru: string;

  @IsOptional()
  @IsString()
  rentFrom_hy: string;

  @IsOptional()
  @IsString()
  available: string;

  @IsOptional()
  @IsString()
  available_ru: string;

  @IsOptional()
  @IsString()
  available_hy: string;

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

export class CreateAccessoryImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  accessoryId: number;
}