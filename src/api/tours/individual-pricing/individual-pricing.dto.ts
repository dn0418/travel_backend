import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateIndividualPricingDto {
  @IsNumber()
  @IsNotEmpty()
  pax2_3: number;

  @IsNotEmpty()
  @IsNumber()
  pax4_6: number;

  @IsNotEmpty()
  @IsNumber()
  pax7_18: number;

  @IsNotEmpty()
  @IsNumber()
  pax20_more: number;

  @IsOptional()
  @IsNumber()
  tourId: number;
}

export class UpdateIndividualPricingDto {
  @IsOptional()
  @IsNumber()
  pax2_3: number;

  @IsOptional()
  @IsNumber()
  pax4_6: number;

  @IsOptional()
  @IsNumber()
  pax7_18: number;

  @IsOptional()
  @IsNumber()
  pax20_more: number;
}
