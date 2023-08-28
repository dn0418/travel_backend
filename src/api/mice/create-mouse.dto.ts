import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMiceDto {
  @IsNotEmpty()
  @IsBoolean()
  isRu: boolean;

  @IsNotEmpty()
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
  comportable: string;

  @IsOptional()
  @IsString()
  comportable_ru: string;

  @IsOptional()
  @IsString()
  comportable_hy: string;

  @IsNotEmpty()
  @IsString()
  activities: string;

  @IsOptional()
  @IsString()
  activities_ru: string;

  @IsOptional()
  @IsString()
  activities_hy: string;

  @IsNotEmpty()
  @IsString()
  extra: string;

  @IsOptional()
  @IsString()
  extra_ru: string;

  @IsOptional()
  @IsString()
  extra_hy: string;

  @IsNotEmpty()
  @IsBoolean()
  access24: boolean;

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

  @IsArray()
  images: Array<string>;
}

export class UpdateMiceDto {
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
  comportable: string;

  @IsOptional()
  @IsString()
  comportable_ru: string;

  @IsOptional()
  @IsString()
  comportable_hy: string;

  @IsOptional()
  @IsString()
  activities: string;

  @IsOptional()
  @IsString()
  activities_ru: string;

  @IsOptional()
  @IsString()
  activities_hy: string;

  @IsOptional()
  @IsString()
  extra: string;

  @IsOptional()
  @IsString()
  extra_ru: string;

  @IsOptional()
  @IsString()
  extra_hy: string;

  @IsOptional()
  @IsBoolean()
  access24: boolean;

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
}
