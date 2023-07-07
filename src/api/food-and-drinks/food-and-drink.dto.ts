import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFoodAndDrinkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  fromYerevan: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  neatestSettlement: string;

  @IsString()
  @IsNotEmpty()
  vegan: string;

  @IsString()
  @IsNotEmpty()
  entrance: string;

  @IsArray()
  images: string[];
}
export class UpdateFoodAndDrinkDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  fromYerevan: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  neatestSettlement: string;

  @IsString()
  @IsOptional()
  vegan: string;

  @IsString()
  @IsOptional()
  entrance: string;
}
