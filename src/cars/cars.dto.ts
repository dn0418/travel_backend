import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  carNo: string;

  @IsString()
  @IsNotEmpty()
  startedDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  seatNo: string;

  @IsBoolean()
  @IsNotEmpty()
  isDriver: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  discountedPrice: string;

  @IsString()
  @IsOptional()
  driverId: string;
}

export class UpdateCarDto { }
