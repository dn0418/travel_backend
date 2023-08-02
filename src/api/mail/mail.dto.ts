import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class TourMailDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  additionalInfo: string;

  @IsNumber()
  adult: number;

  @IsNumber()
  child: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  telephone: string;
}

export class HotelMailDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  telephone: string;

  @IsOptional()
  @IsString()
  additionalInfo: string;

  @IsString()
  roomType: string;

  @IsNumber()
  quantity: number;
}

export class CarMailDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  telephone: string;

  @IsOptional()
  @IsString()
  additionalInfo: string;

  @IsString()
  carType: string;
}

export class AccessoriesMailDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  telephone: string;

  @IsOptional()
  @IsString()
  additionalInfo: string;
}

export class MiceMailDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  telephone: string;

  @IsOptional()
  @IsString()
  additionalInfo: string;

  @IsOptional()
  @IsString()
  miceType: string;
}