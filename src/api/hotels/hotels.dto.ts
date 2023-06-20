import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  quality: string;

  @IsString()
  @IsNotEmpty()
  roomsDetails: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  hotelDetails: string;

  @IsString()
  @IsNotEmpty()
  locationImg: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  discountedPrice: number;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsNumber()
  @IsNotEmpty()
  activities: number;
}
export class UpdateHotelDto { }
