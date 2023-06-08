import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateRouteDto {
  @IsNumber()
  @IsNotEmpty()
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
  length: string;

  @IsString()
  @IsOptional()
  meals: string;

  @IsString()
  @IsOptional()
  hotel: string;
}

export class UpdateRouteDto { }
