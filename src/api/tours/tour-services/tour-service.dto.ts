import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTourServiceDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  text_ru: string;

  @IsString()
  @IsNotEmpty()
  text_hy: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsNumber()
  tourId: number;
}

export class UpdateTourServiceDto {
  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  text_ru: string;

  @IsString()
  @IsOptional()
  text_hy: string;

  @IsString()
  @IsOptional()
  type: string;
}
