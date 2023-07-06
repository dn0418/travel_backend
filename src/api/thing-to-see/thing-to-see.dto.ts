import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * export class ThingToSee extends CommonEntity {
  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  description: string;

  @Column()
  type: string;

  @Column()
  location: string;

  @Column()
  fromYerevan: string;

  @Column()
  date: string;

  @Column()
  neatestSettlement: string;

  @Column()
  available: string;

  @Column()
  entrance: string;

  @OneToMany(() => Images, (image) => image.thingToSee)
  images: Images[];

  @OneToMany(() => Reviews, (review) => review.hotel)
  reviews: Reviews[];
}
 */
export class CreateThingToSeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  fromYerevan: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  neatestSettlement: string;

  @IsString()
  @IsNotEmpty()
  available: string;

  @IsString()
  @IsNotEmpty()
  entrance: string;

  @IsArray()
  images: string[];
}

export class UpdateThingToSeeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  fromYerevan: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  neatestSettlement: string;

  @IsString()
  @IsOptional()
  available: string;

  @IsString()
  @IsOptional()
  entrance: string;
}
