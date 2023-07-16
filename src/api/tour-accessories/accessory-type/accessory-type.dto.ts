import { IsNotEmpty, IsString } from "class-validator";

export class CreateAccessoryTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @IsString()
  @IsNotEmpty()
  name_hy: string;
}

export class UpdateAccessoryTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @IsString()
  @IsNotEmpty()
  name_hy: string;
}
