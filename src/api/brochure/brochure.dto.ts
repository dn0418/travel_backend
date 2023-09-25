import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrochureDto {
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
  url: string;
}

export class UpdateBrochureDto {
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
  url: string;
}
