import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBlogDto {
  @IsOptional()
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  title_ru: string;

  @IsOptional()
  @IsString()
  title_hy: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  author_ru: string;

  @IsOptional()
  @IsString()
  author_hy: string;

  @IsNotEmpty()
  @IsString()
  short_description: string;

  @IsOptional()
  @IsString()
  short_description_ru: string;

  @IsOptional()
  @IsString()
  short_description_hy: string;

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
  @IsNumber()
  rubric: number;
}

export class UpdateBlogDto {
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
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  author_ru: string;

  @IsOptional()
  @IsString()
  author_hy: string;

  @IsOptional()
  @IsString()
  short_description: string;

  @IsOptional()
  @IsString()
  short_description_ru: string;

  @IsOptional()
  @IsString()
  short_description_hy: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  description_ru: string;

  @IsOptional()
  @IsString()
  description_hy: string;

  @IsNotEmpty()
  @IsNumber()
  rubric: number;
}
