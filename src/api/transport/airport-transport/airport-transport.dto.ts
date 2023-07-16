import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAirportTransportDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  description_hy: string;

  @IsOptional()
  @IsString()
  description_ru: string;

  @IsArray()
  @IsNotEmpty()
  images: Array<string>;
}

export class UpdateAirportTransportDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  description_hy: string;

  @IsOptional()
  @IsString()
  description_ru: string;
}

export class CreateNewImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}