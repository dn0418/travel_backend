import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePricingTableDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  firstPart: number;

  @IsNumber()
  @IsNotEmpty()
  lastPart: number;

  @IsOptional()
  @IsNumber()
  hotelId: number;
}

export class UpdatePricingTableDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  firstPart: number;

  @IsOptional()
  @IsNumber()
  lastPart: number;
}
