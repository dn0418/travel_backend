import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWithDriverDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @IsString()
  @IsNotEmpty()
  title_hy: string;

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
  pricing: Array<CreatePricingWithDriverDto>;

  @IsArray()
  @IsNotEmpty()
  images: Array<string>;
}

export class UpdateWithDriverDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  title_ru: string;

  @IsString()
  @IsOptional()
  title_hy: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  description_ru: string;

  @IsString()
  @IsOptional()
  description_hy: string;
}

class CreatePricingWithDriverDto {
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateNewPricingWithDriverDto extends CreatePricingWithDriverDto {

  @IsNumber()
  @IsNotEmpty()
  carId: number;
}

export class UpdatePricingWithDriverDto extends CreatePricingWithDriverDto { }