import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateRouteDto {
  @IsOptional()
  @IsNumber()
  tourId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  distance: string;

  @IsString()
  @IsNotEmpty()
  meals: string;

  @IsString()
  @IsNotEmpty()
  hotel: string;
}

export class UpdateRouteDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  distance: string;

  @IsOptional()
  @IsString()
  meals: string;

  @IsOptional()
  @IsString()
  hotel: string;
}
