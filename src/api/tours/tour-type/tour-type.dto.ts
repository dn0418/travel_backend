import { IsNotEmpty, IsString } from "class-validator";

export class CreateTourTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateTourTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
