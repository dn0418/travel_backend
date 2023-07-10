import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePricingWithDriverDto {
  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class UpdatePricingWithDriverDto {
  @IsString()
  @IsOptional()
  duration: string;

  @IsNumber()
  @IsOptional()
  price: number;
}
