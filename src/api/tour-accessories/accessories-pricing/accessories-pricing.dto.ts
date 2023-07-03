import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAccessoriesPricingDto {
  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  accessoriesId: number;
}

export class UpdateAccessoriesPricingDto {
  @IsString()
  @IsOptional()
  duration: string;

  @IsString()
  @IsOptional()
  price: number;
}
