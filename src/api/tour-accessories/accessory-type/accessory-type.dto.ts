import { IsNotEmpty, IsString } from "class-validator";

export class CreateAccessoryTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateAccessoryTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
