import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTourAccessoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  specification: string;

  @IsString()
  @IsNotEmpty()
  goodsDetails: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsArray()
  @IsOptional()
  images: Array<string>;
}
export class UpdateTourAccessoryDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  specification: string;

  @IsOptional()
  @IsString()
  goodsDetails: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;

  @IsOptional()
  @IsNumber()
  type: number;
}
