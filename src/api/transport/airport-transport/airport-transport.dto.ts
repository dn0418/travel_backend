import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateAirportTransportDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  images: Array<string>;
}

export class UpdateAirportTransportDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
