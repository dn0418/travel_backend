import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
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

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  @IsOptional()
  tourId: number;

  @IsNumber()
  @IsOptional()
  carId: number;

  @IsNumber()
  @IsOptional()
  hotelId: number;

  @IsNumber()
  @IsOptional()
  accessoryId: number;

  @IsNumber()
  @IsOptional()
  thingToSeeId: number;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  profilePhoto: string;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}