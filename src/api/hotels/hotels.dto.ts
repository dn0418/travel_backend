import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  googleMap: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  fromAirport: boolean;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsBoolean()
  @IsNotEmpty()
  freeCancellation: boolean;

  @IsOptional()
  @IsString()
  checkInTime: string;

  @IsString()
  @IsOptional()
  checkOutTime: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  longDescription: string;

  @IsArray()
  @IsOptional()
  images: Array<string>;
}
export class UpdateHotelDto { }
