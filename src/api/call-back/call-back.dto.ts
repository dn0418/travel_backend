import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCallBackDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  contact: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  whatsapp: string;

  @IsOptional()
  @IsString()
  telegram: string;

  @IsOptional()
  @IsString()
  voice: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  timezone: string;

  @IsOptional()
  @IsString()
  note: string;
}

export class UpdateCallBackDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  contact: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  whatsapp: string;

  @IsOptional()
  @IsString()
  telegram: string;

  @IsOptional()
  @IsString()
  voice: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  timezone: string;

  @IsOptional()
  @IsString()
  note: string;
}
