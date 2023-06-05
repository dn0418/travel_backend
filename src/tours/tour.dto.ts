import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  discountedPrice: number;

  @IsNotEmpty()
  @IsNumber()
  dayLength: number;

  @IsNotEmpty()
  @IsNumber()
  nightLength: number;

  @IsNotEmpty()
  @IsString()
  tourType: string;

  @IsNotEmpty()
  @IsString()
  startedDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsNumber()
  activities: number;

  @IsNotEmpty()
  @IsBoolean()
  car: boolean;

  @IsNotEmpty()
  @IsBoolean()
  hiking: boolean;

  @IsNotEmpty()
  @IsBoolean()
  motorCycle: boolean;

  @IsNotEmpty()
  @IsNumber()
  hotel: number;

  @IsNotEmpty()
  @IsString()
  hotelDetails: string;

  @IsNotEmpty()
  @IsString()
  locationImg: string;

  @IsNotEmpty()
  @IsString()
  tourDetails: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsArray()
  includesServices: string[];

  @IsArray()
  excludeServices: string[];
}


export class UpdateTourDto { }
