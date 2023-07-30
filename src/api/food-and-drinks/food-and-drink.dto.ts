import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFoodAndDrinkDto {
  @IsOptional()
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  name_ru: string;

  @IsOptional()
  @IsString()
  name_hy: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lng: number;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  shortDescription_ru: string;

  @IsOptional()
  @IsString()
  shortDescription_hy: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  description_ru: string;

  @IsOptional()
  @IsString()
  description_hy: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  fromYerevan: string;

  @IsOptional()
  @IsString()
  fromYerevan_ru: string;

  @IsOptional()
  @IsString()
  fromYerevan_hy: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsString()
  address_ru: string;

  @IsOptional()
  @IsString()
  address_hy: string;

  @IsNotEmpty()
  @IsString()
  neatestSettlement: string;

  @IsOptional()
  @IsString()
  neatestSettlement_ru: string;

  @IsOptional()
  @IsString()
  neatestSettlement_hy: string;

  @IsNotEmpty()
  @IsString()
  vegan: string;

  @IsOptional()
  @IsString()
  vegan_ru: string;

  @IsOptional()
  @IsString()
  vegan_hy: string;

  @IsNotEmpty()
  @IsString()
  entrance: string;

  @IsOptional()
  @IsString()
  entrance_ru: string;

  @IsOptional()
  @IsString()
  entrance_hy: string;

  @IsArray()
  images: string[];
}
export class UpdateFoodAndDrinkDto {
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
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  lng: number;

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

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  fromYerevan: string;

  @IsOptional()
  @IsString()
  fromYerevan_ru: string;

  @IsOptional()
  @IsString()
  fromYerevan_hy: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  address_ru: string;

  @IsOptional()
  @IsString()
  address_hy: string;

  @IsOptional()
  @IsString()
  neatestSettlement: string;

  @IsOptional()
  @IsString()
  neatestSettlement_ru: string;

  @IsOptional()
  @IsString()
  neatestSettlement_hy: string;

  @IsOptional()
  @IsString()
  vegan: string;

  @IsOptional()
  @IsString()
  vegan_ru: string;

  @IsOptional()
  @IsString()
  vegan_hy: string;

  @IsOptional()
  @IsString()
  entrance: string;

  @IsOptional()
  @IsString()
  entrance_ru: string;

  @IsOptional()
  @IsString()
  entrance_hy: string;
}

export class CreateFoodImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  foodId: number;
}