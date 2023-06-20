import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDestinationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  mapImage: string;
}
export class UpdateDestinationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  mapImage: string;
}
