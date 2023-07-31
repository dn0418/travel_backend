import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateRouteDto {
  @IsOptional()
  @IsNumber()
  tourId: number;

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
  description: string;

  @IsOptional()
  @IsString()
  description_ru: string;

  @IsOptional()
  @IsString()
  description_hy: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  time_ru: string;

  @IsOptional()
  @IsString()
  time_hy: string;

  @IsNotEmpty()
  @IsString()
  distance: string;

  @IsOptional()
  @IsString()
  distance_ru: string;

  @IsOptional()
  @IsString()
  distance_hy: string;

  @IsNotEmpty()
  @IsString()
  meals: string;

  @IsOptional()
  @IsString()
  meals_ru: string;

  @IsOptional()
  @IsString()
  meals_hy: string;

  @IsNotEmpty()
  @IsString()
  hotel: string;

  @IsOptional()
  @IsString()
  hotel_ru: string;

  @IsOptional()
  @IsString()
  hotel_hy: string;
}

export class UpdateRouteDto {
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
  description: string;

  @IsOptional()
  @IsString()
  description_ru: string;

  @IsOptional()
  @IsString()
  description_hy: string;

  @IsOptional()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  time_ru: string;

  @IsOptional()
  @IsString()
  time_hy: string;

  @IsOptional()
  @IsString()
  distance: string;

  @IsOptional()
  @IsString()
  distance_ru: string;

  @IsOptional()
  @IsString()
  distance_hy: string;

  @IsOptional()
  @IsString()
  meals: string;

  @IsOptional()
  @IsString()
  meals_ru: string;

  @IsOptional()
  @IsString()
  meals_hy: string;

  @IsOptional()
  @IsString()
  hotel: string;

  @IsOptional()
  @IsString()
  hotel_ru: string;

  @IsOptional()
  @IsString()
  hotel_hy: string;
}
