import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDeparturesPricingDto {
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate: string;

  @IsNumber()
  @IsNotEmpty()
  maxPerson: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNumber()
  tourId: number;
}

export class UpdateDeparturesPricingDto {
  @IsOptional()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate: string;

  @IsOptional()
  @IsNumber()
  maxPerson: number;

  @IsOptional()
  @IsNumber()
  price: number;
}
