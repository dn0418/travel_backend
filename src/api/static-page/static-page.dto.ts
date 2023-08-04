import { IsNotEmpty, IsString } from "class-validator";

export class UpdateStaticPageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
