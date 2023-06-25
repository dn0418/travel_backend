import { IsNotEmpty, IsString } from "class-validator";

export class CreateHotelTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateHotelTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
