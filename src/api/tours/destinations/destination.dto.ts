import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDestinationDto {
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
  country: string;

  @IsOptional()
  @IsString()
  country_ru: string;

  @IsOptional()
  @IsString()
  country_hy: string;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsNotEmpty()
  @IsString()
  rideType: string;
}

export class UpdateDestinationDto {
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
  country: string;

  @IsOptional()
  @IsString()
  country_ru: string;

  @IsOptional()
  @IsString()
  country_hy: string;

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  lng: number;

  @IsOptional()
  @IsString()
  rideType: string;
}
