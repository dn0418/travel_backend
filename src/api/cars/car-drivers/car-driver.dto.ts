import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCarDriverDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  profilePhoto: string;

  @IsString()
  @IsNotEmpty()
  licenseNo: string;

  @IsString()
  @IsOptional()
  locenseExpireDate: string;
}

export class UpdateCarDriverDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  profilePhoto: string;

  @IsString()
  @IsOptional()
  licenseNo: string;

  @IsString()
  @IsOptional()
  locenseExpireDate: string;
}
