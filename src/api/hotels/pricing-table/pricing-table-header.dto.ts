import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePricingTableHeaderDto {
  @IsString()
  @IsNotEmpty()
  firstPart: string;

  @IsString()
  @IsNotEmpty()
  lastPart: string;
}

export class UpdatePricingTableHeaderDto {
  @IsString()
  @IsNotEmpty()
  firstPart: string;

  @IsString()
  @IsNotEmpty()
  lastPart: string;
}