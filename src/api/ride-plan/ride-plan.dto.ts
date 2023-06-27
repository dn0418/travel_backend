import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRidePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsNumber()
  adult: number;

  @IsOptional()
  @IsNumber()
  child: number;

  @IsOptional()
  @IsString()
  rideType: string;

  @IsOptional()
  @IsString()
  note: string;

  @IsArray()
  @IsOptional()
  destinations: Destination[];
}


export class UpdateRidePlanDto { }


class Destination {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  duration: string;
}